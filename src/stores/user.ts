import { defineStore } from "pinia";
import { ref } from 'vue';
import { User } from '@/models/user.model';
import type { UserInterface } from '@/models/user.model';

export const useUserStore = defineStore('user', () => {
  const user = ref(new User());

  function setUser(userObject: UserInterface) {
    user.value.setUser(userObject);
  }

  function clearUser() {
    user.value = new User();
  }

  return { user, setUser, clearUser };
});