<script setup lang="ts">
import { type Ref, ref } from 'vue';

// import {
//   getTodayAsIso,
//   dateToDateString
// } from '@/helpers/date';

import { useTosStore } from '@/stores/tos.store';
import { useRoute } from 'vue-router';
import type { Tos } from '@/models/tos.model';

const route = useRoute();
const tosStore = useTosStore();
const tos: Ref<Tos | undefined> = ref();

tosStore.findTos(route.params.id).then((tosInstance) => {
  if (tosInstance) {
    tos.value = tosInstance;
  }
});
</script>

<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-between mb-3">
      <h1>
        TOS
        <span class="text-info" v-if="tos?.draft"> (Draft)</span>
      </h1>
      <div class="d-inline-block" v-if="tos">
        <RouterLink
          v-if="tos.draft"
          class="btn btn-outline-success me-1"
          :to="{ name: 'admin-tos-edit', params: { id: tos.id } }"
          >Edit</RouterLink
        >
        <RouterLink class="btn btn-outline-dark" :to="{ name: 'admin-tos-overview' }"
          >Back</RouterLink
        >
      </div>
    </div>
  </div>

  <div class="row" v-if="tos">
    <div class="col-12 d-flex justify-content-between">
      <table>
        <tr>
          <td class="pe-1"><strong>From:</strong></td>
          <td>{{ tos.createdAt.toDateString() }}</td>
        </tr>
        <tr>
          <td class="pe-1"><strong>Validity start:</strong></td>
          <td>{{ tos.validity_start.toDateString() }} <span v-if="tos.draft">(Planned)</span></td>
        </tr>
        <tr v-if="tos.published_date" class="text-success">
          <td><strong>Published:</strong></td>
          <td class="pe-1">{{ tos.published_date.toDateString() }}</td>
        </tr>
      </table>
    </div>
  </div>

  <hr />

  <div class="col-12 col-lg-10 col-xxl-8 mt-3" v-if="tos">
    <div class="form-group mb-4">
      <label for="tos-preview">Content</label>
      <div class="card">
        <div class="card-body" id="tos-preview" v-html="tos.text_html"></div>
      </div>
    </div>
  </div>
</template>
