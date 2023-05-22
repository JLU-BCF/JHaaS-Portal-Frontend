<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

// TODO
setTimeout(authStore.oidcVerify, 1000);
</script>

<template>
  <h2>Verifying</h2>
  <p>Please be patient</p>
  <div class="my-5">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
