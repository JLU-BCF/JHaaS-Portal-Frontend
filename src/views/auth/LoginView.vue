<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <h2>Login</h2>
  <p>Choose your Login Method</p>
  <div class="my-5">
    <RouterLink :to="{ name: 'localLogin' }" class="btn btn-outline-dark w-100 my-1"
      >Local (testing)</RouterLink
    >
    <a href="/api/auth/oidc/login" class="btn btn-outline-dark w-100 my-1">OIDC</a>
  </div>
</template>
