<script setup lang="ts">
import { useFrontendConfigurationStore } from '@/stores/config.store';
const { frontendConfiguration } = useFrontendConfigurationStore();
</script>
<template>
  <h1>Everything you wanted to know about JHaaS</h1>
  <div class="row">
    <div class="col-12 col-sm-9 col-lg-6">
      <h4 class="mt-5">Early stage of development</h4>
      <hr />
      <p>
        A collection of the most frequently asked questions is created here. Since the portal is in
        the early stages of development and there has been not enough feedback yet, we have not yet
        collected frequently asked questions about the portal.
      </p>
      <p>
        <strong>You can be the first</strong> to ask a question that comes up here:
        <br />
        contact us via
        <a :href="`mailto:${frontendConfiguration.MAIL_FEEDBACK_ADDRESS}`">{{
          frontendConfiguration.MAIL_FEEDBACK_ADDRESS
        }}</a>
      </p>
    </div>
  </div>
</template>
