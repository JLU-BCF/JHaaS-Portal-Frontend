<script setup lang="ts">
import { JupyterBase } from '@/models/jupyter.model';
import UserConfDetails from './UserConfDetails.vue';

defineProps({
  jupyter: JupyterBase
});
</script>

<template>
  <div class="table-responsive mb-2">
    <table>
      <tr>
        <td class="pe-2">Created</td>
        <td>{{ jupyter?.createdAt?.toDateString() }}</td>
      </tr>
      <tr>
        <td class="pe-2">Status</td>
        <td>
          <strong :class="`text-${jupyter?.getStatusColor()}`">{{ jupyter?.status }}</strong>
        </td>
      </tr>
      <tr>
        <td class="pe-2">Name</td>
        <td>{{ jupyter?.name }}</td>
      </tr>
      <tr>
        <td class="pe-2">From</td>
        <td>{{ jupyter?.startDate?.toDateString() }}</td>
      </tr>
      <tr>
        <td class="pe-2">Until</td>
        <td>{{ jupyter?.endDate?.toDateString() }}</td>
      </tr>
    </table>
  </div>
  <hr />
  <p class="mb-2">
    <strong>Description:</strong>
    <br />
    {{ jupyter?.description }}
  </p>
  <p class="mb-2">
    <strong>Container Image:</strong>
    <br />
    {{ jupyter?.containerImage }}
  </p>
  <UserConfDetails :user-conf="jupyter?.userConf" />
</template>
