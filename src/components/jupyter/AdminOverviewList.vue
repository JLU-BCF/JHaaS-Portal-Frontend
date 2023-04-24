<script setup lang="ts">
import type { Jupyter } from '@/models/jupyter.model';

defineProps({
  jupyters: Array<Jupyter>
});
</script>

<template>
  <div v-if="jupyters?.length" class="table-responsive">
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
        <tr v-for="jhRequest in jupyters" :key="jhRequest.id">
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
              :to="{ name: 'admin-review-jupyter', params: { slug: jhRequest.slug } }"
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
