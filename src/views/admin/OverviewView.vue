<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <h1>Admin Area</h1>
  <hr />

  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia porro tempore at
    facilis fuga assumenda, aut rem, sint provident officiis ipsam magni quod facere velit et eaque
    impedit corrupti.
  </p>

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
        Create new User
      </RouterLink>

      <RouterLink class="btn btn-outline-dark mb-2 w-100" :to="{ name: 'jupyter-create' }">
        Search Users
      </RouterLink>
    </div>
    <div class="col-12 col-md-6 col-lg-4 mt-4">
      <p class="lead">Misc Management</p>
      <RouterLink class="btn btn-outline-dark mb-2 w-100" :to="{ name: 'jupyter-create' }">
        Failures
      </RouterLink>

      <RouterLink class="btn btn-outline-dark mb-2 w-100" :to="{ name: 'jupyter-create' }">
        Access Storage
      </RouterLink>
    </div>
  </div>
</template>
