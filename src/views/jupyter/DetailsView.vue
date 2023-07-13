<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useJupyterStore } from '@/stores/jupyter';
import { ref, type Ref } from 'vue';
import type { Jupyter } from '@/models/jupyter.model';
import JupyterRequestDetails from '@/components/jupyter/JupyterRequestDetails.vue';
import ChangeRequestList from '@/components/jupyter/ChangeRequestList.vue';
import JupyterActions from '@/components/jupyter/JupyterActions.vue';
import HubParticipations from '@/components/participation/HubParticipations.vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { copy2clip } from '../../helpers/clipboard';

defineProps({
  isReview: Boolean
});

const route = useRoute();
const { user } = useUserStore();
const jupyterStore = useJupyterStore();
const jupyter: Ref<Jupyter | undefined> = ref();

const participationPath = router.resolve({
  name: 'participation-participate',
  params: { slug: route.params.slug }
}).fullPath;
const participationUrl = new URL(participationPath, window.location.origin).href;

jupyterStore
  .fetch('slug', route.params.slug)
  .then((jupyterInstance) => (jupyter.value = jupyterInstance));

function updateJupyter(newInstance: Jupyter) {
  jupyter.value = newInstance;
}

function initiateLifecycleAction(action: 'redeploy' | 'degrade') {
  if (!jupyter.value) {
    return;
  }
  jupyterStore.jupyterAction(jupyter.value.id, action, false).then((jupyterInstance) => {
    if (jupyterInstance) {
      updateJupyter(jupyterInstance);
    }
  });
}
</script>

<template>
  <div v-if="jupyterStore.fetchInProgress">
    <div class="spinner-grow spinner-grow-sm align-middle" role="status"></div>
    <span class="mx-3">Loading...</span>
  </div>
  <div v-if="!jupyter && !jupyterStore.fetchInProgress">
    <p>Oops - something went wrong.</p>
  </div>

  <div v-if="jupyter">
    <h1>
      {{ jupyter.name }}
      <small class="text-secondary ms-2">/{{ jupyter.slug }}</small>
    </h1>
    <p>
      From <strong>{{ jupyter.startDate.toLocaleDateString() }}</strong> until
      <strong>{{ jupyter.endDate.toLocaleDateString() }}</strong
      >.
      <br />
      Status: <strong :class="`text-${jupyter.getStatusColor()}`">{{ jupyter.status }}</strong>
    </p>
    <p v-if="jupyter.invitationsAllowed()">
      Invitation link:
      <RouterLink :to="{ name: 'participation-participate', params: { slug: jupyter.slug } }">
        {{ participationUrl }}
      </RouterLink>
      <button @click="copy2clip(participationUrl)" class="btn btn-sm btn-outline-info mx-3">
        copy to clipboard
      </button>
    </p>
    <p v-if="jupyter.status == 'DEPLOYED'">
      Hub URL:
      <a :href="jupyter.hubUrl">
        {{ jupyter.hubUrl }}
      </a>
      <button @click="copy2clip(jupyter.hubUrl)" class="btn btn-sm btn-outline-info mx-3">
        copy to clipboard
      </button>
    </p>
    <p v-if="jupyter.status == 'FAILED' && user.isAdmin">
      <button @click="initiateLifecycleAction('redeploy')" class="btn btn-sm btn-danger mx-3">
        Mark for Redeployment
      </button>
    </p>
    <p v-if="['DEPLOYED', 'FAILED'].includes(jupyter.status) && user.isAdmin">
      <button @click="initiateLifecycleAction('degrade')" class="btn btn-sm btn-danger mx-3">
        Mark for Degration
      </button>
    </p>
    <div v-if="jupyter && user.isAdmin" class="w-100 mw-330 mt-2">
      <RouterLink
        v-if="!isReview && jupyter.changesAllowed()"
        class="text-info"
        :to="{ name: 'admin-review-jupyter', params: { slug: jupyter.slug } }"
      >
        Enter Review
      </RouterLink>
      <RouterLink
        v-if="isReview"
        class="text-info"
        :to="{ name: 'jupyter-details', params: { slug: jupyter.slug } }"
      >
        Leave Review
      </RouterLink>
    </div>

    <hr />

    <div class="row">
      <div class="col-12 col-md-6">
        <div class="card">
          <div class="card-header text-bg-dark">
            <p class="lead m-0">Details</p>
          </div>
          <div class="card-body">
            <JupyterRequestDetails :jupyter="jupyter" />
            <div v-if="jupyter.changesAllowed()">
              <RouterLink
                class="btn btn-warning w-100 mt-4"
                :to="{ name: 'jupyter-update', params: { slug: jupyter.slug } }"
              >
                Create change request
              </RouterLink>
              <JupyterActions
                @action-taken="updateJupyter"
                :isReview="isReview"
                :jupyter="jupyter"
                :isChangeRequest="false"
              />
            </div>
            <div v-else class="alert alert-warning mt-4 mb-0" role="alert">
              <strong>No more modifications are allowed.</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 mt-5 mt-md-0">
        <ChangeRequestList
          @action-taken="updateJupyter"
          :changeRequests="jupyter.changeRequests"
          :isReview="isReview"
        />
      </div>
    </div>

    <div v-if="jupyter.invitationsAllowed()" class="row mt-5">
      <div class="col">
        <h3>Manage Participations</h3>
        <HubParticipations :hub="jupyter"></HubParticipations>
      </div>
    </div>
  </div>

  <RouterLink
    class="btn btn-outline-dark mt-5 w-100 mw-330"
    :to="{ name: isReview ? 'admin-open-requests' : 'jupyter-overview' }"
  >
    Back
  </RouterLink>
</template>
