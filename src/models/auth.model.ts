import { useUserStore } from '@/stores/user';
import type { User } from './user.model';

export class Auth {
  userStore = useUserStore();
  returnUrl?: string;

  constructor(user?: User | null) {
    const oldUser = localStorage.getItem('user');
    const oldReturnUrl = localStorage.getItem('return_url');

    if (user) {
      this.setUser(user);
    } else if (oldUser) {
      this.setUser(JSON.parse(oldUser));
    }

    if (oldReturnUrl) {
      this.returnUrl = JSON.parse(oldReturnUrl);
    }
  }

  setUser(user: User) {
    this.userStore.setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  setReturnUrl(url: string) {
    this.returnUrl = url;
    localStorage.setItem('return_url', JSON.stringify(url));
  }

  clearReturnUrl() {
    this.returnUrl = undefined;
    localStorage.removeItem('return_url');
  }

  valid(): boolean {
    return typeof this.userStore.user.id === 'string';
  }

  reset(): void {
    this.clearReturnUrl();
    this.userStore.clearUser();
    localStorage.removeItem('user');
  }
}
