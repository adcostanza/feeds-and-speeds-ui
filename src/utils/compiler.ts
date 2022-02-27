//Possible combinations
//cutterDiameter < cutterShankDiameter
//cutterDiameter == cutterShankDiameter
//cutterDiameter > cutterShankDiameter

//woc > cutterDiameter / 2
//woc <= cutterDiameter / 2

//Need to solve for every combination and compile to functions
import nerdamer from "nerdamer";
import { allMathStrings, Inputs } from "@/utils/calculator";

interface ConditionalInput {
  cutterDiameter: number;
  cutterShankDiameter: number;
  woc: number;
}
type CompilerCondition = (input: ConditionalInput) => boolean;

interface CompilerInput {
  //this is for figuring out if it matches or not
  condition: CompilerCondition;
  //this is for actually getting the nerdamer equations for this condition to compile into a function
  //they don't have to make sense, just match the condition
  compilerValues: {
    cutterDiameter: number;
    cutterShankDiameter: number;
    woc: number;
  };
}
export const compilerInputs: CompilerInput[] = [
  {
    condition: ({
      cutterDiameter,
      cutterShankDiameter,
      woc,
    }: ConditionalInput): boolean => {
      return cutterDiameter < cutterShankDiameter && woc > cutterDiameter / 2;
    },
    compilerValues: {
      cutterDiameter: 0,
      cutterShankDiameter: 1,
      woc: 1,
    },
  },
  {
    condition: ({
      cutterDiameter,
      cutterShankDiameter,
      woc,
    }: ConditionalInput): boolean => {
      return cutterDiameter == cutterShankDiameter && woc > cutterDiameter / 2;
    },
    compilerValues: {
      cutterDiameter: 1,
      cutterShankDiameter: 1,
      woc: 10,
    },
  },
  {
    condition: ({
      cutterDiameter,
      cutterShankDiameter,
      woc,
    }: ConditionalInput): boolean => {
      return cutterDiameter > cutterShankDiameter && woc > cutterDiameter / 2;
    },
    compilerValues: {
      cutterDiameter: 1,
      cutterShankDiameter: 0,
      woc: 10,
    },
  },
  {
    condition: ({
      cutterDiameter,
      cutterShankDiameter,
      woc,
    }: ConditionalInput): boolean => {
      return cutterDiameter < cutterShankDiameter && woc <= cutterDiameter / 2;
    },
    compilerValues: {
      cutterDiameter: 0,
      cutterShankDiameter: 1,
      woc: -1,
    },
  },
  {
    condition: ({
      cutterDiameter,
      cutterShankDiameter,
      woc,
    }: ConditionalInput): boolean => {
      return cutterDiameter == cutterShankDiameter && woc <= cutterDiameter / 2;
    },
    compilerValues: {
      cutterDiameter: 1,
      cutterShankDiameter: 1,
      woc: -1,
    },
  },
  {
    condition: ({
      cutterDiameter,
      cutterShankDiameter,
      woc,
    }: ConditionalInput): boolean => {
      return cutterDiameter > cutterShankDiameter && woc <= cutterDiameter / 2;
    },
    compilerValues: {
      cutterDiameter: 1,
      cutterShankDiameter: 0,
      woc: -1,
    },
  },
];
export type OutputFunction = (inputs: Inputs) => number;
export interface OutputFunctions {
  adjustedChipload: OutputFunction;
  feedrate: OutputFunction;
  materialRemovalRate: OutputFunction;
  powerUsage: OutputFunction;
  torque: OutputFunction;
  machineForce: OutputFunction;
  machineForcePercent: OutputFunction;
  availablePowerPercent: OutputFunction;
  routerCutterPowerIncrease: OutputFunction;
  maxDeflection: OutputFunction;
  maxDeflectionPercent: OutputFunction;
}

export interface CompilerOutput {
  condition: CompilerCondition;
  functions: OutputFunctions;
}

export const subEquations = (inputs: ConditionalInput) => {
  const allMath = allMathStrings(
    inputs.woc,
    inputs.cutterDiameter,
    inputs.cutterShankDiameter
  );

  //max deflection has issue
  //@ts-ignore
  const subbedWithOutputs: Record<keyof OutputFunctions, Expression> =
    Object.entries(allMath).reduce((acc, [key, math]) => {
      return {
        ...acc,
        //@ts-ignore
        [key]: nerdamer(math, acc),
      };
    }, {});

  //@ts-ignore
  const toFunctions: OutputFunctions = Object.entries(subbedWithOutputs).reduce(
    (acc, [key, math]) => {
      const positionalFn = math.buildFunction([
        "chipload",
        "woc",
        "doc",
        "rpm",
        "maxAcceptableDeflection",
        "cutterDiameter",
        "materialKFactor",
        "cutterFlutes",
        "maximumMachineForce",
        "routerOutputPower",
        "cutterOverallStickout",
        "cutterYoungsModulus",
        "cutterShankDiameter",
        "cutterLength",
      ]);
      return {
        ...acc,
        //@ts-ignore
        [key]: positionalFn.toString(),
      };
    },
    {}
  );

  return toFunctions;
};

//@ts-ignore
const compilerOutputs: CompilerOutput[] = compilerInputs.map(
  (compilerInput) => {
    const functions = subEquations(compilerInput.compilerValues);
    return {
      condition: compilerInput.condition.toString(),
      functions: functions,
    };
  }
);

const json = JSON.stringify(compilerOutputs)
  .replaceAll('"', "")
  .replaceAll("\\n", "");

console.log(json);

export const fromPositionalToNamed = (
  fn: (
    chipload: number,
    woc: number,
    doc: number,
    rpm: number,
    maxAcceptableDeflection: number,
    cutterDiameter: number,
    materialKFactor: number,
    cutterFlutes: number,
    maximumMachineForce: number,
    routerOutputPower: number,
    cutterOverallStickout: number,
    cutterYoungsModulus: number,
    cutterShankDiameter: number,
    cutterLength: number
  ) => number,
  inputs: Inputs
): number => {
  const {
    chipload,
    woc,
    doc,
    rpm,
    maxAcceptableDeflection,
    cutterDiameter,
    materialKFactor,
    cutterFlutes,
    maximumMachineForce,
    routerOutputPower,
    cutterOverallStickout,
    cutterYoungsModulus,
    cutterShankDiameter,
    cutterLength,
  } = inputs;
  return fn(
    chipload,
    woc,
    doc,
    rpm,
    maxAcceptableDeflection,
    cutterDiameter,
    materialKFactor,
    cutterFlutes,
    maximumMachineForce,
    routerOutputPower,
    cutterOverallStickout,
    cutterYoungsModulus,
    cutterShankDiameter,
    cutterLength
  );
};
