interface UserInterface {
  id?: string;
  externalId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isAdmin?: boolean;
  isLead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements UserInterface {
  id?: string;
  externalId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isAdmin?: boolean;
  isLead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

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
    this.createdAt = userObject.createdAt;
    this.updatedAt = userObject.updatedAt;
  }

  public clearUser(): void {
    this.id = undefined;
    this.externalId = undefined;
    this.firstName = undefined;
    this.lastName = undefined;
    this.email = undefined;
    this.isAdmin = undefined;
    this.isLead = undefined;
    this.createdAt = undefined;
    this.updatedAt = undefined;
  }

  public valid(): boolean {
    return this.id !== undefined;
  }
}
