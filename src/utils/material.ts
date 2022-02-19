import { Store } from "@/utils/store";

export interface Material {
  name: string;
  kFactor: number;
}

export const materialsStore = new Store<Material[]>("materials", [
  { name: "Soft Whitewood", kFactor: 10 },
]);
