export interface UserInterface {
  id: string;
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  isLead: boolean;
  createdAt: Date;
  updatedAt: Date;

  verify(): void;
  verified(): boolean;
  setUser(userObject: UserInterface): void;
  valid(): boolean;
}

export class User implements UserInterface {
  id!: string;
  externalId!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  isAdmin!: boolean;
  isLead!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  private isValid = false;
  private isVerified = false;

  constructor(userObject?: UserInterface) {
    userObject && this.setUser(userObject);
  }

  public setUser(userObject: UserInterface): void {
    this.id = userObject.id;
    this.externalId = userObject.externalId;
    this.firstName = userObject.firstName;
    this.lastName = userObject.lastName;
    this.email = userObject.email;
    this.isAdmin = userObject.isAdmin;
    this.isLead = userObject.isLead;
    this.createdAt = new Date(userObject.createdAt);
    this.updatedAt = new Date(userObject.updatedAt);

    this.isValid = true;
  }

  public verify(): void {
    this.isVerified = true;
  }

  public verified(): boolean {
    return this.isVerified;
  }

  public valid(): boolean {
    return this.isValid;
  }
}
