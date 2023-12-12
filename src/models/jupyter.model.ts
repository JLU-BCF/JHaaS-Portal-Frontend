import { User, type UserInterface } from '@/models/user.model';

export type JupyterHubRequestUserConf = {
  storagePerUser: number;
  cpusPerUser: number;
  ramPerUser: number;
  userCount: number;
};

interface JupyterBaseInterface {
  id: string;
  creator: UserInterface;
  name: string;
  slug: string;
  hubUrl: string;
  description?: string;
  userConf: JupyterHubRequestUserConf;
  containerImage: string;
  status: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  changeRequests?: JupyterChange[];
}

export class JupyterBase {
  id!: string;
  creator!: UserInterface;
  name!: string;
  slug!: string;
  hubUrl!: string;
  description?: string;
  userConf!: JupyterHubRequestUserConf;
  containerImage!: string;
  status!: string;
  startDate!: Date;
  endDate!: Date;
  createdAt!: Date;

  constructor(jupyterObject: JupyterBaseInterface) {
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

  positiveStatus = ['ACCEPTED', 'DEPLOYING', 'DEPLOYED', 'REDEPLOY'];
  neutralStatus = ['PENDING', 'DEGRADE', 'DEGRADING', 'DEGRATED', 'CANCELED'];
  negativeStatus = ['REJECTED', 'FAILED'];

  public getStatusColor() {
    if (this.status) {
      if (this.positiveStatus.includes(this.status)) return 'success';
      if (this.neutralStatus.includes(this.status)) return 'info';
      if (this.negativeStatus.includes(this.status)) return 'danger';
    }
    return '';
  }

  public changesAllowed() {
    return ['PENDING', 'ACCEPTED', 'REJECTED'].includes(this.status);
  }

  public invitationsAllowed() {
    return this.positiveStatus.includes(this.status);
  }
}

export class Jupyter extends JupyterBase {
  changeRequests: Array<JupyterChange> = [];
  public pending() {
    return this.changeRequests.filter((elem) => elem.status == 'PENDING').length;
  }

  constructor(jupyterObject: JupyterBaseInterface) {
    super(jupyterObject);
    if (jupyterObject) {
      this.slug = jupyterObject['slug'];
      this.hubUrl = jupyterObject['hubUrl'];
      for (const changeRequest of jupyterObject.changeRequests || []) {
        this.changeRequests.push(new JupyterChange(changeRequest));
      }
      this.changeRequests = this.changeRequests.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    }
  }
}

export class JupyterChange extends JupyterBase {
  constructor(jupyterObject: JupyterBaseInterface) {
    super(jupyterObject);
  }

  public changesAllowed() {
    return ['PENDING', 'REJECTED'].includes(this.status);
  }
}
