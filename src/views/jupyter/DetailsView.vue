<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useJupyterStore } from '@/stores/jupyter';
import { ref, type Ref } from 'vue';
import type { Jupyter } from '@/models/jupyter.model';

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

  <div v-if="jupyter">
    <h1>{{ jupyter.name }}</h1>
    <p>
      From <strong>{{ jupyter.startDate?.toLocaleDateString() }}</strong> until
      <strong>{{ jupyter.endDate?.toLocaleDateString() }}</strong
      >.
      <br />
      Status: <strong>{{ jupyter.status }}</strong>
    </p>

    <hr />
    <p>
      {{ jupyter.description }}
    </p>

    <p>
      <strong>Estimated usage:</strong>
    </p>
    <table>
      <tr>
        <td>User Count:</td>
        <td class="text-end">
          <span class="ms-2">{{ jupyter.userConf?.userCount }}</span>
        </td>
        <td>[user]</td>
      </tr>
      <tr>
        <td>CPU per User:</td>
        <td class="text-end">
          <span class="ms-2">{{ jupyter.userConf?.cpusPerUser }}</span>
        </td>
        <td>[shares]</td>
      </tr>
      <tr>
        <td>RAM per User:</td>
        <td class="text-end">
          <span class="ms-2">{{ jupyter.userConf?.ramPerUser }}</span>
        </td>
        <td>[GiB]</td>
      </tr>
      <tr>
        <td>Storage per User:</td>
        <td class="text-end">
          <span class="ms-2">{{ jupyter.userConf?.storagePerUser }}</span>
        </td>
        <td>[GiB]</td>
      </tr>
    </table>
  </div>

  <hr />

  <div v-if="jupyter" class="row">
    <div class="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mb-2">
      <RouterLink class="btn btn-dark w-100" :to="{ name: 'jupyter-update' }">
        Create change request
      </RouterLink>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3">
      <RouterLink class="btn btn-outline-dark mb-5 w-100" :to="{ name: 'jupyter-overview' }">
        Back
      </RouterLink>
    </div>
  </div>

  <div v-if="!jupyter && !jupyterStore.fetchInProgress">
    <p>You have no Hubs yet.</p>
  </div>
</template>
