<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
const userStore = useUserStore();
const { user } = userStore;
const credsInfo = ref({} as { [key: string]: string });
userStore.fetchLoginMethod().then((val) => {
  credsInfo.value = val;
});
</script>

<template>
  <h1>{{ user.firstName }} {{ user.lastName }}</h1>
  <p>
    Contact Email Address:
    <br />
    <a :href="`mailto:${user.email}`">{{ user.email }}</a>
  </p>
  <p>
    <RouterLink class="btn btn-outline-dark btn-sm" :to="'#'">Edit Profile</RouterLink>
  </p>
  <hr />
  <div>
    <p>
      <strong>Your Login Method:</strong>
    </p>
  </div>
  <div v-if="credsInfo['authProvider'] === 'LOCAL'">
    <p>
      Local account.
      <br />
      Login Email Address:
      <br />
      <a :href="`mailto:${credsInfo['authProviderId']}`">{{ credsInfo['authProviderId'] }}</a>
    </p>
    <div class="d-grid gap-2 d-md-flex">
      <RouterLink class="btn btn-outline-dark btn-sm" :to="'#'">Change Login Email</RouterLink>
      <RouterLink class="btn btn-outline-dark btn-sm" :to="'#'">Change Password</RouterLink>
    </div>
  </div>
  <hr />
  <div>
    <p class="text-danger">
      <strong>Advanced</strong>
    </p>
    <div class="d-grid gap-2 d-md-flex">
      <RouterLink class="btn btn-outline-danger btn-sm" :to="'#'">Delete Account</RouterLink>
    </div>
  </div>
</template>
