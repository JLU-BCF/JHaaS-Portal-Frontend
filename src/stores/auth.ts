import { defineStore } from 'pinia';
import { Auth } from '@/models/auth.model';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import router from '@/router';
import { ref } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import { useJupyterStore } from './jupyter';

export const useAuthStore = defineStore('auth', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const { notify } = useNotificationStore();
  const jupyterStore = useJupyterStore();

  const auth = ref(new Auth());

  async function localLogin(values: { [key: string]: string }) {
    fetchWrapper
      .post(`${backend}/auth/local/login`, values)
      .then((data) => {
        auth.value.setUser(data);
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
        auth.value.setUser(data);
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

  async function oidcVerify() {
    fetchWrapper
      .get(`${backend}`)
      .then((data) => {
        auth.value.setUser(data);
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

  function logout() {
    router.replace({ name: 'auth-logout' });

    setTimeout(() => {
      fetchWrapper
        .delete(`${backend}/auth/session`)
        .then((data) => {
          auth.value.reset();
          jupyterStore.clearMyJupyters();
          notify({
            display: 'info',
            message: data
          });
          router.push({ name: 'start' });
        })
        .catch((err) =>
          notify({
            display: 'danger',
            message: err
          })
        );
    }, 2000);
  }

  return { auth, localLogin, localRegister, oidcVerify, logout };
});
