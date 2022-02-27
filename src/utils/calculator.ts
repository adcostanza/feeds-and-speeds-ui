import { Machine } from "@/utils/machine";
import { Cutter } from "@/utils/cutter";
import { Material } from "@/utils/material";
import { Store } from "@/utils/store";
import nerdamer from "nerdamer";

export interface Calculator {
  name: string;
  machine: Machine;
  cutter: Cutter;
  material: Material;
  chipload: number;
  woc: number;
  doc: number;
  rpm: number;
  maxAcceptableDeflection: number;
}

export const calculatorsStore = new Store<Calculator[]>("calculators", []);

export const adjustedChipload = (woc: number, cutterDiameter: number) => {
  if (woc > cutterDiameter / 2) {
    return "chipload";
  } else {
    return `
      (cutterDiameter * chipload) /
      (2.0 * (cutterDiameter * woc - woc^2)^(1/2))
    `;
  }
};

export const feedrate = "cutterFlutes * rpm * adjustedChipload";

export const materialRemovalRate = "feedrate * doc * woc";

export const powerUsage = "materialRemovalRate / materialKFactor";

export const torque = "(powerUsage * 63024.0) / rpm";

export const machineForce = "torque / (cutterDiameter / 2)";

export const machineForcePercent = "machineForce / maximumMachineForce";

export const availablePowerPercent = "powerUsage / routerOutputPower";

export const routerCutterPowerIncrease = "powerUsage * 745.7";

export const maxDeflection = (
  cutterDiameter: number,
  cutterShankDiameter: number
) => {
  if (cutterDiameter < cutterShankDiameter) {
    return `machineForce *
      ((cutterLength)^3 /
        (3 *
          cutterYoungsModulus *
          ((pi * (cutterDiameter / 2)^4) / 4)) +
        pow(cutterOverallStickout - cutterLength, 3) /
        (3 *
          cutterYoungsModulus *
          ((pi * (cutterShankDiameter / 2)^4) / 4)))
    )`;
  } else if (cutterDiameter == cutterShankDiameter) {
    return `
      (machineForce * (cutterOverallStickout)^3) /
      (3 *
        cutterYoungsModulus *
        ((pi * (cutterDiameter / 2)^4) / 4))
    `;
  } else {
    return `
      (machineForce * (cutterOverallStickout)^3) /
      ((3 *
        cutterYoungsModulus *
        pi *
        (cutterShankDiameter / 2)^4) /
        4)
    `;
  }
};

export const maxDeflectionPercent = "maxDeflection / maxAcceptableDeflection";

export interface NerdamerEquations {
  adjustedChipload: string;
  feedrate: string;
  materialRemovalRate: string;
  powerUsage: string;
  torque: string;
  machineForce: string;
  machineForcePercent: string;
  availablePowerPercent: string;
  routerCutterPowerIncrease: string;
  maxDeflection: string;
  maxDeflectionPercent: string;
}

export const allMathStrings = (
  woc: number,
  cutterDiameter: number,
  cutterShankDiameter: number
): NerdamerEquations => ({
  adjustedChipload: adjustedChipload(woc, cutterDiameter),
  feedrate: feedrate,
  materialRemovalRate: materialRemovalRate,
  powerUsage: powerUsage,
  torque: torque,
  machineForce: machineForce,
  machineForcePercent: machineForcePercent,
  availablePowerPercent: availablePowerPercent,
  routerCutterPowerIncrease: routerCutterPowerIncrease,
  maxDeflection: maxDeflection(cutterDiameter, cutterShankDiameter),
  maxDeflectionPercent: maxDeflectionPercent,
});

const formatOutputNumber = (name: string, number: number): string => {
  if (name.toLowerCase().endsWith("percent")) {
    return `${(number * 100).toFixed(2)}%`;
  } else {
    let fixedDigits;
    if (number > 0.1 && number < 100) {
      fixedDigits = 2;
    } else if (number > 100) {
      fixedDigits = 1;
    } else if (number < 0.01) {
      fixedDigits = 4;
    } else if (number < 0.001) {
      fixedDigits = 4;
    } else {
      fixedDigits = 6;
    }
    return number.toFixed(fixedDigits);
  }
};

export interface Inputs {
  chipload: number;
  woc: number;
  doc: number;
  rpm: number;
  maxAcceptableDeflection: number;
  cutterDiameter: number;
  materialKFactor: number;
  cutterFlutes: number;
  maximumMachineForce: number;
  routerOutputPower: number;
  cutterOverallStickout: number;
  cutterYoungsModulus: number;
  cutterShankDiameter: number;
}

export const iterativelySubbed = (inputs: Inputs, withFormatting = true) => {
  const allMath = allMathStrings(
    inputs.woc,
    inputs.cutterDiameter,
    inputs.cutterShankDiameter
  );
  const subbedWithInputs = Object.entries(allMath).reduce(
    (acc, [key, math]) => {
      return {
        ...acc,
        //@ts-ignore
        [key]: nerdamer(math, inputs).evaluate(),
      };
    },
    {}
  );

  const subbedWithOutputs = Object.entries(subbedWithInputs).reduce(
    (acc, [key, math]) => {
      return {
        ...acc,
        //@ts-ignore
        [key]: Number(nerdamer(math, acc).evaluate()),
      };
    },
    {}
  );

  if (withFormatting) {
    return Object.entries(subbedWithOutputs).reduce((acc, [key, value]) => {
      //@ts-ignore
      return { ...acc, [key]: formatOutputNumber(key, value) };
    }, {});
  } else {
    return subbedWithOutputs;
  }
};

export const fullySubbed = (
  key: keyof ReturnType<typeof allMathStrings>,
  allStrings: Record<string, string>
): string => {
  const otherKeysMap = { ...allStrings };
  delete otherKeysMap[key];

  const otherKeys = Object.keys(otherKeysMap).reverse();

  return otherKeys.slice(1).reduce<string>((acc, ea) => {
    return nerdamer(acc, { [ea]: otherKeysMap[ea] }).toString();
  }, nerdamer(allStrings[key], { [otherKeys[0]]: otherKeysMap[otherKeys[0]] }).toString());
};
