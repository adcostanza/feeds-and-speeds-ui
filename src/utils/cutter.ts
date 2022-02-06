export enum CutterMaterial {
  carbide = "carbide",
  hss = "hss",
  cobalt = "cobalt",
}

export class Cutter {
  constructor(
    public name: string,
    public material: CutterMaterial,
    public diameter: number,
    public length: number,
    public flutes: number,
    public shankDiameter: number,
    public overallStickout: number,
    public maximumDeflection: number
  ) {}

  get youngsModulus(): number {
    if (this.material === CutterMaterial.carbide) {
      return 87000000.0;
    } else {
      return 30000000.0;
    }
  }
}

export const DefaultCutters = [
  new Cutter("201", CutterMaterial.carbide, 0.25, 0.75, 3, 0.25, 1, 0.001),
  new Cutter("205e", CutterMaterial.carbide, 0.25, 1, 2, 0.25, 1.25, 0.001),
];
