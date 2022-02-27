import { compilerInputs, subEquations } from "@/utils/compiler";

test("compiler inputs make sense", () => {
  for (const compilerInput of compilerInputs) {
    expect(compilerInput.condition(compilerInput.compilerValues)).toEqual(true);
  }
});

test("another test", () => {

});
