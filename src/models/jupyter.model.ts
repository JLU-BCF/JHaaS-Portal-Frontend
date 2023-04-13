export class Jupyter {
  private _slug?: string | undefined;
  private _name?: string | undefined;
  private _status?: number | undefined;
  private _createdAt?: Date | undefined;

  public get slug(): string | undefined {
    return this._slug;
  }
  public set slug(value: string | undefined) {
    this._slug = value;
  }
  public get name(): string | undefined {
    return this._name;
  }
  public set name(value: string | undefined) {
    this._name = value;
  }
  public get status(): number | undefined {
    return this._status;
  }
  public set status(value: number | undefined) {
    this._status = value;
  }
  public get createdAt(): Date | undefined {
    return this._createdAt;
  }
  public set createdAt(value: Date | undefined) {
    this._createdAt = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(jupyterObject?: { [key: string]: any } | null) {
    if (jupyterObject) {
      this.slug = jupyterObject['slug'];
      this.name = jupyterObject['name'];
      this.status = jupyterObject['status'];
      this.createdAt = jupyterObject['createdAt'];
    }
  }
}
