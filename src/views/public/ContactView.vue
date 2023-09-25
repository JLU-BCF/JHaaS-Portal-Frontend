<script setup lang="ts">
import { useFrontendConfigurationStore } from '@/stores/config.store';
const { frontendConfiguration } = useFrontendConfigurationStore();
</script>
<template>
  <h1>Get in Touch today</h1>
  <div class="row">
    <div class="col-12 col-sm-9 col-lg-6">
      <h4 class="mt-5">BCF Team</h4>
      <hr />
      <p>
        <strong>Postal address</strong>
        <br />
        Heinrich-Buff-Ring 58
        <br />
        Justus-Liebig-Universität
        <br />
        35392 Gießen
      </p>
      <p>
        <strong>Email address</strong>
        <br />
        <a :href="`mailto:${frontendConfiguration.MAIL_FEEDBACK_ADDRESS}`">{{ frontendConfiguration.MAIL_FEEDBACK_ADDRESS }}</a>
      </p>
    </div>
  </div>
</template>
