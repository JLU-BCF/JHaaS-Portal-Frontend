import { defineStore } from 'pinia';
import { Auth } from '@/models/auth.model';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import router from '@/router';

// TODO: parameterize
const baseUrl = 'http://localhost:8000/api';

export const useAuthStore = defineStore('auth', () => {
  const auth = new Auth(localStorage.getItem('auth'));

  function valid(): boolean {
    return auth.valid();
  }

  async function login(username: string, password: string) {
    const { jwt } = await fetchWrapper.post(`${baseUrl}/auth`, { username, password });

    // update pinia state
    auth.setToken(jwt);

    // store auth details in local storage to keep user logged in between page refreshes
    localStorage.setItem('auth', JSON.stringify(auth));

    // redirect to previous url or default to home page
    router.push(auth.returnUrl || '/');
  }

  function logout() {}

  return { auth, login, logout, valid };
});
