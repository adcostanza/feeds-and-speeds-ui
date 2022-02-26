import { getOutputPower, Machine } from "@/utils/machine";
import { Cutter, getYoungsModulus } from "@/utils/cutter";
import { Material } from "@/utils/material";
import { Store } from "@/utils/store";
import { iterativelySubbed } from "@/utils/calculator";
import * as _ from "lodash";

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
  return _.range(min, max, (max - min) / count);
};

export const executeOptimization = ({
  minMaxFields,
  numberFields,
  cutter,
  material,
  machine,
}: {
  minMaxFields: Record<string, MinMaxField>;
  numberFields: Record<string, { name: string; value: number }>;
  cutter: Cutter;
  material: Material;
  machine: Machine;
}) => {
  const docs = range(minMaxFields.doc);
  const wocs = range(minMaxFields.woc);
  const chiploads = range(minMaxFields.chipload);

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
        };
        console.log(inputs);
        const result = iterativelySubbed(inputs);
        console.log(result);
        return result;
      });
    });
  });

  console.log(values[1]);

  return values;
};
