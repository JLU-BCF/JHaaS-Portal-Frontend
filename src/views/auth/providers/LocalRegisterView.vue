<script setup lang="ts">
import { Form, Field } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';
import { localRegisterSchema } from '@/helpers/validators';

const authStore = useAuthStore();
</script>

<template>
  <h2>Register</h2>
  <p>- development only -</p>
  <Form
    class="text-start my-5"
    @submit="authStore.localRegister"
    :validation-schema="localRegisterSchema"
    v-slot="{ errors, isSubmitting }"
  >
    <div class="form-floating mb-2">
      <Field
        name="firstName"
        type="text"
        class="form-control"
        id="firstname-input"
        placeholder="First Name"
        :class="{ 'is-invalid': errors.firstName }"
        required
      />
      <label for="firstname-input">First Name</label>
      <div class="invalid-feedback">{{ errors.firstName }}</div>
    </div>
    <div class="form-floating mb-2">
      <Field
        name="lastName"
        type="text"
        class="form-control"
        id="lastname-input"
        placeholder="Last Name"
        :class="{ 'is-invalid': errors.lastName }"
        required
      />
      <label for="lastname-input">Last Name</label>
      <div class="invalid-feedback">{{ errors.lastName }}</div>
    </div>
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
        Register
      </button>
    </div>
    <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
  </Form>
  <hr />
  <div class="d-grid gap-2 d-md-flex">
    <RouterLink :to="{ name: 'login' }" class="w-100 btn btn-sm btn-outline-secondary"
      >Cancel</RouterLink
    >
  </div>
</template>
