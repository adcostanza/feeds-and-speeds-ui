interface Unit {
  formatting: (val: number) => string;
  unit: string;
}

const fixedDigits = (precision: number) => {
  return (val: number) => val.toFixed(precision);
};

const fixedDigitsPercent = (precision: number) => {
  return (val: number) => (val * 100).toFixed(precision);
};
export const units: Record<string, Unit> = {
  chipload: { formatting: fixedDigits(4), unit: "in" },
  woc: { formatting: fixedDigits(4), unit: "in" },
  doc: { formatting: fixedDigits(4), unit: "in" },
  rpm: { formatting: fixedDigits(4), unit: "rpm" },
  maxAcceptableDeflection: { formatting: fixedDigits(4), unit: "in" },
  cutterDiameter: { formatting: fixedDigits(4), unit: "in" },
  materialKFactor: { formatting: fixedDigits(1), unit: "" },
  cutterFlutes: { formatting: fixedDigits(0), unit: "" },
  maximumMachineForce: { formatting: fixedDigits(2), unit: "lbf" },
  routerOutputPower: { formatting: fixedDigits(2), unit: "HP" },
  cutterOverallStickout: { formatting: fixedDigits(3), unit: "in" },
  cutterYoungsModulus: { formatting: fixedDigits(4), unit: "" },
  cutterShankDiameter: { formatting: fixedDigits(3), unit: "in" },
  cutterLength: { formatting: fixedDigits(2), unit: "in" },
  adjustedChipload: { formatting: fixedDigits(4), unit: "in" },
  feedrate: { formatting: fixedDigits(0), unit: "in/min" },
  materialRemovalRate: { formatting: fixedDigits(2), unit: "in^3/min" },
  powerUsage: { formatting: fixedDigits(2), unit: "HP" },
  torque: { formatting: fixedDigits(2), unit: "in*lbf" },
  machineForce: { formatting: fixedDigits(2), unit: "lbf" },
  machineForcePercent: { formatting: fixedDigitsPercent(1), unit: "%" },
  availablePowerPercent: { formatting: fixedDigitsPercent(1), unit: "%" },
  routerCutterPowerIncrease: { formatting: fixedDigits(4), unit: "in" },
  maxDeflection: { formatting: fixedDigits(4), unit: "in" },
  maxDeflectionPercent: { formatting: fixedDigitsPercent(1), unit: "%" },
  count: { formatting: fixedDigits(0), unit: "" },
};
