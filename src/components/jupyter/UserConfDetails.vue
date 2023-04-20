<script setup lang="ts">
import type { JupyterHubRequestUserConf } from '@/models/jupyter.model';
defineProps({
  userConf: Object as () => JupyterHubRequestUserConf
});
</script>

<template>
  <p class="mb-0">
    <strong>Estimated usage:</strong>
  </p>
  <div class="table-responsive">
    <table>
      <tr>
        <td>User Count:</td>
        <td class="text-end">
          <span class="ms-2">{{ userConf?.userCount }}</span>
        </td>
        <td>[user]</td>
      </tr>
      <tr>
        <td>CPU per User:</td>
        <td class="text-end">
          <span class="ms-2">{{ userConf?.cpusPerUser }}</span>
        </td>
        <td>[shares]</td>
      </tr>
      <tr>
        <td>RAM per User:</td>
        <td class="text-end">
          <span class="ms-2">{{ userConf?.ramPerUser }}</span>
        </td>
        <td>[GiB]</td>
      </tr>
      <tr>
        <td>Storage per User:</td>
        <td class="text-end">
          <span class="ms-2">{{ userConf?.storagePerUser }}</span>
        </td>
        <td>[GiB]</td>
      </tr>
    </table>
  </div>
</template>
