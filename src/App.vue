<script setup lang="ts">
import { RouterView } from 'vue-router';
import DefaultNav from './components/DefaultNav.vue';
import { useNotificationStore } from '@/stores/notification';
const { notifications } = useNotificationStore();
</script>

<template>
  <header>
    <DefaultNav />
  </header>
  <main>
    <div v-if="notifications.size" class="w-100 text-center alert-holder">
      <div
        v-for="notification in notifications"
        v-bind:key="notification.id"
        :class="'alert alert-' + notification.display"
        role="alert"
      >
        {{ notification.message }}
      </div>
    </div>
    <div class="container mt-5">
      <RouterView />
    </div>
  </main>
  <footer class="d-flex flex-wrap justify-content-between align-items-center p-3 mt-4">
    <p class="col-md-5 col-12 mb-0 text-body-secondary text-center text-md-start">
      2023 Computational Bio
    </p>

    <div class="col-md-2 col-12 d-flex align-items-center justify-content-center">
      <img src="/favicon.ico" width="32" height="32" />
    </div>

    <ul class="nav col-md-5 col-12 justify-content-center justify-content-md-end">
      <li class="nav-item"><a href="#" class="nav-link px-2">Contact</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2">Terms of Use</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2">Imprint</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2">FAQs</a></li>
    </ul>
  </footer>
</template>
