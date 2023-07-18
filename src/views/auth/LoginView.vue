<script setup lang="ts">
const authentik_domain = import.meta.env.VITE_AUTHENTIK_DOMAIN;
</script>

<template>
  <h2>Login</h2>
  <p>Choose your Login Method</p>
  <div class="my-5">
    <a href="/api/auth/oidc/login" class="btn btn-outline-dark w-100 my-1">
      Authentik
      <br />
      <small class="fw-light"> {{ authentik_domain }} </small>
    </a>
  </div>
</template>
