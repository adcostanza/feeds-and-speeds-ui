import { Machine } from "@/utils/machine";
import { Cutter } from "@/utils/cutter";
import { Material } from "@/utils/material";
import { Store } from "@/utils/store";

export interface Optimization {
  name: string;
  machine: Machine;
  cutter: Cutter;
  material: Material;
  maxAcceptableDeflection: number;

  chipload: number;
  woc: number;
  doc: number;
  rpm: number;
}

export const optimizationsStore = new Store<Optimization[]>("optimizations", []);