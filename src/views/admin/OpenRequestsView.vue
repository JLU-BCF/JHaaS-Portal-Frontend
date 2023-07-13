<script setup lang="ts">
import { useJupyterStore } from '@/stores/jupyter.store';
import type { Jupyter } from '@/models/jupyter.model';
import { ref, type Ref } from 'vue';
import JupyterList from '@/components/jupyter/JupyterList.vue';

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

  <JupyterList v-else :jupyters="jupyters" :is-review="true" :show-user="true" :show-status="false">
    There are no pending requests for review.
  </JupyterList>
</template>
