<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useFrontendConfigurationStore } from '@/stores/config.store';
import { ref } from 'vue';
const { frontendConfiguration } = useFrontendConfigurationStore();
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
        Your profile is managed through Authentik (<a :href="frontendConfiguration.AUTHENTIK_URL">{{
          frontendConfiguration.AUTHENTIK_FQDN
        }}</a
        >).
      </p>
      <p>Changes to your profile in Authentik will only take effect after a logout-login-cycle.</p>
      <a
        :href="`${frontendConfiguration.AUTHENTIK_URL}/if/user/#/settings`"
        class="btn btn-secondary w-100"
        target="_blank"
        >Open authentik settings</a
      >
    </div>
  </div>
</template>
