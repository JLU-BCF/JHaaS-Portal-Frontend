<script setup lang="ts">
import { useFrontendConfigurationStore } from '@/stores/config.store';
const { frontendConfiguration } = useFrontendConfigurationStore();
</script>

<template>
  <h2>Login</h2>
  <p>Choose your Login Method</p>
  <div class="my-5">
    <a href="/api/auth/oidc/login" class="btn btn-outline-dark w-100 my-1">
      {{ frontendConfiguration.AUTHENTIK_NAME }}
      <br />
      <small class="fw-light"> {{ frontendConfiguration.AUTHENTIK_FQDN }} </small>
    </a>
  </div>
</template>
