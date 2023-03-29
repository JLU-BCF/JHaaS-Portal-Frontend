<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="form-signin w-100 m-auto mt-5 text-center">
    <h2>Login</h2>
    <p>Choose your Login Method</p>
    <div class="my-5">
      <RouterLink :to="{ name: 'localLogin' }" class="btn btn-outline-dark w-100 my-1">Local (testing)</RouterLink>
      <RouterLink :to="{ name: 'ldapLogin' }" class="btn btn-outline-dark w-100 my-1">LDAP</RouterLink>
      <RouterLink :to="{ name: 'oicdLogin' }" class="btn btn-outline-dark w-100 my-1">OICD</RouterLink>
    </div>
  </div>
</template>
