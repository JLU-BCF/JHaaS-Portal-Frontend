import { User } from '@/models/user.model';
import { Jupyter } from '@/models/jupyter.model';

interface ParticipationInterface {
  participantId: string;
  hubId: string;
  status: string;
  hub?: Jupyter;
  participant?: User;
  createdAt: Date;
  updatedAt: Date;
}

export class Participation implements ParticipationInterface {
  participantId!: string;
  hubId!: string;
  status!: string;
  hub?: Jupyter;
  participant?: User;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(participationObject?: ParticipationInterface) {
    participationObject && this.setParticipation(participationObject);
  }

  public setParticipation(participationObject: ParticipationInterface): void {
    this.participantId = participationObject.participantId;
    this.hubId = participationObject.hubId;
    this.status = participationObject.status;
    this.createdAt = participationObject.createdAt;
    this.updatedAt = participationObject.updatedAt;

    if (participationObject.hub) {
      this.hub = new Jupyter(participationObject.hub);
    }

    if (participationObject.participant) {
      this.participant = new User(participationObject.participant);
    }
  }
}
