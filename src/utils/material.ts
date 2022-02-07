import { Store } from "@/utils/store";

export class Material {
  constructor(public name: string, public kFactor: number) {}
}

export class Materials extends Store {
  constructor(public materials: Material[]) {
    super();
  }
  static storeKey = "materials";
  static default = new Materials([new Material("Soft Whitewood", 10)]);
}
