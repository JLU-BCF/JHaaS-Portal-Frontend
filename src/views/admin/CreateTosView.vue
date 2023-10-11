<script setup lang="ts">
import { tosCreationSchema } from '@/helpers/validators';
import { Form, Field } from 'vee-validate';

function createTos() {

}

</script>

<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-between">
      <h1>Create TOS</h1>
    </div>
  </div>

  <hr />

  <div class="col-12 col-md-10 col-lg-8 col-xxl-6 mt-3">
    <Form
      class="text-start my-5"
      @submit="createTos"
      :validation-schema="tosCreationSchema"
      v-slot="{ errors, isSubmitting }"
    >
      <p>
        Tos Text
      </p>

      <div class="form-floating mb-2">
        <Field
          as="textarea"
          name="description"
          class="form-control tall"
          id="description-input"
          placeholder="Description"
          :class="{ 'is-invalid': errors.description }"
          required
        />
        <label for="description-input">Description</label>
        <div class="invalid-feedback">{{ errors.description }}</div>
      </div>

      <div class="form-floating mt-5">
        <button class="btn btn-dark w-100" :disabled="isSubmitting" type="submit">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Submit request
        </button>
      </div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>


    </Form>
  </div>
</template>
