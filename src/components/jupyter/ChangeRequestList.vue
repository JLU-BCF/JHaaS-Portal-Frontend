<script setup lang="ts">
import type { Jupyter, JupyterChange } from '@/models/jupyter.model';
import JupyterRequestDetails from '@/components/jupyter/JupyterRequestDetails.vue';
import JupyterActions from './JupyterActions.vue';

defineProps({
  changeRequests: Array<JupyterChange>,
  isReview: Boolean
});

const emits = defineEmits({
  actionTaken(instance: Jupyter) {
    return instance;
  }
});

function passThroughEmit(instance: Jupyter) {
  emits('actionTaken', instance);
}
</script>

<template>
  <div v-if="changeRequests">
    <div v-if="changeRequests.length" class="card">
      <div class="card-header">
        <p class="float-start lead m-0">Latest Change Request</p>
      </div>
      <div class="card-body">
        <JupyterRequestDetails :jupyter="changeRequests[0]" />
        <JupyterActions
          @action-taken="passThroughEmit"
          :isReview="isReview"
          :jupyter="changeRequests[0]"
          :isChangeRequest="true"
        />
      </div>
    </div>
    <div v-if="changeRequests.length > 1" class="mt-4">
      <button
        class="btn btn-light border w-100"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#hist-collapse"
        aria-expanded="false"
        aria-controls="hist-collapse"
      >
        History
      </button>
      <div
        class="collapse border-start border-secondary border-2 rounded ps-2 mt-4"
        id="hist-collapse"
      >
        <div
          v-for="changeRequest of changeRequests.slice(1)"
          v-bind:key="changeRequest.id"
          class="card card-body bg-light mb-4"
        >
          <JupyterRequestDetails :jupyter="changeRequest" />
        </div>
      </div>
    </div>
  </div>
</template>
