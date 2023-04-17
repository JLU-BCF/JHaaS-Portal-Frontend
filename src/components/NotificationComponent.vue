<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification';
const { notifications } = useNotificationStore();
</script>

<template>
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
</template>
