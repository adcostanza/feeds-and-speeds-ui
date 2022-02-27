import { compilerInputs, subEquations } from "@/utils/compiler";

test("compiler inputs make sense", () => {
  for (const compilerInput of compilerInputs) {
    expect(compilerInput.condition(compilerInput.compilerValues)).toEqual(true);
  }
});

test("another test", () => {
  const compilerOutputs = compilerInputs.map((compilerInput) => {
    const equations = subEquations(compilerInput.compilerValues);
    return equations;
  });
});
