import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from '@/models/user.model';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import { useNotificationStore } from '@/stores/notification';

export const useUserStore = defineStore('user', () => {
  const user = ref(new User());
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const { notify } = useNotificationStore();

  function setUser(userObject: User) {
    user.value.setUser(userObject);
  }

  function clearUser() {
    user.value = new User();
  }

  function fetchMe() {
    const me = ref('waiting...');
    fetchWrapper
      .get(`${backend}/user/${user.value.id}`)
      .then((val) => {
        me.value = val;
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      );
    return me;
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

  return { user, setUser, clearUser, fetchMe, fetchLoginMethod };
});
