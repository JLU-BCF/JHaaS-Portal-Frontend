import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import router from '@/router';
import { ref, type Ref } from 'vue';
import { useNotificationStore } from '@/stores/notification.store';
import { useJupyterStore } from './jupyter.store';
import { User } from '@/models/user.model';

export const useAuthStore = defineStore('auth', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const jupyterStore = useJupyterStore();
  const { notify } = useNotificationStore();

  // Handling of User
  const user: Ref<User> = ref(new User());

  const oldUser = localStorage.getItem('user');
  if (oldUser) {
    user.value.setUser(JSON.parse(oldUser));
  }

  function setUser(newUser: User) {
    user.value.setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }

  function clearUser() {
    user.value.clearUser();
    localStorage.removeItem('user');
  }

  // Handling of returnURL
  const returnUrl: Ref<string | undefined> = ref();

  const oldReturnUrl = localStorage.getItem('return_url');
  if (oldReturnUrl) {
    returnUrl.value = JSON.parse(oldReturnUrl);
  }

  function setReturnUrl(url: string) {
    returnUrl.value = url;
    localStorage.setItem('return_url', JSON.stringify(url));
  }

  function clearReturnUrl() {
    returnUrl.value = undefined;
    localStorage.removeItem('return_url');
  }

  // Auth functions
  async function oidcVerify() {
    if (returnUrl.value == '/verify') {
      returnUrl.value = undefined;
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

        router.push(returnUrl.value || { name: defaultReturnTarget });
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

  async function fetchLoginMethod() {
    return fetchWrapper
      .get(`${backend}/user/${user.value.id}/auth`)
      .then((val) => {
        return val;
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      );
  }

  function logout() {
    clearReturnUrl();
    clearUser();
    setReturnUrl(router.currentRoute.value.fullPath);
    jupyterStore.clearMyJupyters();
    router.push({ name: 'start' });
  }

  return { user, returnUrl, setReturnUrl, oidcVerify, fetchLoginMethod, logout };
});
