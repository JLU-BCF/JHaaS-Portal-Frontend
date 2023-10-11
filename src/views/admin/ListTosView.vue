<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useTosStore, type Tos } from '@/stores/tos.store';

const tosStore = useTosStore();
const tosList: Ref<Tos[] | null> = ref(null);

tosStore
  .fetchTosList()
  .then((tosInstances: Tos[]) => {
    tosList.value = tosInstances;
  })
  .catch();
</script>

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

  <div v-if="!tosList">
    <h4>Loading...</h4>
  </div>

  <div v-else-if="tosList.length == 0">
    <h4 class="text-danger">There are no TOS yet.</h4>
    <p class="text-danger">Please create TOS.</p>
  </div>

  <table v-else>
    <tr v-for="tos in tosList" v-bind:key="tos.id">
      <td>TOS from {{ tos.createdAt }}</td>
    </tr>
  </table>
</template>
