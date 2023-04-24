<script setup lang="ts">
import { useJupyterStore } from '@/stores/jupyter';
import AdminOverviewList from '@/components/jupyter/AdminOverviewList.vue';
import type { Jupyter } from '@/models/jupyter.model';
import { ref, type Ref } from 'vue';

const jupyterStore = useJupyterStore();
const jupyters: Ref<Jupyter[]> = ref([]);

jupyterStore.fetch('pending').then((jupyterInstances) => (jupyters.value = jupyterInstances));
</script>

<template>
  <h1>Review</h1>
  <hr />

  <div v-if="jupyterStore.fetchInProgress">
    <div class="spinner-grow spinner-grow-sm align-middle" role="status"></div>
    <span class="mx-3">Loading...</span>
  </div>
  <AdminOverviewList v-else :jupyters="jupyters">
    There are no pending requests for review.
  </AdminOverviewList>
</template>
