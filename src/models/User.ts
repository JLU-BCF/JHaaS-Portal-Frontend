class User {
  public id: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public isDeleting = false;
  public token: string;

  public constructor(id: string, username: string, firstName: string, lastName: string, token: string) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.token = token;
  }

  public getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public fromJSON(json: string | null): User | null {
    if (json == null) {
      return null;
    }

    return JSON.parse(json);
  }
}

export default User;