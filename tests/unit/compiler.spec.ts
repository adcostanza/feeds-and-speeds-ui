import { compilerInputs, CompilerOutput, subEquations } from "@/utils/compiler";

test("compiler inputs make sense", () => {
  for (const compilerInput of compilerInputs) {
    expect(compilerInput.condition(compilerInput.compilerValues)).toEqual(true);
  }
});

test("do compilation", () => {
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
});
