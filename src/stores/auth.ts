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
      .get(`${backend}/`)
      .then((data) => {
        auth.value.setUser(data);
        notify({
          display: 'info',
          message: 'You are now logged in.'
        });
        const defaultReturnTarget = auth.value.userStore.user.isAdmin
          ? 'admin-overview'
          : auth.value.userStore.user.isLead
            ? 'jupyter-overview'
            : 'participation-overview';
        router.push(auth.value.returnUrl || { name: defaultReturnTarget });
        auth.value.clearReturnUrl();
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      );
  }

  function logout() {
    auth.value.reset();
    auth.value.setReturnUrl(router.currentRoute.value.fullPath);
    jupyterStore.clearMyJupyters();
    router.push({ name: 'start' });
  }

  return { auth, localLogin, localRegister, oidcVerify, logout };
});
