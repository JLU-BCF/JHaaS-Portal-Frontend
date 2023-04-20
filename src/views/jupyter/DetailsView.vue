<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useJupyterStore } from '@/stores/jupyter';
import { ref, type Ref } from 'vue';
import type { Jupyter } from '@/models/jupyter.model';
import JupyterRequestDetails from '@/components/jupyter/JupyterRequestDetails.vue';
import ChangeRequestList from '@/components/jupyter/ChangeRequestList.vue';

const route = useRoute();

const jupyterStore = useJupyterStore();
const jupyter: Ref<Jupyter | null> = ref(null);
jupyterStore
  .fetchJupyter(route.params.slug)
  .then((jupyterInstance) => (jupyter.value = jupyterInstance ?? null));
</script>

<template>
  <div v-if="jupyterStore.fetchInProgress">
    <div class="spinner-grow spinner-grow-sm align-middle" role="status"></div>
    <span class="mx-3">Loading...</span>
  </div>
  <div v-if="!jupyter && !jupyterStore.fetchInProgress">
    <p>Oops - something went wrong.</p>
  </div>

  <div v-if="jupyter">
    <h1>
      {{ jupyter.name }}
      <small class="text-secondary ms-2">/{{ jupyter.slug }}</small>
    </h1>
    <p>
      From <strong>{{ jupyter.startDate?.toLocaleDateString() }}</strong> until
      <strong>{{ jupyter.endDate?.toLocaleDateString() }}</strong
      >.
      <br />
      Status: <strong :class="`text-${jupyter.getStatusColor()}`">{{ jupyter.status }}</strong>
    </p>

    <hr />

    <div class="row">
      <div class="col-12 col-md-6">
        <div class="card">
          <div class="card-header text-bg-dark">
            <p class="lead m-0">Details</p>
          </div>
          <div class="card-body">
            <JupyterRequestDetails :jupyter="jupyter" />
          </div>
        </div>
        <RouterLink class="btn btn-dark w-100 mt-4" :to="{ name: 'jupyter-update' }">
          Create change request
        </RouterLink>
      </div>
      <div class="col-12 col-md-6 mt-5 mt-md-0">
        <ChangeRequestList :changeRequests="jupyter.changeRequests" />
      </div>
    </div>
  </div>

  <hr />

  <RouterLink class="btn btn-outline-dark w-100 mw-330" :to="{ name: 'jupyter-overview' }">
    Back
  </RouterLink>
</template>
