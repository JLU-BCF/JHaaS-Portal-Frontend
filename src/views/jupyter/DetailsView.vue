<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useJupyterStore } from '@/stores/jupyter';

const route = useRoute();

const jupyterStore = useJupyterStore();
const jupyter = await jupyterStore.fetchJupyter(route.params.slug);
</script>

<template>
  <h1>My Jupyter Hubs</h1>
  <hr />

  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia porro tempore at
    facilis fuga assumenda, aut rem, sint provident officiis ipsam magni quod facere velit et eaque
    impedit corrupti.
  </p>

  <RouterLink class="btn btn-outline-dark mb-5" :to="{ name: 'jupyter-create' }"
    >+ Create new Request</RouterLink
  >

  <div v-if="jupyterStore.fetchInProgress">
    <div class="spinner-grow spinner-grow-sm align-middle" role="status"></div>
    <span class="mx-3">Loading...</span>
  </div>

  <div v-if="jupyter" class="">
    {{ jupyter }}
  </div>
  <div v-if="!jupyter && !jupyterStore.fetchInProgress">
    <p>You have no Hubs yet.</p>
  </div>
</template>
