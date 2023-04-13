<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <h1>New Jupyter Hub Request</h1>
  <hr />

  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia porro tempore at
    facilis fuga assumenda, aut rem, sint provident officiis ipsam magni quod facere velit et eaque
    impedit corrupti.
  </p>

  <RouterLink class="btn btn-outline-dark mb-5" :to="{ name: 'jupyter-overview' }"
    >+ Create new Request</RouterLink
  >
</template>
