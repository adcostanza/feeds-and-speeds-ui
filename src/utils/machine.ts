import { Store } from "@/utils/store";

export class Router {
  constructor(
    public inputVoltage: number,
    public inputCurrent: number,
    public efficiency: number,
    public ratedSpeed: number
  ) {}
}

export const getInputPower = (router: Router) => {
  return router.inputVoltage * router.inputCurrent;
};

export const getOutputPower = (router: Router) => {
  return (getInputPower(router) * router.efficiency) / 745.7;
};

export class Machine {
  constructor(
    public name: string,
    public maximumMachineForce: number,
    public router: Router
  ) {}
}

export const machineStore = new Store<Machine>(
  "machine",
  new Machine("Adam's Shapeoko", 18.0, new Router(120.0, 6.5, 0.6, 30000.0))
);
