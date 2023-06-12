<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useParticipationStore } from '@/stores/participation';
import type { Jupyter } from '@/models/jupyter.model';
import { ref, type Ref } from 'vue';

const route = useRoute();
const slug = route.params.slug;

const participationStore = useParticipationStore();
const jupyter: Ref<Jupyter | undefined> = ref();

participationStore
  .fetchJupyterForParticipation(slug)
  .then((jupyterInstance) => (jupyter.value = jupyterInstance));

</script>

<template>
  <h1>Participation request</h1>
  <hr />

  <p>You are about to submit a participation request for the following course:</p>

  {{ jupyter }}
</template>
