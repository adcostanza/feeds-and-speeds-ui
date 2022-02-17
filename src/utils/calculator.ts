import { Machine } from "@/utils/machine";
import { Cutter, getYoungsModulus } from "@/utils/cutter";
import { Material } from "@/utils/material";
import { Store } from "@/utils/store";

export class Calculator {
  constructor(
    public name: string,
    public machine: Machine,
    public cutter: Cutter,
    public material: Material,
    public chipload: number,
    public woc: number,
    public doc: number,
    public rpm: number,
    public maxAcceptableDeflection: number
  ) {}
  // get adjustedChipload(): number {
  //   if (this.woc > cutterDiameter / 2) {
  //     return this.chipload;
  //   } else {
  //     return (
  //       (cutterDiameter * this.chipload) /
  //       (2.0 * Math.sqrt(cutterDiameter * this.woc - pow(this.woc, 2)))
  //     );
  //   }
  // }

  // get feedrate(): number {
  //   return this.cutter.flutes * this.rpm * this.adjustedChipload;
  // }
  //
  // get materialRemovalRate(): number {
  //   return this.feedrate * this.doc * this.woc;
  // }
  //
  // get powerUsage(): number {
  //   return this.materialRemovalRate / this.material.kFactor;
  // }
  //
  // get torque(): number {
  //   return (this.powerUsage * 63024.0) / this.rpm;
  // }
  //
  // get machineForce(): number {
  //   return this.torque / (cutterDiameter / 2);
  // }
  //
  // get machineForcePercent(): number {
  //   return machineForce / this.machine.maximumMachineForce;
  // }
  //
  // get availablePowerPercent(): number {
  //   return this.powerUsage / this.machine.router.outputPower;
  // }
  //
  // get routerCutterPowerIncrease(): number {
  //   return this.powerUsage * 745.7;
  // }

  // get maxDeflection(): number {
  //   if (cutterDiameter < cutterShankDiameter) {
  //     return (
  //       machineForce *
  //       (pow(cutterLength, 3) /
  //         (3 *
  //           cutterYoungsModulus *
  //           ((pi * pow(cutterDiameter / 2, 4)) / 4)) +
  //         pow(cutterOverallStickout - cutterLength, 3) /
  //           (3 *
  //             cutterYoungsModulus *
  //             ((pi * pow(cutterShankDiameter / 2, 4)) / 4)))
  //     );
  //   } else if (cutterDiameter == cutterShankDiameter) {
  //     return (
  //       (machineForce * pow(cutterOverallStickout, 3)) /
  //       (3 *
  //         cutterYoungsModulus *
  //         ((pi * pow(cutterDiameter / 2, 4)) / 4))
  //     );
  //   } else {
  //     return (
  //       (machineForce * pow(cutterOverallStickout, 3)) /
  //       ((3 *
  //         cutterYoungsModulus *
  //         pi *
  //         pow(cutterShankDiameter / 2, 4)) /
  //         4)
  //     );
  //   }
  // }

  get maxDeflection(): number {
    return 1;
  }

  get maxDeflectionPercent(): number {
    return this.maxDeflection / this.maxAcceptableDeflection;
  }
}

export const calculatorsStore = new Store<Calculator[]>("calculators", []);

export const adjustedChiploadMath = (woc: number, cutterDiameter: number) => {
  if (woc > cutterDiameter / 2) {
    return "chipload";
  } else {
    return `
      (cutterDiameter * chipload) /
      (2.0 * Math.sqrt(cutterDiameter * woc - woc^2))
    `;
  }
};

export const feedrate = "cutterFlutes * rpm * adjustedChipload";

export const materialRemovalRate = "feedrate * doc * woc";

export const powerUsage = "materialRemovalRate / materialKFactor";

export const torque = "(powerUsage * 63024.0) / rpm";

export const machineForce = "torque / (cutterDiameter / 2)";

export const machineForcePercent = "machineForce / maximumMachineForce";

export const availablePowerPercent = "powerUsage / routerOutputPower";

export const routerCutterPowerIncrease = "powerUsage * 745.7";

export const maxDeflection = (
  cutterDiameter: number,
  cutterShankDiameter: number
) => {
  if (cutterDiameter < cutterShankDiameter) {
    return `machineForce *
      ((cutterLength)^3 /
        (3 *
          cutterYoungsModulus *
          ((pi * (cutterDiameter / 2)^4) / 4)) +
        pow(cutterOverallStickout - cutterLength, 3) /
        (3 *
          cutterYoungsModulus *
          ((pi * (cutterShankDiameter / 2)^4) / 4)))
    )`;
  } else if (cutterDiameter == cutterShankDiameter) {
    return `
      (machineForce * (cutterOverallStickout)^3) /
      (3 *
        cutterYoungsModulus *
        ((pi * (cutterDiameter / 2)^4) / 4))
    `;
  } else {
    return `
      (machineForce * (cutterOverallStickout)^3) /
      ((3 *
        cutterYoungsModulus *
        pi *
        (cutterShankDiameter / 2)^4) /
        4)
    `;
  }
};

export const maxDeflectionPercent = "maxDeflection / maxAcceptableDeflection";
