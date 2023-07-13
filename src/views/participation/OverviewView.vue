<script setup lang="ts">
import { type Ref, ref, computed } from 'vue';
import { useParticipationStore } from '@/stores/participation.store';
import { Participation } from '@/models/participation.model';
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
  <div class="row">
    <div class="col-12 col-sm-9 col-lg-6">
      <p>
        The following is a list of the courses for which you have requested participation. These are
        sorted by participation status. Once you have been accepted for a course and it has started,
        you can start your Jupyter Notebook on this page.
      </p>
      <p>
        If you feel you have been incorrectly rejected for a course, please contact your course
        instructor. He/she can change your participation status even after the course has started.
      </p>
    </div>
  </div>

  <div v-if="acceptedParticipations.length">
    <h3 class="mt-5 mb-3 text-success">Confirmed Participations</h3>
    <hr class="border-success" />
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
    <h3 class="mt-5 mb-3 text-secondary">Pending Participation Requests</h3>
    <hr class="border-secondary" />
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
    <h3 class="mt-5 mb-3 text-danger">Rejected Participations</h3>
    <hr class="border-danger" />
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
