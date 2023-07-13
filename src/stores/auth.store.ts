import { defineStore } from 'pinia';
import { Auth } from '@/models/auth.model';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import router from '@/router';
import { ref } from 'vue';
import { useNotificationStore } from '@/stores/notification.store';
import { useJupyterStore } from './jupyter.store';

export const useAuthStore = defineStore('auth', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const { notify } = useNotificationStore();
  const jupyterStore = useJupyterStore();

  const auth = ref(new Auth());

  async function oidcVerify() {
    if (auth.value.returnUrl == '/verify') {
      auth.value.returnUrl = undefined;
    }

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
      .catch(() => {
        notify({
          display: 'info',
          message: 'You are logged out.'
        });
        router.push({ name: 'start' });
      });
  }

  function logout() {
    auth.value.reset();
    auth.value.setReturnUrl(router.currentRoute.value.fullPath);
    jupyterStore.clearMyJupyters();
    router.push({ name: 'start' });
  }

  return { auth, oidcVerify, logout };
});
