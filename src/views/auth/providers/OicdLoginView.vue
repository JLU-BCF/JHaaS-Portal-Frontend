<script setup lang="ts">
import { Form } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

function onSubmit() {
  const authStore = useAuthStore();
  return authStore.oicdLogin();
}
</script>

<template>
  <div class="form-signin w-100 m-auto mt-5 text-center">
    <h2>Login</h2>
    <p>with OICD</p>
    <Form class="text-start my-5" @submit="onSubmit" v-slot="{ errors, isSubmitting }">
      <div class="form-floating">
        <button class="btn btn-dark w-100" :disabled="isSubmitting" type="submit">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          BCF Keycloak
        </button>
      </div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
    </Form>
    <hr />
    <div class="d-grid gap-2 d-md-flex">
      <RouterLink :to="{ name: 'login' }" class="w-100 btn btn-sm btn-outline-secondary"
        >Back</RouterLink
      >
    </div>
  </div>
</template>
