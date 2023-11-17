<script setup lang="ts">
import { tosCreationSchema } from '@/helpers/validators';
import { Form, Field } from 'vee-validate';
import { computed, ref } from 'vue';
import { marked } from 'marked';
import { getTodayAsIso } from '@/helpers/date';
import { useTosStore } from '@/stores/tos.store';

const tosStore = useTosStore();
const previewActive = ref(false);
const draftActive = ref(true);

const text_md = ref('# Terms of Service');

const text_html = computed(() => {
  return marked(text_md.value);
});
</script>

<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-between">
      <h1>Create TOS</h1>
    </div>
  </div>

  <hr />

  <div class="col-12 col-lg-10 col-xxl-8 mt-3">
    <Form
      class="text-start my-5"
      @submit="tosStore.createTos"
      :validation-schema="tosCreationSchema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="btn-group mb-4" role="group" aria-label="Toggle Edit and Preview">
        <input
          type="radio"
          class="btn-check"
          name="preview"
          id="preview-off"
          autocomplete="off"
          :value="false"
          v-model="previewActive"
          checked
        />
        <label class="btn btn-sm btn-outline-secondary" for="preview-off">Edit</label>

        <input
          type="radio"
          class="btn-check"
          name="preview"
          id="preview-on"
          autocomplete="off"
          :value="true"
          v-model="previewActive"
        />
        <label class="btn btn-sm btn-outline-secondary" for="preview-on">Preview</label>
      </div>

      <div class="form-group mb-4" :hidden="previewActive">
        <label for="tos-input">Terms of Service - Editor</label>
        <Field
          as="textarea"
          rows="15"
          name="textMarkdown"
          class="form-control tall"
          id="tos-input"
          :class="{ 'is-invalid': errors.textMarkdown }"
          v-model="text_md"
          required
        />
        <div class="invalid-feedback">{{ errors.textMarkdown }}</div>
      </div>

      <div class="form-group mb-4" :hidden="!previewActive">
        <label for="tos-preview">Terms of Service - Preview</label>
        <div class="card">
          <div class="card-body" id="tos-preview" v-html="text_html"></div>
        </div>
      </div>

      <div class="form-group mb-4">
        <div class="form-check">
          <Field
            type="radio"
            class="form-check-input"
            name="draft"
            :value="true"
            id="draft-on"
            v-model="draftActive"
            checked
          />
          <label class="form-check-label" for="draft-on"> This is a draft. </label>
        </div>
        <div class="form-check">
          <Field
            type="radio"
            class="form-check-input"
            name="draft"
            :value="false"
            id="draft-off"
            v-model="draftActive"
          />
          <label class="form-check-label" for="draft-off"> This is the final version. </label>
        </div>
        <div class="invalid-feedback">{{ errors.draft }}</div>
      </div>

      <div class="form-group mb-4">
        <label for="validity-input">
          <span class="text-primary" v-if="draftActive"> Planned </span>
          Validity Start Date
        </label>
        <Field
          name="validityStart"
          type="date"
          :value="getTodayAsIso()"
          :min="getTodayAsIso()"
          class="form-control"
          id="validity-input"
          :class="{ 'is-invalid': errors.validityStart }"
          required
        />
        <div class="invalid-feedback">{{ errors.validityStart }}</div>
      </div>

      <div class="form-group mb-4" v-if="!draftActive">
        <div class="form-check">
          <Field
            type="checkbox"
            name="publish"
            class="form-check-input"
            :class="{ 'is-invalid': errors.publish }"
            :value="true"
            id="warning-acceptance"
          />
          <label class="form-check-label text-danger" for="warning-acceptance">
            I understand that the Terms of Service will be published immediately and cannot be
            revoked.
          </label>
          <div class="invalid-feedback">{{ errors.publish }}</div>
        </div>
      </div>

      <div class="form-group mt-5">
        <button class="btn btn-dark w-100" :disabled="isSubmitting" type="submit">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Submit Terms of Service
        </button>
      </div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
    </Form>
  </div>
</template>
