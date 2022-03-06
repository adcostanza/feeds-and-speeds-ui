import { Constraint } from "@/utils/optimization";

test("constraints", () => {
  const greaterThanConstraint = new Constraint("feedrate > 100");
  expect(greaterThanConstraint.key).toEqual("feedrate");
  expect(greaterThanConstraint.value).toEqual(100);
  expect(greaterThanConstraint.type).toEqual("greaterThan");

  const greaterThanOrEqualConstraint = new Constraint("feedrate >= 100");
  expect(greaterThanOrEqualConstraint.key).toEqual("feedrate");
  expect(greaterThanOrEqualConstraint.value).toEqual(100);
  expect(greaterThanOrEqualConstraint.type).toEqual("greaterThanOrEqual");

  const lessThanConstraint = new Constraint("feedrate < 100");
  expect(lessThanConstraint.key).toEqual("feedrate");
  expect(lessThanConstraint.value).toEqual(100);
  expect(lessThanConstraint.type).toEqual("lessThan");

  const lessThanOrEqualConstraint = new Constraint("feedrate <= 100");
  expect(lessThanOrEqualConstraint.key).toEqual("feedrate");
  expect(lessThanOrEqualConstraint.value).toEqual(100);
  expect(lessThanOrEqualConstraint.type).toEqual("lessThanOrEqual");
});
