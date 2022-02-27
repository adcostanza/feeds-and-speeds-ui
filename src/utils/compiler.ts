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

  //@ts-ignore
  const subbedWithOutputs = Object.entries(allMath).reduce(
    (acc, [key, math]) => {
      return {
        ...acc,
        //@ts-ignore
        [key]: nerdamer(math, acc).evaluate(),
      };
    },
    {}
  );

  const toFunctions = Object.entries(subbedWithOutputs).reduce(
    (acc, [key, math]) => {
      return {
        ...acc,
        //@ts-ignore
        [key]: math.buildFunction([
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
        ]),
      };
    },
    {}
  );

  return subbedWithOutputs;
};

// const compilerOutputs = compilerInputs.map((compilerInput) => {
//   const equations = subEquations(compilerInput.compilerValues);
//   console.log(equations);
//   console.log("hi");
// });
