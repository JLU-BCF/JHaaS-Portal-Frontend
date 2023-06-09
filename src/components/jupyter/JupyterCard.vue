<script setup lang="ts">
import type { Participation } from '@/models/participation.model';

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
const borderClass = accepted
  ? 'border-success'
  : props.participation.status == 'PENDING'
    ? 'border-secondary'
    : 'border-danger';
</script>

<template>
  <div class="card" :class="borderClass">
    <div class="card-body">
      <h5 class="card-title">{{ participation.hub!.name }}</h5>
      <p class="card-text">{{ participation.hub!.description }}</p>
      <hr />
      <div v-if="today.getTime() < participation.hub!.startDate.getTime()">
        <p class="text-center">
          Starts at
          <strong class="text-success">{{ participation.hub.startDate.toDateString() }}</strong>
        </p>
        <a v-show="accepted" href="#" class="btn btn-secondary w-100 disabled">Hub not started</a>
      </div>
      <div v-else-if="today.getTime() > participation.hub!.endDate.getTime()">
        <p class="text-center">
          Ended at <strong>{{ participation.hub.endDate.toDateString() }}</strong>
        </p>
        <a v-show="accepted" href="#" class="btn btn-secondary w-100 disabled">Hub ended</a>
      </div>
      <div v-else-if="participation.hub.status == 'DEPLOYED'">
        <p class="text-center">Hub is <strong class="text-success">online</strong></p>
        <a v-show="accepted" href="#" class="btn btn-success w-100">Open</a>
      </div>
      <div v-else>
        <p class="text-center"><strong class="text-danger">Hub is offline</strong></p>
        <a v-show="accepted" href="#" class="btn btn-secondary w-100 disabled">Hub not available</a>
      </div>
      <div v-if="!accepted">
        <a href="#" class="btn btn-secondary w-100 disabled">No access</a>
      </div>
    </div>
  </div>
</template>
