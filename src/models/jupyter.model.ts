export type JupyterHubRequestUserConf = {
  storagePerUser: number;
  cpusPerUser: number;
  ramPerUser: number;
  userCount: number;
};

export class Jupyter {
  private _id!: string | undefined;
  private _name!: string | undefined;
  private _slug!: string | undefined;
  private _description!: string | undefined;
  private _userConf!: JupyterHubRequestUserConf | undefined;
  private _containerImage!: string | undefined;
  private _status!: number | undefined;
  private _startDate!: Date | undefined;
  private _endDate!: Date | undefined;
  private _createdAt!: Date | undefined;

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
  public get name(): string | undefined {
    return this._name;
  }
  public set name(value: string | undefined) {
    this._name = value;
  }
  public get slug(): string | undefined {
    return this._slug;
  }
  public set slug(value: string | undefined) {
    this._slug = value;
  }
  public get description(): string | undefined {
    return this._description;
  }
  public set description(value: string | undefined) {
    this._description = value;
  }
  public get userConf(): JupyterHubRequestUserConf | undefined {
    return this._userConf;
  }
  public set userConf(value: JupyterHubRequestUserConf | undefined) {
    this._userConf = value;
  }
  public get containerImage(): string | undefined {
    return this._containerImage;
  }
  public set containerImage(value: string | undefined) {
    this._containerImage = value;
  }
  public get status(): number | undefined {
    return this._status;
  }
  public set status(value: number | undefined) {
    this._status = value;
  }
  public get startDate(): Date | undefined {
    return this._startDate;
  }
  public set startDate(value: Date | undefined) {
    this._startDate = value;
  }
  public get endDate(): Date | undefined {
    return this._endDate;
  }
  public set endDate(value: Date | undefined) {
    this._endDate = value;
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
      this.id = jupyterObject['id'];
      this.name = jupyterObject['name'];
      this.slug = jupyterObject['slug'];
      this.description = jupyterObject['description'];
      this.userConf = jupyterObject['userConf'];
      this.containerImage = jupyterObject['containerImage'];
      this.status = jupyterObject['status'];
      this.startDate = new Date(jupyterObject['startDate']);
      this.endDate = new Date(jupyterObject['endDate']);
      this.createdAt = new Date(jupyterObject['createdAt']);
    }
  }
}
