<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <h1>Admin Area</h1>
  <hr />

  <div class="row">
    <div class="col-12 col-md-6 col-lg-4 mt-4">
      <p class="lead">Request Management</p>
      <RouterLink class="btn btn-outline-dark mb-2 w-100" :to="{ name: 'admin-open-requests' }">
        Review open Requests
      </RouterLink>

      <RouterLink class="btn btn-outline-dark mb-2 w-100" :to="{ name: 'admin-list-requests' }">
        Search Requests
      </RouterLink>
    </div>
    <div class="col-12 col-md-6 col-lg-4 mt-4">
      <p class="lead">User Management</p>
      <RouterLink class="btn btn-outline-dark mb-2 w-100" :to="{ name: 'jupyter-create' }">
        Search Users
      </RouterLink>
    </div>
    <div class="col-12 col-md-6 col-lg-4 mt-4">
      <p class="lead">Misc Management</p>
      <RouterLink class="btn btn-outline-dark mb-2 w-100" :to="{ name: 'admin-tos-overview' }">
        Terms of Service
      </RouterLink>
    </div>
  </div>
</template>
