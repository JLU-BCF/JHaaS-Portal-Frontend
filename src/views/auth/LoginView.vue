<script setup lang="ts">
import { RouterLink } from 'vue-router';
const local_accounts_enabled = ['true', true, 1].includes(
  import.meta.env.VITE_ENABLE_LOCAL_ACCOUNTS
);
</script>

<template>
  <h2>Login</h2>
  <p>Choose your Login Method</p>
  <div class="my-5">
    <RouterLink
      v-if="local_accounts_enabled"
      :to="{ name: 'localLogin' }"
      class="btn btn-outline-dark w-100 my-1"
      >Local (testing)</RouterLink
    >
    <a href="/api/auth/oidc/login" class="btn btn-outline-dark w-100 my-1">
      Authentik
      <br />
      <small class="fw-light"> auth.jhaas.gi.denbi.de </small>
    </a>
  </div>
</template>
