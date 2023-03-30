<script setup lang="ts">
import { RouterView } from 'vue-router';
import DefaultNav from './components/DefaultNav.vue';
</script>

<template>
  <header>
    <DefaultNav />
  </header>
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>
