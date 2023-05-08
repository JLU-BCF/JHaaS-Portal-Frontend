<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useJupyterStore } from '@/stores/jupyter';
import JupyterList from '@/components/jupyter/JupyterList.vue';

const jupyterStore = useJupyterStore();
jupyterStore.loadMyJupyters();
</script>

<template>
  <h1>My Jupyter Hubs</h1>
  <hr />

  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia porro tempore at
    facilis fuga assumenda, aut rem, sint provident officiis ipsam magni quod facere velit et eaque
    impedit corrupti.
  </p>

  <RouterLink class="btn btn-outline-success mb-5" :to="{ name: 'jupyter-create' }"
    >+ Create new Request</RouterLink
  >

  <div v-if="jupyterStore.fetchInProgress">
    <div class="spinner-grow spinner-grow-sm align-middle" role="status"></div>
    <span class="mx-3">Loading...</span>
  </div>

  <JupyterList v-else :jupyters="jupyterStore.myJupyters">
    <p>
      There are no hubs to display. Start by
      <RouterLink :to="{ name: 'jupyter-create' }">creating a hub</RouterLink>.
    </p>
  </JupyterList>
</template>
