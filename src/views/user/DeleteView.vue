<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useRoute } from 'vue-router';
import { dateToDateString } from '@/helpers/date';
import { Participation } from '@/models/participation.model';
import { ref } from 'vue';
import { useParticipationStore } from '@/stores/participation.store';
import { useJupyterStore } from '@/stores/jupyter.store';

const { user, deleteAccount, logout } = useAuthStore();
const route = useRoute();
const verificationToken = route.query.verification;

const jupyterStore = useJupyterStore();
if (user.isLead) {
  jupyterStore.loadMyJupyters();
}

const participationStore = useParticipationStore();
const participations = ref<Participation[]>([]);

participationStore.fetchUserParticipations().then((data) => {
  for (const participation of data.instances) {
    participations.value.push(new Participation(participation));
  }
});

function confirmDeletion() {
  deleteAccount(verificationToken?.toString()).then(logout);
}
</script>

<template>
  <h1>{{ user.firstName }} {{ user.lastName }}</h1>
  <h3 class="text-muted">You have requested to delete your Account.</h3>

  <div class="card mt-5 mw-330" v-if="user">
    <div class="card-body">
      <h6 class="card-title">Profile</h6>
      <p class="card-text">
        {{ user.firstName }} {{ user.lastName }}<br />
        {{ user.email }}<br />
        Member since: {{ dateToDateString(user.createdAt) }}
      </p>

      <div v-if="participations.length">
        <hr />
        Your participations:
        <ul>
          <li v-for="participation in participations" :key="participation.hubId">
            {{ participation.hub?.name }} ({{ participation.status }})
          </li>
        </ul>
      </div>

      <div v-if="jupyterStore.myJupyters.length">
        <hr />
        You have created following hubs:
        <ul>
          <li v-for="hub in jupyterStore.myJupyters" :key="hub.id">
            {{ hub.name }} ({{ hub.status }})
          </li>
        </ul>
      </div>

      <hr />
      <h5 class="text-danger">Caution:</h5>
      <p class="text-danger">
        You are about to <strong>permanently delete your account</strong>. This will delete your
        data on all hubs you participate and have participated in. You can register for JHaaS again
        at any time.
      </p>
      <p class="text-center text-danger">This action cannot be undone!</p>
      <button class="btn btn-outline-danger w-100" @click="confirmDeletion()">
        I understand and I want to
        <br />
        <strong>permanently delete my account</strong>
      </button>
    </div>
  </div>

  <RouterLink class="btn btn-outline-dark mt-5 w-100 mw-330" :to="{ name: 'profile' }">
    Cancel and go back
  </RouterLink>
</template>
