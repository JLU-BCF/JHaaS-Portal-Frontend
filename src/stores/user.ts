import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from '@/models/user.model';
import type { UserInterface } from '@/models/user.model';
import { fetchWrapper } from '@/helpers/fetch-wrapper';

const backend = import.meta.env.VITE_BACKEND_PATH;

export const useUserStore = defineStore('user', () => {
  const user = ref(new User());

  function setUser(userObject: UserInterface) {
    user.value.setUser(userObject);
  }

  function clearUser() {
    user.value = new User();
  }

  function fetchMe() {
    const me = ref('waiting...');
    fetchWrapper.get(`${backend}/user/${user.value.id}`).then((val) => {
      me.value = val;
    });
    return me;
  }

  return { user, setUser, clearUser, fetchMe };
});
