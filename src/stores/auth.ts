import { defineStore } from 'pinia';
import { Auth } from '@/models/auth.model';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import router from '@/router';
import { ref } from 'vue';

// TODO: parameterize
const backend = import.meta.env.VITE_BACKEND_PATH;

export const useAuthStore = defineStore('auth', () => {
  const auth = ref(new Auth(localStorage.getItem('auth')));

  async function login(username: string, password: string) {
    const { jwt } = await fetchWrapper.post(`${backend}/auth`, { username, password });

    // update pinia state
    auth.value.setToken(jwt);

    // store auth details in local storage to keep user logged in between page refreshes
    localStorage.setItem('auth', jwt);

    // redirect to previous url or default to home page
    router.push('/');
  }

  function logout() {
    auth.value.reset();
    localStorage.removeItem('auth');
    router.push('/');
  }

  return { auth, login, logout };
});
