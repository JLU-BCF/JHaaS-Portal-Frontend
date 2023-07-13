<script setup lang="ts">
import { Form, Field } from 'vee-validate';
import { useJupyterStore } from '@/stores/jupyter.store';
import { RouterLink, useRoute } from 'vue-router';
import { getTodayAsIso, dateToDateString, getYearsLaterAsIso } from '@/helpers/date';
import { ref, type Ref } from 'vue';
import type { Jupyter } from '@/models/jupyter.model';
import { jupyterRequestSchema } from '@/helpers/validators';

const route = useRoute();
const jupyterStore = useJupyterStore();
const jupyter: Ref<Jupyter | undefined> = ref();

jupyterStore
  .fetch('slug', route.params.slug)
  .then((jupyterInstance) => (jupyter.value = jupyterInstance));

function createJupyterChange(values: object) {
  jupyterStore.createJupyter(values, true);
}
</script>

<template>
  <h1>Create Change Request{{ jupyter ? ` for "${jupyter.name}"` : '' }}</h1>
  <hr />

  <div v-if="jupyter" class="col-12 col-md-10 col-lg-8 col-xxl-6 mt-3">
    <Form
      class="text-start my-5"
      @submit="createJupyterChange"
      :validation-schema="jupyterRequestSchema"
      v-slot="{ errors, isSubmitting }"
    >
      <Field name="id" type="hidden" :value="jupyter.id" />
      <p class="lead mb-1 mt-4">General</p>

      <div class="form-floating mb-2">
        <Field
          name="name"
          type="text"
          class="form-control"
          id="name-input"
          :value="jupyter.name"
          placeholder="Project Name"
          :class="{ 'is-invalid': errors.name }"
          required
        />
        <label for="name-input">Project Name</label>
        <div class="invalid-feedback">{{ errors.name }}</div>
      </div>
      <div class="form-floating mb-2">
        <Field
          name="slug"
          type="text"
          class="form-control"
          id="slug-input"
          :value="jupyter.slug"
          placeholder="Slug"
          :class="{ 'is-invalid': errors.slug }"
          disabled
        />
        <label for="slug-input">Slug</label>
        <div class="invalid-feedback">{{ errors.slug }}</div>
      </div>
      <div class="form-floating mb-2">
        <Field
          as="textarea"
          name="description"
          class="form-control tall"
          id="description-input"
          :value="jupyter.description || undefined"
          placeholder="Description"
          :class="{ 'is-invalid': errors.description }"
          required
        />
        <label for="description-input">Description</label>
        <div class="invalid-feedback">{{ errors.description }}</div>
      </div>

      <p class="lead mb-1 mt-4">Usage period</p>

      <div class="form-floating mb-2">
        <Field
          name="startDate"
          type="date"
          :value="dateToDateString(jupyter.startDate!)"
          :min="getTodayAsIso()"
          class="form-control"
          id="startdate-input"
          placeholder="Start Date"
          :class="{ 'is-invalid': errors.startDate }"
          required
        />
        <label for="startdate-input">Start Date</label>
        <div class="invalid-feedback">{{ errors.startDate }}</div>
      </div>
      <div class="form-floating mb-2">
        <Field
          name="endDate"
          type="date"
          :value="dateToDateString(jupyter.endDate!)"
          :min="getTodayAsIso()"
          :max="getYearsLaterAsIso(2)"
          class="form-control"
          id="enddate-input"
          placeholder="End Date"
          :class="{ 'is-invalid': errors.endDate }"
          required
        />
        <label for="enddate-input">End Date</label>
        <div class="invalid-feedback">{{ errors.endDate }}</div>
      </div>

      <p class="lead mb-1 mt-4">Hub Configuration</p>

      <div class="form-floating mb-2">
        <Field
          name="containerImage"
          type="text"
          class="form-control"
          id="containerimage-input"
          :value="jupyter.containerImage"
          placeholder="Juptyer Container Image"
          :class="{ 'is-invalid': errors.containerImage }"
          required
        />
        <label for="containerimage-input">Juptyer Container Image</label>
        <div class="invalid-feedback">{{ errors.containerImage }}</div>
      </div>

      <p class="lead mb-1 mt-4">Expected usage</p>

      <div class="row">
        <div class="col-6 col-xl-3">
          <div class="form-floating mb-2">
            <Field
              name="userConf.userCount"
              type="number"
              step="5"
              min="5"
              max="500"
              :value="jupyter.userConf.userCount"
              class="form-control"
              id="usercount-input"
              placeholder="Num. of users"
              :class="{ 'is-invalid': errors['userConf.userCount'] }"
              required
            />
            <label for="usercount-input">Num. of users</label>
            <div class="invalid-feedback">{{ errors['userConf.userCount'] }}</div>
          </div>
        </div>
        <div class="col-6 col-xl-3">
          <div class="form-floating mb-2">
            <Field
              name="userConf.ramPerUser"
              type="number"
              step="0.25"
              min="0.25"
              max="4"
              :value="jupyter.userConf.ramPerUser"
              class="form-control"
              id="ram-input"
              placeholder="RAM per User"
              :class="{ 'is-invalid': errors['userConf.ramPerUser'] }"
              required
            />
            <label for="ram-input">RAM per User</label>
            <div class="invalid-feedback">{{ errors['userConf.ramPerUser'] }}</div>
          </div>
        </div>
        <div class="col-6 col-xl-3">
          <div class="form-floating mb-2">
            <Field
              name="userConf.cpusPerUser"
              type="number"
              step="0.25"
              min="0.25"
              max="2"
              :value="jupyter.userConf.cpusPerUser"
              class="form-control"
              id="cpu-input"
              placeholder="CPU per User"
              :class="{ 'is-invalid': errors['userConf.cpusPerUser'] }"
              required
            />
            <label for="cpu-input">CPU per User</label>
            <div class="invalid-feedback">{{ errors['userConf.cpusPerUser'] }}</div>
          </div>
        </div>
        <div class="col-6 col-xl-3">
          <div class="form-floating mb-2">
            <Field
              name="userConf.storagePerUser"
              type="number"
              step="0.5"
              min="0.5"
              max="10"
              :value="jupyter.userConf.storagePerUser"
              class="form-control"
              id="storage-input"
              placeholder="Storage per User"
              :class="{ 'is-invalid': errors['userConf.storagePerUser'] }"
              required
            />
            <label for="storage-input">Storage per User</label>
            <div class="invalid-feedback">{{ errors['userConf.storagePerUser'] }}</div>
          </div>
        </div>
      </div>

      <p class="lead mb-1 mt-4">Confirmation</p>

      <div class="form-check">
        <Field
          class="form-check-input"
          name="tosConfirmation"
          type="checkbox"
          :class="{ 'is-invalid': errors.tosConfirmation }"
          id="tos-confirmation-input"
          :value="true"
          :unchecked-value="false"
          required
        />
        <label class="form-check-label" for="tos-confirmation-input">
          I accept the
          <RouterLink :to="{ name: 'tos' }" target="_blank"> terms of use </RouterLink>
        </label>
        <div class="invalid-feedback border-top border-danger mt-3">
          {{ errors.tosConfirmation }}
        </div>
      </div>

      <div class="form-floating mt-5">
        <button class="btn btn-dark w-100" :disabled="isSubmitting" type="submit">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Submit Change request
        </button>
      </div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
    </Form>
    <hr />
  </div>
  <div class="col-12 col-md-10 col-lg-8 col-xxl-6 mt-3">
    <RouterLink :to="{ name: 'jupyter-overview' }" class="w-100 btn btn-sm btn-outline-secondary">
      Cancel
    </RouterLink>
  </div>
</template>
