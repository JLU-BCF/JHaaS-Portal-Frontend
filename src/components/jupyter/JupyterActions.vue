<script setup lang="ts">
import { type JupyterBase, Jupyter } from '@/models/jupyter.model';
import { useJupyterStore } from '@/stores/jupyter.store';

const props = defineProps({
  jupyter: {
    type: Object as () => JupyterBase,
    required: true
  },
  isChangeRequest: Boolean,
  isReview: Boolean
});

const emits = defineEmits({
  actionTaken(instance: Jupyter) {
    return instance;
  }
});

const jupyterStore = useJupyterStore();

function takeJupyterAction(action: 'cancel' | 'accept' | 'reject') {
  jupyterStore
    .jupyterAction(props.jupyter.id, action, props.isChangeRequest)
    .then((jupyterInstance) => {
      if (jupyterInstance) emits('actionTaken', jupyterInstance);
    });
}
</script>

<template>
  <div v-if="jupyter.changesAllowed()">
    <button @click="takeJupyterAction('cancel')" class="btn btn-link btn-sm text-danger w-100 mt-4">
      Cancel Request
    </button>
    <div v-if="isReview">
      <hr />
      <p class="mt-2 mb-0">
        <small><strong>Review Actions</strong></small>
      </p>
      <div class="d-grid gap-2 d-flex mt-2">
        <button
          @click="takeJupyterAction('accept')"
          class="btn btn-sm btn-success w-100"
          :disabled="jupyter.status === 'ACCEPTED'"
        >
          Accept
        </button>
        <button
          @click="takeJupyterAction('reject')"
          class="btn btn-sm btn-danger w-100"
          :disabled="jupyter.status === 'REJECTED'"
        >
          Reject
        </button>
      </div>
    </div>
  </div>
</template>
