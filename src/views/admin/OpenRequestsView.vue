<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useJupyterStore } from '@/stores/jupyter';

const jupyter = useJupyterStore();
jupyter.fetchOpenJupyters();
</script>

<template>
  <h1>Review</h1>
  <hr />

  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia porro tempore at
    facilis fuga assumenda, aut rem, sint provident officiis ipsam magni quod facere velit et eaque
    impedit corrupti.
  </p>

  <RouterLink class="btn btn-outline-dark mb-5" :to="{ name: 'jupyter-create' }"
    >+ Create new Request</RouterLink
  >

  <div v-if="jupyter.fetchInProgress">
    <div class="spinner-grow spinner-grow-sm align-middle" role="status"></div>
    <span class="mx-3">Loading...</span>
  </div>

  <div v-if="jupyter.jupyters.size" class="table-responsive">
    <table class="table table-striped table-responsive table-hover align-middle">
      <thead>
        <tr>
          <th scope="col"><strong>Name</strong></th>
          <th scope="col"><strong>Slug</strong></th>
          <th scope="col"><strong>User</strong></th>
          <th scope="col" class="text-end"><strong>Request Period</strong></th>
          <th scope="col" class="text-end"><strong></strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="jhRequest in jupyter.jupyters" :key="jhRequest.id">
          <th scope="row">
            {{ jhRequest.name }}
            <div v-if="jhRequest.changeRequests?.length">
              <small>
                <span class="text-secondary">
                  {{ jhRequest.changeRequests.length }} change requests,
                </span>
                <span :class="`text-${jhRequest.pending() ? 'info' : 'success'}`">
                  {{ jhRequest.pending() }} pending
                </span>
              </small>
            </div>
          </th>
          <td>{{ jhRequest.slug }}</td>
          <td>
            {{ jhRequest.creator?.firstName }} {{ jhRequest.creator?.lastName }}
            <div>
              <small class="text-secondary">{{ jhRequest.creator?.email }}</small>
            </div>
          </td>
          <td class="text-end">
            {{ jhRequest.startDate?.toLocaleDateString() }} -
            {{ jhRequest.endDate?.toLocaleDateString() }}
          </td>
          <td class="text-end dropdown">
            <RouterLink
              :to="{ name: 'jupyter-details', params: { slug: jhRequest.slug } }"
              class="btn btn-sm btn-dark"
              type="button"
            >
              <span class="visually-hidden">Details</span>
              <span class="mx-1">&rsaquo;</span>
            </RouterLink>
            <button @click="jupyter.acceptJupyter(jhRequest.id!)">Accept</button>
            <button @click="jupyter.rejectJupyter(jhRequest.id!)">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="!jupyter.jupyters.size && !jupyter.fetchInProgress">
    <p>You have no Hubs yet.</p>
  </div>
</template>
