<script setup lang="ts">
import { useJupyterStore } from '@/stores/jupyter';
import AdminOverviewList from '@/components/jupyter/AdminOverviewList.vue';
import type { Jupyter } from '@/models/jupyter.model';
import { ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const jupyterStore = useJupyterStore();
const jupyters: Ref<Jupyter[]> = ref([]);

jupyterStore.fetch('all').then((jupyterInstances) => (jupyters.value = jupyterInstances));

const page = ref(Number(route.query.page) || 1);
</script>

<template>
  <h1>All Requests</h1>
  <p class="">Page {{ page }}</p>
  <hr />

  <div v-if="jupyterStore.fetchInProgress">
    <div class="spinner-grow spinner-grow-sm align-middle" role="status"></div>
    <span class="mx-3">Loading...</span>
  </div>
  <AdminOverviewList v-else :jupyters="jupyters">
    There are no pending requests for review.
  </AdminOverviewList>
</template>
