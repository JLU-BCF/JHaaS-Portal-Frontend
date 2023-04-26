<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useJupyterStore } from '@/stores/jupyter';
import { computed, ref } from 'vue';

const jupyterStore = useJupyterStore();
const hideOldies = ref(true);

const jupyters = computed(() => {
  if (hideOldies.value) {
    return jupyterStore.myJupyters.filter(
      (elem) => !['CANCELED', 'DEGRATED'].includes(elem.status)
    );
  }
  return jupyterStore.myJupyters;
});

function toggleOldies() {
  hideOldies.value = !hideOldies.value;
}
</script>

<template>
  <h1>My Jupyter Hubs</h1>
  <hr />

  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia porro tempore at
    facilis fuga assumenda, aut rem, sint provident officiis ipsam magni quod facere velit et eaque
    impedit corrupti.
  </p>

  <RouterLink class="btn btn-outline-success mb-5" :to="{ name: 'jupyter-create' }"
    >+ Create new Request</RouterLink
  >

  <div v-if="jupyterStore.fetchInProgress">
    <div class="spinner-grow spinner-grow-sm align-middle" role="status"></div>
    <span class="mx-3">Loading...</span>
  </div>

  <div v-if="jupyters" class="table-responsive">
    <p class="text-end mb-0">
      <button class="btn btn-link text-secondary" v-if="hideOldies" @click="toggleOldies">
        Show cancelled and degrated requests
      </button>
      <button class="btn btn-link text-secondary" v-else @click="toggleOldies">
        Hide cancelled and degrated requests
      </button>
    </p>
    <table class="table table-striped table-responsive table-hover align-middle">
      <thead>
        <tr>
          <th scope="col"><strong>Name</strong></th>
          <th scope="col"><strong>Slug</strong></th>
          <th scope="col" class="text-center"><strong>Status</strong></th>
          <th scope="col" class="text-end"><strong>Request Period</strong></th>
          <th scope="col" class="text-end"><strong></strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="jupyter in jupyters" :key="jupyter.id">
          <th scope="row">
            {{ jupyter.name }}
            <div v-if="jupyter.changeRequests.length">
              <small>
                <span class="text-secondary">
                  {{ jupyter.changeRequests.length }} change requests
                </span>
                <span v-if="jupyter.pending()" class="text-info">
                  ({{ jupyter.pending() }} pending)
                </span>
              </small>
            </div>
          </th>
          <td>{{ jupyter.slug }}</td>
          <td class="text-center">
            <span :class="`text-${jupyter.getStatusColor()}`">{{ jupyter.status }}</span>
          </td>
          <td class="text-end">
            {{ jupyter.startDate.toLocaleDateString() }} -
            {{ jupyter.endDate.toLocaleDateString() }}
          </td>
          <td class="text-end dropdown">
            <RouterLink
              :to="{ name: 'jupyter-details', params: { slug: jupyter.slug } }"
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
  <div v-if="!jupyterStore.myJupyters.length && !jupyterStore.fetchInProgress">
    <p>You have no Hubs yet.</p>
  </div>
</template>
