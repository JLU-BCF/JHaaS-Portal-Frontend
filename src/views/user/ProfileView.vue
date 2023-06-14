<script setup lang="ts">
import { useUserStore } from '@/stores/user';
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
    <a :href="`mailto:${user.email}`">{{ user.email }}</a>
  </p>
  <hr />
  <!-- <p>
    <strong>Note:</strong>
    Your contact email address does not have to be the same email address you use to log in to Authentik. The login email address and the contact email address are independent of each other and you can choose them as you wish.
  </p>
  <button class="btn btn-sm btn-outline-secondary">change contact email address</button> -->
  <div class="card mt-5 mw-330">
    <div class="card-header">Settings</div>
    <div class="card-body">
      <p class="card-text">
        Your profile is managed through Authentik (<a href="https://auth.jhaas.gi.denbi.de/"
          >https://auth.jhaas.gi.denbi.de/</a
        >).
      </p>
      <p>Changes to your profile in Authentik will only take effect after a logout-login-cycle.</p>
      <a
        href="https://auth.jhaas.gi.denbi.de/if/user/#/settings"
        class="btn btn-secondary w-100"
        target="_blank"
        >Open authentik settings</a
      >
    </div>
  </div>
</template>
