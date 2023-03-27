import { jwt_decode, jwt_payload } from '@/helpers/jwt-decoder';

export class Auth {
  private token?: string;
  private tokenExpiry?: Date;
  private refreshToken?: string;
  public returnUrl?: string;

  constructor(oldAuthJSON?: string | null) {
    if (oldAuthJSON) {
      const oldAuth = JSON.parse(oldAuthJSON) as Auth;
      if (oldAuth.token) {
        this.token = oldAuth.token;
        this.tokenExpiry = oldAuth.tokenExpiry;
        this.refreshToken = oldAuth.refreshToken;
      }
    }

    if (this.token) {
      let data = jwt_payload(this.token);
      if (data) {
        const { exp } = data;
        if (typeof exp == 'number') {
          this.tokenExpiry = new Date(exp * 1000);
          console.log(this.tokenExpiry);
        }
      }
    }
  }

  setToken(token: string): void {
    let data = jwt_payload(token);
    if (data) {
      const { exp } = data;
      this.tokenExpiry = new Date(exp);
      console.log(data);
    }
    // TODO: set expiry date, remove log
    // console.log(data);
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  getExpiry() {
    return this.tokenExpiry;
  }

  expired(): boolean {
    if (this.tokenExpiry) {
      return new Date() < this.tokenExpiry;
    }
    return false;
  }

  valid(): boolean {
    return typeof this.token === 'string' && !this.expired();
  }
}
