export class Material {
  constructor(public name: string, public kFactor: number) {}
}

export const DefaultMaterials = [new Material("Soft Whitewood", 10)];
