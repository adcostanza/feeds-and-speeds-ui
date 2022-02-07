import { Store } from "@/utils/store";

export class Material {
  constructor(public name: string, public kFactor: number) {}
}

export const materialsStore = new Store<Material[]>("materials", [
  new Material("Soft Whitewood", 10),
]);
