import { jwt_decode, jwt_payload } from '@/helpers/jwt-decoder';
import { useUserStore } from '@/stores/user';

export class Auth {
  private userStore = useUserStore();
  private _token?: string | undefined;
  private _tokenExpiry?: Date | undefined;
  private _refreshToken?: string | undefined;
  private _returnUrl?: string | undefined;
  
  public get token(): string | undefined {
    return this._token;
  }
  public set token(value: string | undefined) {
    this._token = value;
  }
  public get tokenExpiry(): Date | undefined {
    return this._tokenExpiry;
  }
  public set tokenExpiry(value: Date | undefined) {
    this._tokenExpiry = value;
  }
  public get refreshToken(): string | undefined {
    return this._refreshToken;
  }
  public set refreshToken(value: string | undefined) {
    this._refreshToken = value;
  }
  public get returnUrl(): string | undefined {
    return this._returnUrl;
  }
  public set returnUrl(value: string | undefined) {
    this._returnUrl = value;
  }

  constructor(oldAuthToken?: string | null) {
    if (oldAuthToken) {
      this.setToken(oldAuthToken);
    }
  }

  setToken(token: string): void {
    let data = jwt_payload(token);

    if (data) {
      this.token = token;
      const { exp, user } = data;
      if (typeof exp == 'number') {
        this.tokenExpiry = new Date(exp * 1000);
      }
      if (user) {
        this.userStore.setUser(user);
      }
    }
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
      return new Date() > this.tokenExpiry;
    }
    return false;
  }

  valid(): boolean {
    return typeof this.token === 'string' && !this.expired();
  }

  reset(): void {
    this.token = undefined;
    this.tokenExpiry = undefined;
    this.refreshToken = undefined;
    this.returnUrl = undefined;
    this.userStore.clearUser()
  }
}
