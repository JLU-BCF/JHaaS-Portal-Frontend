import { defineStore } from 'pinia';
import { Auth } from '@/models/auth.model';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import router from '@/router';
import { ref } from 'vue';
import { useNotificationStore } from '@/stores/notification';

export const useAuthStore = defineStore('auth', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const { notify } = useNotificationStore();

  const auth = ref(new Auth());

  async function localLogin(values: { [key: string]: string }) {
    fetchWrapper
      .post(`${backend}/auth/local/login`, values)
      .then((data) => {
        auth.value.setToken(data.jwt);
        notify({
          display: 'info',
          message: 'You are now logged in.'
        });
        router.push(auth.value.returnUrl || { name: 'jupyter-overview' });
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      );
  }

  async function localRegister(values: { [key: string]: string }) {
    fetchWrapper
      .post(`${backend}/auth/local/signup`, values)
      .then((data) => {
        auth.value.setToken(data.jwt);
        notify({
          display: 'info',
          message: 'You are now registered and logged in.'
        });
        router.push(auth.value.returnUrl || { name: 'jupyter-overview' });
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      );
  }

  async function ldapLogin(values: { [key: string]: string }) {
    await fetchWrapper.post(`${backend}/auth/ldap/login`, values);
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

  return { auth, localLogin, localRegister, ldapLogin, oicdLogin, logout };
});
