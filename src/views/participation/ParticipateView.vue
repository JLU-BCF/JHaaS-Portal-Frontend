<script setup lang="ts">
import router from '@/router';
import { useRoute, RouterLink } from 'vue-router';
import { useParticipationStore, type HubForParticipation } from '@/stores/participation.store';
import { ref, type Ref } from 'vue';
import { Participation } from '@/models/participation.model';
import { useNotificationStore } from '@/stores/notification.store';
import { useUserStore } from '@/stores/user.store';

const route = useRoute();
const slug = route.params.slug;

const participationStore = useParticipationStore();
const hub: Ref<HubForParticipation | undefined> = ref();
const participation: Ref<Participation | undefined> = ref();
const loadingHub = ref(true);
const loadingParticipation = ref(false);
const { notify } = useNotificationStore();

const { user } = useUserStore();

participationStore
  .fetchJupyterForParticipation(slug)
  .then((hubInstance) => {
    hub.value = hubInstance;
    loadingParticipation.value = true;
    participationStore
      .fetchParticipation(slug)
      .then((participationInstance) => {
        if (participationInstance) {
          participation.value = new Participation(participationInstance);
          notify({
            display: 'info',
            message: 'You already requested access to this hub.'
          });
        }
      })
      .finally(() => {
        loadingParticipation.value = false;
      });
  })
  .finally(() => {
    loadingHub.value = false;
  });

function requestAccess(slug: string) {
  if (!confirm('Do you really want to request access to this hub?')) {
    return;
  }
  participationStore.requestAccess(slug).then(() => {
    notify({
      display: 'info',
      message: 'Access has been requested.'
    });
    router.push({ name: 'participation-overview' });
  });
}
</script>

<template>
  <div v-if="loadingHub">
    <div class="spinner-grow spinner-grow-sm align-middle" role="status"></div>
    <span class="mx-3">Loading...</span>
  </div>

  <div v-else-if="hub">
    <h1>{{ hub.name }}</h1>
    <div class="card mt-5 mw-330">
      <div class="card-body">
        <h6 class="card-title">Description</h6>
        <p class="card-text">{{ hub.description ?? 'No description provided.' }}</p>
        <p>
          <strong>Start Date:</strong> {{ new Date(hub.startDate).toDateString() }}
          <br />
          <strong>End Date:</strong> {{ new Date(hub.endDate).toDateString() }}
        </p>

        <div v-if="loadingParticipation">
          <div class="spinner-grow spinner-grow-sm align-middle" role="status"></div>
          <span class="mx-3">Loading...</span>
        </div>
        <div v-else-if="participation">
          <h5 class="mt-5">Note:</h5>
          <p class="mb-0">
            You already requested participation for this hub:
            <span v-if="participation.status == 'ACCEPTED'" class="text-success">
              your request has been accepted!
            </span>
            <span v-else-if="participation.status == 'REJECTED'" class="text-danger">
              your request has been rejected!
            </span>
            <span v-else class="text-secondary"> your request is pending! </span>
          </p>
        </div>
        <div v-else-if="hub.creatorId == user.id">
          <hr />
          <p class="text-info text-center">This is your own hub!</p>
          <RouterLink
            :to="{ name: 'jupyter-details', params: { slug: hub.slug } }"
            class="btn btn-outline-info w-100"
          >
            Open details
          </RouterLink>
        </div>
        <div v-else>
          <button @click="requestAccess(hub.slug)" class="btn btn-success w-100 mt-3">
            Request access now
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Oops - something went wrong.</p>
  </div>

  <RouterLink
    class="btn btn-outline-dark mt-5 w-100 mw-330"
    :to="{ name: 'participation-overview' }"
  >
    Back
  </RouterLink>
</template>
