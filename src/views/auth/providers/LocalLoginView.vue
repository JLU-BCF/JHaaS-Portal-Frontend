<script setup lang="ts">
import { Form, Field } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';
import { localLoginSchema } from '@/helpers/validators';

const authStore = useAuthStore();
</script>

<template>
  <h2>Login</h2>
  <p>with local credentials</p>
  <Form
    class="text-start my-5"
    @submit="authStore.localLogin"
    :validation-schema="localLoginSchema"
    v-slot="{ errors, isSubmitting }"
  >
    <div class="form-floating mb-2">
      <Field
        name="email"
        type="email"
        class="form-control"
        id="email-input"
        placeholder="E-Mail Address"
        :class="{ 'is-invalid': errors.email }"
        required
      />
      <label for="email-input">E-Mail Address</label>
      <div class="invalid-feedback">{{ errors.email }}</div>
    </div>
    <div class="form-floating mb-2">
      <Field
        name="password"
        type="password"
        class="form-control"
        id="password-input"
        placeholder="Password"
        :class="{ 'is-invalid': errors.password }"
        required
      />
      <label>Password</label>
      <div class="invalid-feedback">{{ errors.password }}</div>
    </div>
    <div class="form-floating">
      <button class="btn btn-dark w-100" :disabled="isSubmitting" type="submit">
        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
        Login
      </button>
    </div>
    <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
  </Form>
  <hr />
  <div class="d-grid gap-2 d-md-flex">
    <RouterLink :to="{ name: 'login' }" class="w-100 btn btn-sm btn-outline-secondary"
      >Back</RouterLink
    >
    <RouterLink :to="{ name: 'localRegister' }" class="w-100 btn btn-sm btn-outline-secondary"
      >Register</RouterLink
    >
  </div>
</template>
