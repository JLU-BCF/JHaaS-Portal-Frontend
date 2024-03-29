<script setup lang="ts">
import type { Participation } from '@/models/participation.model';
import { useParticipationStore } from '@/stores/participation.store';

const participationStore = useParticipationStore();

const props = defineProps({
  participation: {
    type: Object as () => Participation,
    required: true
  },
  today: {
    type: Date,
    default: new Date()
  }
});

const accepted = props.participation.status == 'ACCEPTED';

// prettier-ignore
const borderClass =
  props.participation.status == 'ACCEPTED' ? 'border-success' :
  props.participation.status == 'PENDING' ? 'border-secondary' :
  'border-danger';
</script>

<template>
  <div v-if="participation.hub" class="card" :class="borderClass">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <h5 class="card-title lh-base m-0">{{ participation.hub.name }}</h5>
        <div class="btn-group">
          <button
            class="btn btn-sm btn-danger dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <button
                class="dropdown-item text-danger"
                @click="
                  participationStore.cancelParticipation(
                    participation.participantId,
                    participation.hubId
                  )
                "
              >
                cancel participation
              </button>
            </li>
          </ul>
        </div>
      </div>
      <p class="card-text mt-1">{{ participation.hub.description }}</p>
      <hr />
      <div v-if="today.getTime() < participation.hub.startDate.getTime()">
        <p class="text-center">
          Starts at
          <strong class="text-success">{{ participation.hub.startDate.toDateString() }}</strong>
        </p>
        <a v-show="accepted" href="#" class="btn btn-secondary w-100 disabled">Hub not started</a>
      </div>
      <div v-else-if="today.getTime() > participation.hub.endDate.getTime()">
        <p class="text-center">
          Ended at <strong>{{ participation.hub.endDate.toDateString() }}</strong>
        </p>
        <a v-show="accepted" href="#" class="btn btn-secondary w-100 disabled">Hub ended</a>
      </div>
      <div v-else-if="participation.hub.status == 'DEPLOYED'">
        <p class="text-center">Hub is <strong class="text-success">online</strong></p>
        <a
          v-show="accepted"
          :href="participation.hub.hubUrl"
          target="_blank"
          class="btn btn-success w-100"
          >Open</a
        >
      </div>
      <div v-else>
        <p class="text-center"><strong class="text-danger">Hub is offline</strong></p>
        <a v-show="accepted" href="#" class="btn btn-secondary w-100 disabled">Hub not available</a>
      </div>
      <div v-if="props.participation.status == 'PENDING'">
        <a href="#" class="btn btn-secondary w-100 disabled">Access pending</a>
      </div>
      <div v-if="props.participation.status == 'REJECTED'">
        <a href="#" class="btn btn-danger w-100 disabled">Access rejected</a>
      </div>
    </div>
  </div>
</template>
