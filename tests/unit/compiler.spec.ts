import { compilerInputs } from "@/utils/compiler";

test("compiler inputs make sense", () => {
  for (const compilerInput of compilerInputs) {
    expect(compilerInput.condition(compilerInput.compilerValues)).toEqual(true);
  }
});
