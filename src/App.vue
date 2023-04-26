<script setup lang="ts">
import { RouterView } from 'vue-router';
import DefaultNav from '@/components/DefaultNav.vue';
import DefaultFooter from '@/components/DefaultFooter.vue';
import NotificationComponent from '@/components/NotificationComponent.vue';
</script>

<template>
  <header>
    <DefaultNav />
  </header>
  <main>
    <NotificationComponent />
    <div class="container mt-5">
      <RouterView />
    </div>
  </main>
  <DefaultFooter />
</template>
