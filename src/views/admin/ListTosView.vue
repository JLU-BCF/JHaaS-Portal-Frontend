<script setup lang="ts">
// import { ref, type Ref } from 'vue';
import { useTosStore } from '@/stores/tos.store';
import { dateToDateString } from '@/helpers/date';
const tosStore = useTosStore();
tosStore.fetchTosList();
</script>
<style>
  .trunc-column {
    width: 5em;
    max-width: 5em;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  .trunc-column:hover {
    z-index: 1;
    overflow-x: visible;
    text-overflow: clip;
  }
  .trunc-column:hover > span {
    padding-top: 5px;
    padding-bottom: 5px;
    background: white !important;
    background-color: white !important;
  }
</style>
<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-between">
      <h1>TOS Management</h1>
      <RouterLink class="btn btn-outline-success mb-5" :to="{ name: 'admin-tos-create' }"
        >+ Add TOS</RouterLink
      >
    </div>
  </div>

  <hr />

  <div v-if="tosStore.fetchInProgress">
    <h4>Loading...</h4>
  </div>

  <div v-else-if="tosStore.tosList.length == 0">
    <h4 class="text-danger">There are no TOS yet.</h4>
    <p class="text-danger">
      Please <RouterLink class="link-danger" :to="{ name: 'admin-tos-create' }"
        >create TOS</RouterLink
      >.
    </p>
  </div>

  <div class="table-responsive" v-else>
    <table class="table table-striped table-hover align-middle">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Status</th>
          <th scope="col" class="text-center">Validity Start</th>
          <th scope="col" class="text-center">Published at</th>
          <th scope="col" class="text-center">Created at</th>
          <th scope="col" class="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tos in tosStore.tosList" v-bind:key="tos.id">
          <td scope="row" class="trunc-column">
            <span>
              {{ tos.id }}
            </span>
          </td>
          <td>
            {{ tos.draft ? 'DRAFT' : 'PUBLISHED' }}
          </td>
          <td class="text-center">
            {{ dateToDateString(tos.validity_start) }}
          </td>
          <td class="text-center">
            {{ tos.published_date ? dateToDateString(tos.published_date) : 'n.A.' }}
          </td>
          <td class="text-center">
            {{ dateToDateString(tos.createdAt) }}
          </td>
          <td class="text-end">
            <RouterLink
              :to="{
                name: 'admin-tos-create',
                // params: { slug: jupyter.slug }
              }"
              class="btn btn-sm btn-outline-dark"
              type="button"
            >
              Edit
            </RouterLink>
            <RouterLink
              :to="{
                name: 'admin-tos-create',
                // params: { slug: jupyter.slug }
              }"
              class="btn btn-sm btn-dark"
              type="button"
            >
              <span class="visually-hidden">Details</span>
              <span class="mx-1">&rsaquo;</span>
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
