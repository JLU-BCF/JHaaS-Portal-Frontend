<script setup lang="ts">
import { Jupyter } from '@/models/jupyter.model';
import { Participation } from '@/models/participation.model';
import { useParticipationStore } from '@/stores/participation.store';
import { ref } from 'vue';

defineProps({
  hub: {
    type: Object as () => Jupyter,
    required: true
  },
  participations: {
    type: Object as () => Participation[],
    required: true
  },
  jupyterHubUsers: {
    type: Object as () => string[],
    required: true
  },
  borderClass: {
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

const moreActionsCollapseState = ref<Record<string, boolean>>({});
function collapseMoreActions(participantId: string) {
  moreActionsCollapseState.value[participantId] =
    moreActionsCollapseState.value[participantId] != true;
}
</script>

<template>
  <div
    class="row border rounded mx-2 my-1 p-2"
    :class="borderClass"
    v-for="participation in participations"
    :key="`${participation.participantId}-${participation.hubId}`"
  >
    <div class="col-12 d-flex justify-content-between align-items-center flex-wrap">
      <div>
        <div class="d-flex justify-content-start align-items-end flex-wrap">
          <h5 class="mb-0">
            {{ participation.participant.firstName }} {{ participation.participant.lastName }}
          </h5>
          <h6 class="text-muted mb-0 ms-2 trunc-column">
            <small class="">{{ participation.participant.externalId }}</small>
          </h6>
        </div>
        <small class="ms-2">
          <a :href="`mailto:${participation.participant.email}`">{{
            participation.participant.email
          }}</a>
        </small>
      </div>
      <div>
        <button
          class="btn btn-sm btn-success mx-1"
          :disabled="participation.status === 'ACCEPTED'"
          @click="takeParticipationAction(participation, 'accept')"
        >
          &#128077;
        </button>
        <button
          class="btn btn-sm btn-danger mx-1"
          :disabled="participation.status === 'REJECTED'"
          @click="takeParticipationAction(participation, 'reject')"
        >
          &#128078;
        </button>
        <button
          class="btn btn-sm mx-1"
          :class="
            moreActionsCollapseState[participation.participantId] ? 'btn-dark' : 'btn-secondary'
          "
          @click="collapseMoreActions(participation.participantId)"
        >
          &#128712;
        </button>
      </div>
    </div>

    <div class="row" :hidden="!moreActionsCollapseState[participation.participantId]">
      <hr class="my-2" :class="borderClass" />

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
          <button class="btn btn-sm btn-dark w-100 mx-1" :disabled="true">Promote</button>
        </div>
      </div>

      <div class="col-12 col-lg-6">
        <p class="fw-light fs-6 mb-0">Jupyter Notebook</p>
        <div
          v-if="jupyterHubUsers.includes(participation.participant.externalId)"
          class="d-flex justify-content-between my-1"
        >
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
            target="_blank"
            :href="`${hub.hubUrl}user/${participation.participant.externalId}/`"
          >
            Access
          </a>
        </div>
        <div v-else class="d-flex justify-content-between my-1">
          <button class="btn btn-sm btn-light w-100 mx-1 disabled">Not available</button>
        </div>
      </div>
    </div>
  </div>
</template>
