import { User } from './user.model';

export type JupyterHubRequestUserConf = {
  storagePerUser: number;
  cpusPerUser: number;
  ramPerUser: number;
  userCount: number;
};

export class JupyterBase {
  private _id!: string;
  private _creator!: User;
  private _name!: string;
  private _slug!: string;
  private _description?: string;
  private _userConf!: JupyterHubRequestUserConf;
  private _containerImage!: string;
  private _status!: string;
  private _startDate!: Date;
  private _endDate!: Date;
  private _createdAt!: Date;

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get creator(): User {
    return this._creator;
  }
  public set creator(value: User) {
    this._creator = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get slug(): string {
    return this._slug;
  }
  public set slug(value: string) {
    this._slug = value;
  }
  public get description(): string | undefined {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }
  public get userConf(): JupyterHubRequestUserConf {
    return this._userConf;
  }
  public set userConf(value: JupyterHubRequestUserConf) {
    this._userConf = value;
  }
  public get containerImage(): string {
    return this._containerImage;
  }
  public set containerImage(value: string) {
    this._containerImage = value;
  }
  public get status(): string {
    return this._status;
  }
  public set status(value: string) {
    this._status = value;
  }
  public get startDate(): Date {
    return this._startDate;
  }
  public set startDate(value: Date) {
    this._startDate = value;
  }
  public get endDate(): Date {
    return this._endDate;
  }
  public set endDate(value: Date) {
    this._endDate = value;
  }
  public get createdAt(): Date {
    return this._createdAt;
  }
  public set createdAt(value: Date) {
    this._createdAt = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(jupyterObject: { [key: string]: any }) {
    this.id = jupyterObject['id'];
    this.creator = new User(jupyterObject.creator);
    this.name = jupyterObject['name'];
    this.description = jupyterObject['description'];
    this.userConf = jupyterObject['userConf'];
    this.containerImage = jupyterObject['containerImage'];
    this.status = jupyterObject['status'];
    this.startDate = new Date(jupyterObject['startDate']);
    this.endDate = new Date(jupyterObject['endDate']);
    this.createdAt = new Date(jupyterObject['createdAt']);
  }

  private positiveStatus = ['ACCEPTED', 'DEPLOYING', 'DEPLOYED'];
  private neutralStatus = ['PENDING', 'DEGRADING', 'DEGRATED', 'CANCELED'];
  private negativeStatus = ['REJECTED', 'FAILED'];

  public getStatusColor() {
    if (this.status) {
      if (this.positiveStatus.includes(this.status)) return 'success';
      if (this.neutralStatus.includes(this.status)) return 'secondary';
      if (this.negativeStatus.includes(this.status)) return 'danger';
    }
    return '';
  }
}

export class Jupyter extends JupyterBase {
  private _changeRequests = new Array<JupyterChange>();
  public get changeRequests(): Array<JupyterChange> {
    return this._changeRequests;
  }
  public set changeRequests(value: Array<JupyterChange>) {
    this._changeRequests = value;
  }
  public pending() {
    return this.changeRequests.filter((elem) => elem.status == 'PENDING').length;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(jupyterObject: { [key: string]: any }) {
    super(jupyterObject);
    if (jupyterObject) {
      this.slug = jupyterObject['slug'];
      for (const changeRequest of jupyterObject.changeRequests) {
        this._changeRequests.push(new JupyterChange(changeRequest));
      }
      this._changeRequests = this._changeRequests.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    }
  }
}

export class JupyterChange extends JupyterBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(jupyterObject: { [key: string]: any }) {
    super(jupyterObject);
  }
}
