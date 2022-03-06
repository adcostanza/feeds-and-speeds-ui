import { getOutputPower, Machine } from "@/utils/machine";
import { Cutter, getYoungsModulus } from "@/utils/cutter";
import { Material } from "@/utils/material";
import { Store } from "@/utils/store";
import { iterativelySubbed } from "@/utils/calculator";
import * as _ from "lodash";
import { compiledFunctions } from "@/utils/compiled";
import { fromPositionalToNamed } from "@/utils/compiler";

export interface Optimization {
  name: string;
  machine: Machine;
  cutter: Cutter;
  material: Material;
  maxAcceptableDeflection: number;

  chipload: { min: number; max: number; count: number };
  woc: { min: number; max: number; count: number };
  doc: { min: number; max: number; count: number };
  constraints: string[];
  rpm: number;

  results: Record<string, number>[];
  tableColumnsToShow: string[];
}

export const optimizationsStore = new Store<Optimization[]>(
  "optimizations",
  []
);

export interface MinMaxField {
  name: string;
  min: number;
  max: number;
  count: number;
}

const range = ({ min, max, count }: MinMaxField): number[] => {
  if (count === 1) {
    return [min];
  }
  const step = (max - min) / (count - 1);
  return _.range(min, max + step, step);
};

export const executeOptimization = ({
  minMaxFields,
  numberFields,
  cutter,
  material,
  machine,
  constraintStrings,
}: {
  minMaxFields: Record<string, MinMaxField>;
  numberFields: Record<string, { name: string; value: number }>;
  cutter: Cutter;
  material: Material;
  machine: Machine;
  constraintStrings: string[];
}) => {
  const docs = range(minMaxFields.doc);
  const wocs = range(minMaxFields.woc);
  const chiploads = range(minMaxFields.chipload);
  const constraints = constraintStrings.map((ea) => {
    return new Constraint(ea);
  });

  let count = 1;
  const values = _.flatMap(docs, (doc) => {
    return _.flatMap(wocs, (woc) => {
      return chiploads.map((chipload) => {
        const inputs = {
          chipload: chipload,
          woc: woc,
          doc: doc,
          rpm: numberFields.rpm.value,
          maxAcceptableDeflection: numberFields.maxAcceptableDeflection.value,
          cutterDiameter: cutter.diameter,
          materialKFactor: material.kFactor,
          cutterFlutes: cutter.flutes,
          maximumMachineForce: machine.maximumMachineForce,
          routerOutputPower: getOutputPower(machine.router),
          cutterOverallStickout: cutter.overallStickout,
          cutterYoungsModulus: getYoungsModulus(cutter.material),
          cutterShankDiameter: cutter.shankDiameter,
          cutterLength: cutter.length,
        };
        const functionsForCondition = compiledFunctions.find((ea) => {
          return ea.condition({
            cutterDiameter: inputs.cutterDiameter,
            cutterShankDiameter: inputs.cutterShankDiameter,
            woc: inputs.woc,
          });
        })?.functions;

        if (functionsForCondition === undefined) {
          throw Error("Can't find functions for condition");
        }

        const result = Object.entries(functionsForCondition).reduce(
          (acc, [key, fn]) => {
            return { ...acc, [key]: fromPositionalToNamed(fn, inputs) };
          },
          {}
        );

        let constraintFulfilled = true;
        for (const constraint of constraints) {
          if (!constraint.constraintFulfilled(result)) {
            constraintFulfilled = false;
            break;
          }
        }

        const resultWithMetadata = {
          ...inputs,
          ...result,
          constraintFulfilled,
          count,
        };
        count++;
        return resultWithMetadata;
      });
    });
  }).sort((a, b) => {
    if (a.constraintFulfilled && b.constraintFulfilled) {
      //@ts-ignore
      return b.materialRemovalRate - a.materialRemovalRate;
    } else if (a.constraintFulfilled && !b.constraintFulfilled) {
      return -1;
    } else if (b.constraintFulfilled && b.constraintFulfilled) {
      return 1;
    }
  });

  return values;
};

const regexes = {
  lessThan: /([A-z]+)\s*<\s*([0-9\\.]+)/,
  lessThanOrEqual: /([A-z]+)\s*<=\s*([0-9\\.]+)/,
  greaterThan: /([A-z]+)\s*>\s*([0-9\\.]+)/,
  greaterThanOrEqual: /([A-z]+)\s*>=\s*([0-9\\.]+)/,
};

export class Constraint {
  key: string;
  value: number;
  type: keyof typeof regexes;
  constructor(private stringValue: string) {
    for (const [type, regex] of Object.entries(regexes)) {
      const matches = stringValue.match(regex);
      if (matches && matches.length >= 3) {
        if (isNumeric(matches[2])) {
          this.value = parseFloat(matches[2]);
          this.key = matches[1];
          this.type = type as keyof typeof regexes;
        } else if (isNumeric(matches[1])) {
          this.value = parseFloat(matches[1]);
          this.key = matches[2];
          switch (type) {
            case "lessThan":
              this.type = "greaterThan";
              break;
            case "greaterThan":
              this.type = "lessThan";
              break;
            case "lessThanOrEqual":
              this.type = "greaterThanOrEqual";
              break;
            case "greaterThanOrEqual":
              this.type = "lessThanOrEqual";
              break;
          }
        } else {
          throw Error("LHS or RHS must be number");
        }
        break;
      }
    }
    if (this.key === undefined) {
      throw Error("No constraint match");
    }
  }

  constraintFulfilled(result: Record<string, number>): boolean {
    switch (this.type) {
      case "lessThan":
        return result[this.key] < this.value;
      case "greaterThan":
        return result[this.key] > this.value;
      case "lessThanOrEqual":
        return result[this.key] <= this.value;
      case "greaterThanOrEqual":
        return result[this.key] >= this.value;
    }
  }
}

function isNumeric(str: string | number) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    //@ts-ignore
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
