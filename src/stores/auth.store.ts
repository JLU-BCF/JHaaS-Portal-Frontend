import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import router from '@/router';
import { ref } from 'vue';
import { useNotificationStore } from '@/stores/notification.store';
import { useJupyterStore } from './jupyter.store';
import { User } from '@/models/user.model';

export const useAuthStore = defineStore('auth', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const jupyterStore = useJupyterStore();
  const { notify } = useNotificationStore();

  // Handling of User
  const user = ref<User>(new User());

  const oldUser = localStorage.getItem('user');
  if (oldUser) {
    user.value.setUser(JSON.parse(oldUser));
  }

  function setUser(newUser: User) {
    user.value.setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }

  function clearUser() {
    Object.assign(user.value, new User());
    localStorage.removeItem('user');
  }

  // Handling of returnURL
  let returnUrl: string | undefined;

  const oldReturnUrl = localStorage.getItem('return_url');
  if (oldReturnUrl) {
    returnUrl = JSON.parse(oldReturnUrl);
  }

  function setReturnUrl(url: string) {
    returnUrl = url;
    localStorage.setItem('return_url', JSON.stringify(url));
  }

  function clearReturnUrl() {
    returnUrl = undefined;
    localStorage.removeItem('return_url');
  }

  // Auth functions
  async function oidcVerify() {
    if (returnUrl == '/verify') {
      returnUrl = undefined;
    }

    fetchWrapper
      .get(`${backend}/`)
      .then((data) => {
        setUser(data);
        notify({
          display: 'info',
          message: 'You are now logged in.'
        });

        // prettier-ignore
        const defaultReturnTarget =
          user.value.isAdmin ? 'admin-overview' :
          user.value.isLead ? 'jupyter-overview' :
          'participation-overview';

        router.push(returnUrl || { name: defaultReturnTarget });
        clearReturnUrl();
      })
      .catch(() => {
        notify({
          display: 'info',
          message: 'You are logged out.'
        });
        router.push({ name: 'start' });
      });
  }

  async function backendVerify(): Promise<boolean> {
    return fetchWrapper
      .get(`${backend}/`)
      .then((data) => {
        setUser(data);
        user.value.verify();
        return true;
      })
      .catch((e) => {
        notify({
          display: 'warning',
          message: e
        });
        return false;
      });
  }

  function logout() {
    clearReturnUrl();
    clearUser();
    setReturnUrl(router.currentRoute.value.fullPath);
    jupyterStore.clearMyJupyters();
    router.push({ name: 'start' });
  }

  async function deleteAccount(verificationToken?: string) {
    if (!confirm('Do you really want to delete your account?')) {
      return Promise.reject();
    }

    return fetchWrapper
      .delete(`${backend}/user/${user.value.id}`, {
        verificationToken
      })
      .then((data) => {
        notify({
          display: 'info',
          message: data
        });
        return data;
      })
      .catch((err) => {
        notify({
          display: 'danger',
          message: err
        });
        return Promise.reject();
      });
  }

  return { user, setReturnUrl, oidcVerify, backendVerify, logout, deleteAccount };
});
