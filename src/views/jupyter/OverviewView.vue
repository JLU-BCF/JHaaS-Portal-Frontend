<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <h1>My Jupyter Hubs</h1>
  <hr />

  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia porro tempore at
    facilis fuga assumenda, aut rem, sint provident officiis ipsam magni quod facere velit et eaque
    impedit corrupti.
  </p>

  <RouterLink class="btn btn-outline-dark mb-5" :to="{ name: 'jupyter-overview' }"
    >+ Create new Request</RouterLink
  >

  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col"><strong>Slug</strong></th>
          <th scope="col"><strong>Name</strong></th>
          <th scope="col" class="text-center"><strong>Status</strong></th>
          <th scope="col" class="text-end"><strong>Actions</strong></th>
          <th scope="col" class="text-end"><strong>Created</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">my-course</th>
          <td>My first course</td>
          <td class="text-center">pending</td>
          <td class="text-end">...</td>
          <td class="text-end">2023-04-13</td>
        </tr>
        <tr>
          <th scope="row">my-course-2</th>
          <td>My second course</td>
          <td class="text-center">pending</td>
          <td class="text-end">...</td>
          <td class="text-end">2023-04-13</td>
        </tr>
        <tr>
          <th scope="row">my-course-3</th>
          <td>My third course</td>
          <td class="text-center">pending</td>
          <td class="text-end">...</td>
          <td class="text-end">2023-04-13</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
