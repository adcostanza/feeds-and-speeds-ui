//Possible combinations
//cutterDiameter < cutterShankDiameter
//cutterDiameter == cutterShankDiameter
//cutterDiameter > cutterShankDiameter

//woc > cutterDiameter / 2
//woc <= cutterDiameter / 2

//Need to solve for every combination and compile to functions

interface CompilerInput {
  //this is for figuring out if it matches or not
  condition: (input: {
    cutterDiameter: number;
    cutterShankDiameter: number;
    woc: number;
  }) => boolean;
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
    }: {
      cutterDiameter: number;
      cutterShankDiameter: number;
      woc: number;
    }) => {
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
    }: {
      cutterDiameter: number;
      cutterShankDiameter: number;
      woc: number;
    }) => {
      return cutterDiameter < cutterShankDiameter && woc <= cutterDiameter / 2;
    },
    compilerValues: {
      cutterDiameter: 0,
      cutterShankDiameter: 1,
      woc: -1,
    },
  },
];
