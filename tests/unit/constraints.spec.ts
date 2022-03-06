import { Constraint } from "@/utils/optimization"

test("constraints", () => {
    const constraint = new Constraint("feedrate > 100")
    expect(constraint.key).toEqual("feedrate")
    expect(constraint.value).toEqual("100")
    expect(constraint.type).toEqual("moreThan")
})