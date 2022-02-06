import { Machine } from "@/utils/machine";
import { Cutter } from "@/utils/cutter";
import { Material } from "@/utils/material";

export class Calculator {
  constructor(
    public machine: Machine,
    public cutter: Cutter,
    public material: Material,
    public chipload: number,
    public woc: number,
    public doc: number,
    public rpm: number,
    public maxAcceptableDeflection: number
  ) {}
  get adjusted_chipload(): number {
    if (this.woc > this.cutter.diameter / 2) {
      return this.chipload;
    } else {
      return (
        (this.cutter.diameter * this.chipload) /
        (2.0 * Math.sqrt(this.cutter.diameter * this.woc - Math.pow(this.woc, 2)))
      );
    }
  }

  get feedrate(): number {
    return this.cutter.flutes * this.rpm * this.adjusted_chipload;
  }

  get material_removal_rate(): number {
    return this.feedrate * this.doc * this.woc;
  }

  get power_usage(): number {
    return this.material_removal_rate / this.material.kFactor;
  }

  get torque(): number {
    return (this.power_usage * 63024.0) / this.rpm;
  }

  get machine_force(): number {
    return this.torque / (this.cutter.diameter / 2);
  }

  get machine_force_percent(): number {
    return this.machine_force / this.machine.maximumMachineForce;
  }

  get available_power_percent(): number {
    return this.power_usage / this.machine.router.outputPower;
  }

  get router_cutter_power_increase(): number {
    return this.power_usage * 745.7;
  }

  get max_deflection(): number {
    if (this.cutter.diameter < this.cutter.shankDiameter) {
      return (
        this.machine_force *
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
        (this.machine_force * Math.pow(this.cutter.overallStickout, 3)) /
        (3 *
          this.cutter.youngsModulus *
          ((Math.PI * Math.pow(this.cutter.diameter / 2, 4)) / 4))
      );
    } else {
      return (
        (this.machine_force * Math.pow(this.cutter.overallStickout, 3)) /
        ((3 *
          this.cutter.youngsModulus *
          Math.PI *
          Math.pow(this.cutter.shankDiameter / 2, 4)) /
          4)
      );
    }
  }

  get max_deflection_percent(): number {
    return this.max_deflection / this.maxAcceptableDeflection;
  }
}

export const DefaultCalculators = [];
