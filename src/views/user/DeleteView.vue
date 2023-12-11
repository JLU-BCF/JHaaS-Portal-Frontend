<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useRoute } from 'vue-router';
import { dateToDateString } from '@/helpers/date';

const { user, deleteAccount, logout } = useAuthStore();
const route = useRoute();
const verificationToken = route.query.verification;

function confirmDeletion() {
  deleteAccount(verificationToken?.toString())
    .then(logout);
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

      <hr />

      You are participating following Hubs:

      <hr />
      <h5 class="text-danger">Caution:</h5>
      <p class="text-danger">
        You are about to <strong>permanently delete your account</strong>.
        This will delete your data on all hubs you participate and have participated in.
        You can register for JHaaS again at any time.
      </p>
      <p class="text-center text-danger">
        This action cannot be undone!
      </p>
      <button
        class="btn btn-outline-danger w-100"
        @click="confirmDeletion()"
      >
        I understand and I want to
        <br />
        <strong>permanently delete my account</strong>
      </button>
    </div>

  </div>

</template>
