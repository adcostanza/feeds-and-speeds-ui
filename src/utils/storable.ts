export abstract class Storable {
  static storeKey: string;

  static default: Storable;

  static fromStore(): Storable {
    const json = localStorage.getItem(this.storeKey);
    if (json === null) {
      localStorage.setItem(this.storeKey, JSON.stringify(this.default));
      return this.default;
    } else {
      return JSON.parse(json);
    }
  }

  static store(storable: Storable): void {
    localStorage.setItem(this.storeKey, JSON.stringify(storable));
  }

  static clear(): void {
    localStorage.removeItem(this.storeKey);
  }
}
