<script setup lang="ts">
import type { Jupyter } from '@/models/jupyter.model';

defineProps({
  jupyters: {
    type: Array<Jupyter>,
    required: true
  }
});
</script>

<template>
  <div v-if="jupyters.length" class="table-responsive">
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
        <tr v-for="jupyter in jupyters" :key="jupyter.id">
          <th scope="row">
            {{ jupyter.name }}
            <div v-if="jupyter.changeRequests.length">
              <small>
                <span class="text-secondary">
                  {{ jupyter.changeRequests.length }} change requests,
                </span>
                <span :class="`text-${jupyter.pending() ? 'info' : 'success'}`">
                  {{ jupyter.pending() }} pending
                </span>
              </small>
            </div>
          </th>
          <td>{{ jupyter.slug }}</td>
          <td>
            {{ jupyter.creator.firstName }} {{ jupyter.creator.lastName }}
            <div>
              <small class="text-secondary">{{ jupyter.creator.email }}</small>
            </div>
          </td>
          <td class="text-end">
            {{ jupyter.startDate.toLocaleDateString() }} -
            {{ jupyter.endDate.toLocaleDateString() }}
          </td>
          <td class="text-end dropdown">
            <RouterLink
              :to="{ name: 'admin-review-jupyter', params: { slug: jupyter.slug } }"
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
  <slot v-else></slot>
</template>
