<script setup lang="ts">
import { type Ref, ref, computed } from 'vue';
import { useParticipationStore } from '../../stores/participation';
import { Participation } from '../../models/participation.model';
import JupyterCard from '@/components/jupyter/JupyterCard.vue';

const today = new Date();
const participationStore = useParticipationStore();
const participations: Ref<Participation[]> = ref([]);

participationStore.fetchUserParticipations().then((data) => {
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
</script>

<template>
  <h1>My Participations</h1>
  <hr />

  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia porro tempore at
    facilis fuga assumenda, aut rem, sint provident officiis ipsam magni quod facere velit et eaque
    impedit corrupti.
  </p>

  <div v-if="acceptedParticipations.length">
    <h2 class="mt-5 mb-3 text-success">Confirmed Participations</h2>
    <div class="row">
      <div
        v-for="participation in acceptedParticipations"
        :key="participation.hubId"
        class="col-12 col-md-6 col-xl-4"
      >
        <JupyterCard :participation="participation" :today="today" />
      </div>
    </div>
  </div>

  <div v-if="pendingParticipations.length">
    <h2 class="mt-5 mb-3 text-secondary">Pending Participation Requests</h2>
    <div class="row">
      <div
        v-for="participation in pendingParticipations"
        :key="participation.hubId"
        class="col-12 col-md-6 col-xl-4"
      >
        <JupyterCard :participation="participation" />
      </div>
    </div>
  </div>

  <div v-if="rejectedParticipations.length">
    <h2 class="mt-5 mb-3 text-danger">Rejected Participations</h2>
    <div class="row">
      <div
        v-for="participation in rejectedParticipations"
        :key="participation.hubId"
        class="col-12 col-md-6 col-xl-4"
      >
        <JupyterCard :participation="participation" />
      </div>
    </div>
  </div>

  <div v-if="participations.length == 0">
    <p>You have not yet requested participation in a course.</p>
  </div>
</template>
