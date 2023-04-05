import { defineStore } from 'pinia';
import { Auth } from '@/models/auth.model';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import router from '@/router';
import { ref } from 'vue';
import { useNotificationStore } from './notification';

export const useAuthStore = defineStore('auth', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const { notify } = useNotificationStore();

  const auth = ref(new Auth());

  async function localLogin(email: string, password: string) {
    fetchWrapper
      .post(`${backend}/auth/local/login`, { email, password })
      .then((data) => {
        console.log(data);
        auth.value.setToken(data.jwt);
        notify({
          display: 'info',
          message: 'You are now logged in.'
        });
        router.push(auth.value.returnUrl || { name: 'start' });
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      );
  }

  async function ldapLogin(username: string, password: string) {
    await fetchWrapper.post(`${backend}/auth/ldap/login`, { username, password });
  }

  async function oicdLogin() {
    // do the oicd login
  }

  function logout() {
    auth.value.reset();
    notify({
      display: 'info',
      message: 'You are now logged out.'
    });
    router.push({ name: 'start' });
  }

  return { auth, localLogin, ldapLogin, oicdLogin, logout };
});
