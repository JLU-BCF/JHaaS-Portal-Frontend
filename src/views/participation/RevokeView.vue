<script setup lang="ts">
import router from '@/router';
import { useRoute, RouterLink } from 'vue-router';
import { useParticipationStore, type HubForParticipation } from '@/stores/participation.store';
import { ref, type Ref } from 'vue';
import { Participation } from '@/models/participation.model';
import { useAuthStore } from '@/stores/auth.store';

const route = useRoute();
const slug = route.params.slug;
const verificationToken = route.query.verification;

const participationStore = useParticipationStore();
const hub: Ref<HubForParticipation | undefined> = ref();
const participation: Ref<Participation | undefined> = ref();
const loadingHub = ref(true);
const loadingParticipation = ref(false);

const { user } = useAuthStore();

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
        }
      })
      .finally(() => {
        loadingParticipation.value = false;
      });
  })
  .finally(() => {
    loadingHub.value = false;
  });

function confirmExit(participantId: string, hubId: string) {
  participationStore.cancelParticipation(participantId, hubId, verificationToken?.toString())
    .then(() => {
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
    <h3 class="text-muted">You have requested to leave this hub.</h3>
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
          <hr />
          <h5 class="text-danger">Caution:</h5>
          <p class="text-danger">
            You are about to leave <strong>{{ hub.name }}</strong>.
            This will delete all your data on this hub and will prevent you from logging into this hub.
            You can request access to the hub again at any time.
          </p>
          <button
            class="btn btn-outline-danger w-100"
            @click="confirmExit(participation.participantId, participation.hubId)"
          >
            I understand and
            <br />
            I want to <strong>leave now</strong>
          </button>
        </div>
        <div v-else-if="hub.creatorId == user.id">
          <hr />
          <h5 class="text-danger">Information</h5>
          <p class="text-danger">
            You cannot cancel participation, as this is your own hub!
          </p>
          <RouterLink
            :to="{ name: 'jupyter-details', params: { slug: hub.slug } }"
            class="btn btn-outline-info w-100"
          >
            Open details
          </RouterLink>
        </div>
        <div v-else>
          <hr />
          <h5 class="text-danger">Information</h5>
          <p class="text-danger">
            You cannot cancel participation as you are not participating this hub.
          </p>
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
