import { jwt_payload } from '@/helpers/jwt-decoder';
import { useUserStore } from '@/stores/user';

export class Auth {
  userStore = useUserStore();
  token?: string;
  returnUrl?: string;
  lastTokenRefresh?: Date;

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
