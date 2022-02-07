export class Store<T> {
  constructor(public storeKey: string, public _default: T) {}

  public get(): T {
    const json = localStorage.getItem(this.storeKey);
    if (json === null) {
      localStorage.setItem(this.storeKey, JSON.stringify(this._default));
      return this._default;
    } else {
      return JSON.parse(json);
    }
  }

  public set(t: T): void {
    localStorage.setItem(this.storeKey, JSON.stringify(t));
  }

  public clear(): void {
    localStorage.removeItem(this.storeKey);
  }
}
