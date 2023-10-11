<script setup lang="ts">
import { ref } from 'vue';

const tosContent = ref(`<p>
  <span class="spinner-grow spinner-grow-sm align-middle" role="status"></span>
  ToS loading. If the ToS do not load, you can access them <a href="/tos/latest.html">here</a>.
</p>`);

fetch('/tos/latest.html').then(async (val) => {
  tosContent.value = await val.text();
});
</script>
<template>
  <div v-html="tosContent" class="col-md-9 col-xl-6"></div>
</template>
