export class Router {
  constructor(
    public inputVoltage: number,
    public inputCurrent: number,
    public efficiency: number,
    public ratedSpeed: number
  ) {}

  get inputPower(): number {
    return this.inputVoltage * this.inputCurrent;
  }

  get outputPower(): number {
    return (this.inputPower * this.efficiency) / 745.7;
  }
}

export class Machine {
  constructor(
    public name: string,
    public maximumMachineForce: number,
    public router: Router
  ) {}
}

export const DefaultMachine = new Machine(
  "Adam's Shapeoko",
  18.0,
  new Router(120.0, 6.5, 0.6, 30000.0)
);
