interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements UserInterface {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  isAdmin!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(userObject?: UserInterface) {
    userObject && this.setUser(userObject);
  }

  public setUser(userObject: UserInterface): void {
    this.id = userObject.id;
    this.firstName = userObject.firstName;
    this.lastName = userObject.lastName;
    this.email = userObject.email;
    this.isAdmin = userObject.isAdmin;
    this.createdAt = userObject.createdAt;
    this.updatedAt = userObject.updatedAt;
  }

  public valid(): boolean {
    return this.id !== undefined;
  }
}
