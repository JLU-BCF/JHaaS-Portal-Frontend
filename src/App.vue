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
  <main class="p-2">
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
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>
