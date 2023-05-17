import { useUserStore } from '@/stores/user';
import type { User } from './user.model';

export class Auth {
  userStore = useUserStore();
  token?: string;
  returnUrl?: string;
  lastTokenRefresh?: Date;

  constructor(user?: User | null) {
    const oldUser = localStorage.getItem('user');
    if (user) this.setUser(user);
    else if (oldUser) this.setUser(JSON.parse(oldUser));
  }

  setUser(user: User) {
    this.userStore.setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  valid(): boolean {
    return typeof this.userStore.user.id === 'string';
  }

  reset(): void {
    this.token = undefined;
    this.returnUrl = undefined;
    this.lastTokenRefresh = undefined;
    this.userStore.clearUser();
    localStorage.removeItem('user');
  }
}
