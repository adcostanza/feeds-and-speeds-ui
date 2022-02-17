import nerdamer from "nerdamer";

export const chip_thinning_chipload = nerdamer(
  "(D_cutter * chipload) / (2 * sqrt((D_cutter * woc) - woc^2))"
);
export const non_chip_thinning_chipload = nerdamer("chipload");
const piecewise = (
  equations: { expr: string; condition: string }[]
): string => {
  const parsed = equations
    .map((ea) => `${ea.expr} \\quad ${ea.condition}`)
    .join(" \\\\ ");
  return `\\left\\{ \\begin{array}{ll} ${parsed} \\end{array} \\right.`;
};

export const adjusted_chipload_latex = piecewise([
  {
    expr: non_chip_thinning_chipload.toTeX(),
    condition: "\\quad \\quad \\quad woc > D_{cutter} / 2",
  },
  { expr: chip_thinning_chipload.toTeX(), condition: "else" },
]);

// f(x) =


