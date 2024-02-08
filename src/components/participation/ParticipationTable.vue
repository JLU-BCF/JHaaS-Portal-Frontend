<script setup lang="ts">
import { Participation } from '@/models/participation.model';
import { useParticipationStore } from '@/stores/participation.store';

defineProps({
  participations: {
    type: Object as () => Participation[],
    required: true
  },
  tableClass: {
    type: String
  }
});

const emits = defineEmits({
  participationActionTaken(instance: Participation) {
    return instance;
  },
  participationCanceled(instance: Participation) {
    return instance;
  }
});

const participationStore = useParticipationStore();

function takeParticipationAction(participation: Participation, action: 'accept' | 'reject') {
  participationStore
    .participationAction(participation.participantId, participation.hubId, action)
    .then((participationInstance) => {
      if (participationInstance) emits('participationActionTaken', participationInstance);
    });
}

function cancelParticipation(participation: Participation) {
  participationStore
    .cancelParticipation(participation.participantId, participation.hubId)
    .then((deleteResult) => {
      if (deleteResult) emits('participationCanceled', participation);
    });
}

</script>

<template>
  <div class="row border rounded mx-2 my-1 p-2"
    :class="tableClass"
    v-for="participation in participations"
    :key="`${participation.participantId}-${participation.hubId}`"
  >

    <div class="col-12 d-flex justify-content-start align-items-end flex-wrap">
      <h5 class="mb-0">
        {{ participation.participant.firstName }} {{ participation.participant.lastName }}
      </h5>
      <h6 class="text-muted mb-0 ms-2 trunc-column">
        <small class="">{{ participation.participant.externalId }}</small>
      </h6>
      <a class="ms-auto" :href="`mailto:${participation.participant.email}`">{{
        participation.participant.email
      }}</a>
    </div>

    <hr class="my-2" :class="tableClass">

    <div class="col-12 col-lg-6">
      <p class="fw-light fs-6 mb-0">Participation</p>
      <div class="d-flex justify-content-between my-1">
        <button
          class="btn btn-sm btn-danger w-100 mx-1"
          @click="cancelParticipation(participation)"
        >
          Cancel
        </button>
        <button
          class="btn btn-sm btn-warning w-100 mx-1"
          :disabled="participation.status === 'REJECTED'"
          @click="takeParticipationAction(participation, 'reject')"
        >
          Reject
        </button>
        <button
          class="btn btn-sm btn-success w-100 mx-1"
          :disabled="participation.status === 'ACCEPTED'"
          @click="takeParticipationAction(participation, 'accept')"
        >
          Accept
        </button>
        <button
          class="btn btn-sm btn-dark w-100 mx-1"
          :disabled="true"
        >
          Promote
        </button>
      </div>
    </div>

    <div class="col-12 col-lg-6">
      <p class="fw-light fs-6 mb-0">Jupyter Notebook</p>
      <div class="d-flex justify-content-between my-1">
        <button
          class="btn btn-sm btn-danger w-100 mx-1"
          @click="participationStore.notebookAction(participation, 'delete')"
        >
          Delete
        </button>
        <button
          class="btn btn-sm btn-info w-100 mx-1"
          @click="participationStore.notebookAction(participation, 'stop')"
        >
          Stop
        </button>
        <button
          class="btn btn-sm btn-info w-100 mx-1"
          @click="participationStore.notebookAction(participation, 'start')"
        >
          Start
        </button>
        <a
          class="btn btn-sm btn-dark w-100 mx-1"
          @click="cancelParticipation(participation)"
          :href="`${participation.hub?.hubUrl}`"
        >
            Access
        </a>
      </div>
    </div>

  </div>

</template>
