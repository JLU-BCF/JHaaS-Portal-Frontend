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
  <main class="pt-2">
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
  <footer class="d-flex flex-wrap justify-content-between align-items-center p-3 mt-4 border-top">
    <p class="col-md-4 mb-0 text-body-secondary">2023 Computational Bio</p>

    <a
      href="/"
      class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
    >
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap" /></svg>
    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-secondary">Contact</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-secondary">Terms of Use</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-secondary">Imprint</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-secondary">FAQs</a></li>
    </ul>
  </footer>
</template>
