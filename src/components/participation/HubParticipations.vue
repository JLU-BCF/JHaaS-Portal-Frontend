<script setup lang="ts">
import type { Jupyter } from '@/models/jupyter.model';
import { Participation } from '@/models/participation.model';
import { useParticipationStore } from '@/stores/participation.store';
import ParticipationTable from '@/components/participation/ParticipationTable.vue';
import { computed, ref, type Ref } from 'vue';

const props = defineProps({
  hub: {
    type: Object as () => Jupyter,
    required: true
  }
});

const loadingParticipations = ref(true);

const participationStore = useParticipationStore();
const participations: Ref<Participation[]> = ref([]);

participationStore.fetchHubParticipations(props.hub.slug).then((data) => {
  loadingParticipations.value = false;
  for (const participation of data.instances) {
    participations.value.push(new Participation(participation));
  }
});

const acceptedParticipations = computed(() =>
  participations.value.filter((elem) => elem.status == 'ACCEPTED')
);
const rejectedParticipations = computed(() =>
  participations.value.filter((elem) => elem.status == 'REJECTED')
);
const pendingParticipations = computed(() =>
  participations.value.filter((elem) => elem.status == 'PENDING')
);

function updateParticipation(updatedParticipation: Participation) {
  participations.value.forEach((participation) => {
    if (
      participation.hubId == updatedParticipation.hubId &&
      participation.participantId == updatedParticipation.participantId
    ) {
      participation.status = updatedParticipation.status;
    }
  });
}
</script>

<template>
  <div v-if="loadingParticipations">
    <div class="spinner-grow spinner-grow-sm align-middle" role="status"></div>
    <span class="mx-3">Loading participations...</span>
  </div>

  <div v-else-if="participations.length">
    <div
      v-if="pendingParticipations.length"
      class="table-responsive border-start border-secondary ps-2 mt-4"
    >
      <h6 class="text-secondary">Pending Participations</h6>
      <ParticipationTable
        @participation-action-taken="updateParticipation"
        :participations="pendingParticipations"
        tableClass="table-secondary"
      >
      </ParticipationTable>
    </div>

    <div
      v-if="acceptedParticipations.length"
      class="table-responsive border-start border-success ps-2 mt-4"
    >
      <h6 class="text-success">Confirmed Participations</h6>
      <ParticipationTable
        @participation-action-taken="updateParticipation"
        :participations="acceptedParticipations"
        tableClass="table-success"
      >
      </ParticipationTable>
    </div>

    <div
      v-if="rejectedParticipations.length"
      class="table-responsive border-start border-danger ps-2 mt-4"
    >
      <h6 class="text-danger">Rejected Participations</h6>
      <ParticipationTable
        @participation-action-taken="updateParticipation"
        :participations="rejectedParticipations"
        tableClass="table-danger"
      >
      </ParticipationTable>
    </div>
  </div>

  <div v-else>
    <p>There are no participations yet.</p>
  </div>
</template>
