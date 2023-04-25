<script setup lang="ts">
import { Form, Field } from 'vee-validate';
import { useJupyterStore } from '@/stores/jupyter';
import { RouterLink } from 'vue-router';
import {
  getNextSemesterStartDateAsIso,
  getNextSemesterEndDateAsIso,
  getTodayAsIso,
  getYearsLaterAsIso
} from '../../helpers/date';
import { jupyterRequestSchema } from '@/helpers/validators';
import { ref } from 'vue';

const jupyterStore = useJupyterStore();
const slugAvail = ref(true);

async function checkSlug(event: UIEvent) {
  const slug = (event.target as HTMLInputElement).value;
  if (slug.match(/^(?!-)[A-Za-z0-9-]{3,63}(?<!-)$/)) {
    slugAvail.value = await jupyterStore.checkSlug(slug);
  }
}

function createJupyter(values: object) {
  slugAvail.value && jupyterStore.createJupyter(values, false);
}
</script>

<template>
  <h1>New Jupyter Hub Request</h1>
  <hr />

  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia porro tempore at
    facilis fuga assumenda, aut rem, sint provident officiis ipsam magni quod facere velit et eaque
    impedit corrupti.
  </p>

  <div class="col-12 col-md-10 col-lg-8 col-xxl-6 mt-3">
    <Form
      class="text-start my-5"
      @submit="createJupyter"
      :validation-schema="jupyterRequestSchema"
      v-slot="{ errors, isSubmitting }"
    >
      <p class="lead mb-1 mt-4">General</p>

      <div class="form-floating mb-2">
        <Field
          name="name"
          type="text"
          class="form-control"
          id="name-input"
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
          placeholder="Slug"
          :class="{ 'is-invalid': errors.slug || !slugAvail }"
          @blur="checkSlug"
          required
        />
        <label for="slug-input">Slug</label>
        <div class="invalid-feedback">{{ errors.slug }}</div>
        <div v-if="!slugAvail" class="invalid-feedback">Slug is already taken</div>
      </div>
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

      <p class="lead mb-1 mt-4">Usage period</p>

      <div class="form-floating mb-2">
        <Field
          name="startDate"
          type="date"
          :value="getNextSemesterStartDateAsIso()"
          :min="getTodayAsIso()"
          :max="getYearsLaterAsIso(2)"
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
          :value="getNextSemesterEndDateAsIso()"
          :min="getTodayAsIso()"
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
          placeholder="Juptyer Container Image"
          value="docker.io/jupyter/base-notebook:latest"
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
              value="25"
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
              value="0.25"
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
              value="0.25"
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
              value="0.5"
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore tempora odio corrupti
          inventore mollitia, enim laboriosam quia saepe amet necessitatibus, quam, magni minus?
          Est, odio ea nam quis officia perspiciatis.
        </label>
        <div class="invalid-feedback border-top border-danger mt-3">
          {{ errors.tosConfirmation }}
        </div>
      </div>

      <div class="form-floating mt-5">
        <button class="btn btn-dark w-100" :disabled="isSubmitting" type="submit">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Submit request
        </button>
      </div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
    </Form>
    <hr />
    <div class="d-grid gap-2 d-md-flex">
      <RouterLink :to="{ name: 'jupyter-overview' }" class="w-100 btn btn-sm btn-outline-secondary"
        >Cancel</RouterLink
      >
    </div>
  </div>
</template>
