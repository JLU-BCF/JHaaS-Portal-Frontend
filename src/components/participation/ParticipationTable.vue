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

function takeParticipationAction(
  participation: Participation,
  action: 'accept' | 'reject'
) {
  participationStore
    .participationAction(participation.participantId, participation.hubId, action)
    .then((participationInstance) => {
      if (participationInstance) emits('participationActionTaken', participationInstance);
    });
}

function cancelParticipation(
  participation: Participation
) {
  participationStore
    .cancelParticipation(participation.participantId, participation.hubId)
    .then((deleteResult) => {
      if (deleteResult) emits('participationCanceled', participation);
    });
}
</script>

<template>
  <table
    class="mb-0 table table-striped table-responsive table-hover align-middle"
    :class="tableClass"
  >
    <tbody>
      <tr
        v-for="participation in participations"
        :key="`${participation.participantId}-${participation.hubId}`"
      >
        <td v-if="participation.participant" scope="row" class="trunc-column">
          <span>
            {{ participation.participant.externalId }}
          </span>
        </td>
        <td v-if="participation.participant">
          {{ participation.participant.firstName }}
          {{ participation.participant.lastName }}
        </td>
        <td v-if="participation.participant">
          <a :href="`mailto:${participation.participant.email}`">{{
            participation.participant.email
          }}</a>
        </td>
        <td v-if="!participation.participant">Unknown participant.</td>
        <td>
          <div class="d-grid gap-1 d-flex">
            <button
              class="btn btn-sm btn-danger"
              @click="cancelParticipation(participation)"
            >
              &#128465;
            </button>
            <button
              class="btn btn-sm btn-danger w-100"
              :disabled="participation.status === 'REJECTED'"
              @click="takeParticipationAction(participation, 'reject')"
            >
              Reject
            </button>
            <button
              class="btn btn-sm btn-success w-100"
              :disabled="participation.status === 'ACCEPTED'"
              @click="takeParticipationAction(participation, 'accept')"
            >
              Accept
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
