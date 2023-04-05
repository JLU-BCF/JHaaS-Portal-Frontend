import { jwt_payload } from '@/helpers/jwt-decoder';
import { useUserStore } from '@/stores/user';

export class Auth {
  private userStore = useUserStore();
  private _token?: string | undefined;
  private _returnUrl?: string | undefined;
  private _lastTokenRefresh?: Date | undefined;

  public get token(): string | undefined {
    return this._token;
  }
  public set token(value: string | undefined) {
    this._token = value;
  }
  public get returnUrl(): string | undefined {
    return this._returnUrl;
  }
  public set returnUrl(value: string | undefined) {
    this._returnUrl = value;
  }
  public get lastTokenRefresh(): Date | undefined {
    return this._lastTokenRefresh;
  }
  public set lastTokenRefresh(value: Date | undefined) {
    this._lastTokenRefresh = value;
  }

  constructor(initToken?: string | null) {
    const oldAuthToken = initToken || localStorage.getItem('auth');

    if (oldAuthToken) {
      this.setToken(oldAuthToken);
    }
  }

  setToken(token: string): void {
    const data = jwt_payload(token);

    if (data) {
      this.token = token;
      localStorage.setItem('auth', token);
      if (data.user) {
        this.userStore.setUser(data.user);
      }
    }
  }

  valid(): boolean {
    return typeof this.token === 'string';
  }

  reset(): void {
    this.token = undefined;
    this.returnUrl = undefined;
    this.lastTokenRefresh = undefined;
    this.userStore.clearUser();
    localStorage.removeItem('auth');
  }
}
