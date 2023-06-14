<script setup lang="ts">
import { Jupyter } from '@/models/jupyter.model';
import router from '@/router';
import { computed, ref } from 'vue';
import { copy2clip } from '@/helpers/clipboard';

const props = defineProps({
  jupyters: {
    type: Array<Jupyter>,
    required: true
  },
  showStatus: {
    type: Boolean,
    default: true
  },
  showUser: {
    type: Boolean,
    default: false
  },
  isReview: {
    type: Boolean,
    default: false
  }
});

const hideOldies = ref(true);

const computedJupyters = computed(() => {
  if (hideOldies.value && !props.isReview) {
    return props.jupyters.filter((elem) => !['CANCELED', 'DEGRATED'].includes(elem.status));
  }
  return props.jupyters;
});

function toggleOldies() {
  hideOldies.value = !hideOldies.value;
}

function copyInviteUrl(slug: string) {
  const path = router.resolve({ name: 'participation-participate', params: { slug } }).fullPath;
  const url = new URL(path, window.location.origin).href;

  copy2clip(url, `Invitation URL:\n\n${url}\n\nDo you want to copy this url to clipboard?`);
}
</script>

<template>
  <p v-if="!isReview" class="text-end mb-0">
    <button class="btn btn-link text-secondary" v-if="hideOldies" @click="toggleOldies">
      Show cancelled and degrated requests
    </button>
    <button class="btn btn-link text-secondary" v-else @click="toggleOldies">
      Hide cancelled and degrated requests
    </button>
  </p>
  <div v-if="computedJupyters.length" class="table-responsive">
    <table class="table table-striped table-responsive table-hover align-middle">
      <thead>
        <tr>
          <th scope="col"><strong>Name</strong></th>
          <th scope="col"><strong>Slug</strong></th>
          <th v-if="showUser" scope="col"><strong>User</strong></th>
          <th v-if="showStatus" scope="col" class="text-center"><strong>Status</strong></th>
          <th scope="col" class="text-end"><strong>Request Period</strong></th>
          <th scope="col" class="text-end"><strong></strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="jupyter in computedJupyters" :key="jupyter.id">
          <th scope="row">
            {{ jupyter.name }}
            <div v-if="jupyter.changeRequests.length">
              <small>
                <span class="text-secondary">
                  {{ jupyter.changeRequests.length }} change requests
                </span>
                <span :class="`text-${jupyter.pending() ? 'info' : 'success'}`">
                  ({{ jupyter.pending() }} pending)
                </span>
              </small>
            </div>
          </th>
          <td>{{ jupyter.slug }}</td>
          <td v-if="showUser">
            {{ jupyter.creator.firstName }} {{ jupyter.creator.lastName }}
            <div>
              <small class="text-secondary">{{ jupyter.creator.email }}</small>
            </div>
          </td>
          <td v-if="showStatus" class="text-center">
            <strong :class="`text-${jupyter.getStatusColor()}`">{{ jupyter.status }}</strong>
          </td>
          <td class="text-end">
            {{ jupyter.startDate.toLocaleDateString() }} -
            {{ jupyter.endDate.toLocaleDateString() }}
          </td>
          <td class="text-end dropdown">
            <button
              v-if="jupyter.invitationsAllowed()"
              class="btn btn-sm btn-outline-dark me-2"
              @click="copyInviteUrl(jupyter.slug)"
            >
              Invite
            </button>
            <a
              v-if="jupyter.status == 'DEPLOYED'"
              :href="jupyter.hubUrl"
              class="btn btn-sm btn-success me-2"
              target="_blank"
            >
              Open
            </a>
            <RouterLink
              :to="{
                name: isReview ? 'admin-review-jupyter' : 'jupyter-details',
                params: { slug: jupyter.slug }
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
  <slot v-else></slot>
</template>
