import { User } from './user.model';

export type JupyterHubRequestUserConf = {
  storagePerUser: number;
  cpusPerUser: number;
  ramPerUser: number;
  userCount: number;
};

export class JupyterBase {
  private _id: string | undefined;
  private _creator: User | undefined;
  private _name: string | undefined;
  private _slug: string | undefined;
  private _description: string | undefined;
  private _userConf: JupyterHubRequestUserConf | undefined;
  private _containerImage: string | undefined;
  private _status: string | undefined;
  private _startDate: Date | undefined;
  private _endDate: Date | undefined;
  private _createdAt: Date | undefined;

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
  public get creator(): User | undefined {
    return this._creator;
  }
  public set creator(value: User | undefined) {
    this._creator = value;
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
  public get status(): string | undefined {
    return this._status;
  }
  public set status(value: string | undefined) {
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
  }

  private positiveStatus = ['ACCEPTED', 'DEPLOYING', 'DEPLOYED'];
  private neutralStatus = ['PENDING', 'DEGRADING', 'DEGRATED', 'CANCELED'];
  private negativeStatus = ['REJECTED', 'FAILED'];

  public getStatusColor() {
    if (this.status) {
      if (this.positiveStatus.includes(this.status)) return 'success';
      if (this.neutralStatus.includes(this.status)) return 'secondary';
      return 'danger';
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
  constructor(jupyterObject?: { [key: string]: any } | null) {
    super(jupyterObject);
    if (jupyterObject) {
      this.slug = jupyterObject['slug'];
      for (const changeRequest of jupyterObject.changeRequests) {
        this._changeRequests?.push(new JupyterChange(changeRequest));
      }
      this._changeRequests = this._changeRequests.sort((a, b) => {
        if (a.createdAt && b.createdAt) return b.createdAt.getTime() - a.createdAt.getTime();
        return 0;
      });
    }
  }
}

export class JupyterChange extends JupyterBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(jupyterObject?: { [key: string]: any } | null) {
    super(jupyterObject);
  }
}
