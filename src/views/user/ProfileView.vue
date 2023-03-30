<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const user = useUserStore();
const me = user.fetchMe();
</script>

<template>
  <h1>This is me:</h1>
  <p>{{ me }}</p>
</template>
