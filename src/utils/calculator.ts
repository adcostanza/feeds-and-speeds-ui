import { Machine } from "@/utils/machine";
import { Cutter } from "@/utils/cutter";
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
  get adjustedChipload(): number {
    if (this.woc > this.cutter.diameter / 2) {
      return this.chipload;
    } else {
      return (
        (this.cutter.diameter * this.chipload) /
        (2.0 *
          Math.sqrt(this.cutter.diameter * this.woc - Math.pow(this.woc, 2)))
      );
    }
  }

  get feedrate(): number {
    return this.cutter.flutes * this.rpm * this.adjustedChipload;
  }

  get materialRemovalRate(): number {
    return this.feedrate * this.doc * this.woc;
  }

  get powerUsage(): number {
    return this.materialRemovalRate / this.material.kFactor;
  }

  get torque(): number {
    return (this.powerUsage * 63024.0) / this.rpm;
  }

  get machineForce(): number {
    return this.torque / (this.cutter.diameter / 2);
  }

  get machineForcePercent(): number {
    return this.machineForce / this.machine.maximumMachineForce;
  }

  get availablePowerPercent(): number {
    return this.powerUsage / this.machine.router.outputPower;
  }

  get routerCutterPowerIncrease(): number {
    return this.powerUsage * 745.7;
  }

  get maxDeflection(): number {
    if (this.cutter.diameter < this.cutter.shankDiameter) {
      return (
        this.machineForce *
        (Math.pow(this.cutter.length, 3) /
          (3 *
            this.cutter.youngsModulus *
            ((Math.PI * Math.pow(this.cutter.diameter / 2, 4)) / 4)) +
          Math.pow(this.cutter.overallStickout - this.cutter.length, 3) /
            (3 *
              this.cutter.youngsModulus *
              ((Math.PI * Math.pow(this.cutter.shankDiameter / 2, 4)) / 4)))
      );
    } else if (this.cutter.diameter == this.cutter.shankDiameter) {
      return (
        (this.machineForce * Math.pow(this.cutter.overallStickout, 3)) /
        (3 *
          this.cutter.youngsModulus *
          ((Math.PI * Math.pow(this.cutter.diameter / 2, 4)) / 4))
      );
    } else {
      return (
        (this.machineForce * Math.pow(this.cutter.overallStickout, 3)) /
        ((3 *
          this.cutter.youngsModulus *
          Math.PI *
          Math.pow(this.cutter.shankDiameter / 2, 4)) /
          4)
      );
    }
  }

  get maxDeflectionPercent(): number {
    return this.maxDeflection / this.maxAcceptableDeflection;
  }
}

export const calculatorsStore = new Store<Calculator[]>("calculators", []);
