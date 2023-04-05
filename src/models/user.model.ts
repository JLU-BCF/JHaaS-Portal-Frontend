export interface UserInterface {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  isAdmin: boolean,
  createdAt: Date,
  updatedAt: Date,
}

export class User {
  private _id!: string;
  private _firstName!: string;
  private _lastName!: string;
  private _email!: string;
  private _isAdmin!: boolean;

  private _createdAt!: Date;
  private _updatedAt?: Date | undefined;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get firstName(): string {
    return this._firstName;
  }
  public set firstName(value: string) {
    this._firstName = value;
  }
  public get lastName(): string {
    return this._lastName;
  }
  public set lastName(value: string) {
    this._lastName = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get isAdmin(): boolean {
    return this._isAdmin;
  }
  public set isAdmin(value: boolean) {
    this._isAdmin = value;
  }
  public get createdAt(): Date {
    return this._createdAt;
  }
  public set createdAt(value: Date) {
    this._createdAt = value;
  }
  public get updatedAt(): Date | undefined {
    return this._updatedAt;
  }
  public set updatedAt(value: Date | undefined) {
    this._updatedAt = value;
  }

  constructor(userObject?: UserInterface) {
    if (userObject !== undefined) {
      this.setUser(userObject);
    }
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
