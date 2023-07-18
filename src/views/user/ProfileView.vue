<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';
const authentik_domain = import.meta.env.VITE_AUTHENTIK_DOMAIN;
const authentik_url = import.meta.env.VITE_AUTHENTIK_URL;
const { user, fetchLoginMethod } = useAuthStore();
const credsInfo = ref({} as { [key: string]: string });
fetchLoginMethod().then((val) => {
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

  <div class="card mt-5 mw-330">
    <div class="card-header">Settings</div>
    <div class="card-body">
      <p class="card-text">
        Your profile is managed through Authentik (<a :href="authentik_url">{{
          authentik_domain
        }}</a
        >).
      </p>
      <p>Changes to your profile in Authentik will only take effect after a logout-login-cycle.</p>
      <a
        :href="`${authentik_url}/if/user/#/settings`"
        class="btn btn-secondary w-100"
        target="_blank"
        >Open authentik settings</a
      >
    </div>
  </div>
</template>
