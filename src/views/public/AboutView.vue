<script setup lang="ts">
import { useFrontendConfigurationStore } from '@/stores/config.store';
const { frontendConfiguration } = useFrontendConfigurationStore();
</script>
<template>
  <h1>The journey and the background</h1>
  <div class="row">
    <div class="col-12 col-sm-9 col-lg-6">
      <h4 class="mt-5">Who is behind it</h4>
      <hr />
      <p>
        The JHaaS (JupyterHub as a Service) portal is being developed by the Bioinformatics Core
        Facility at Department 08: Bioinformatics & Systems Biology.
      </p>
      <p>
        The development of the portal is currently in a first stage of development and should
        accordingly be regarded as a prototype. If something is not yet running smoothly in some
        corners, we therefore ask not only for your indulgence but also for constructive feedback to
        make the portal better.
      </p>
      <p>
        You are welcome to send bugs, suggestions for improvement and other ideas or comments to
        <a :href="`mailto:${frontendConfiguration.MAIL_FEEDBACK_ADDRESS}`">{{ frontendConfiguration.MAIL_FEEDBACK_ADDRESS }}</a
        >. We are looking forward to your feedback and opinion!
      </p>
      <h4 class="mt-5">How it works</h4>
      <hr />
      <p>First, you create a JupyterHub Request, it is as easy as this:</p>
      <img class="mw-100 border" src="/images/hub-request-screenshot.png" alt="" />
      <p class="mt-4">
        After your request is accepted by the governance you will receive an invitation link that
        you can distribute among the course participants. After a successful deployment you also
        receive an url to the JupyterHub:
      </p>
      <img class="mw-100 border" src="/images/hub-details-screenshot.png" alt="" />
      <p class="mt-4">
        You have control over who can and who cannot participate in your JupyterHub. A simple click
        is enough to accept or reject participants:
      </p>
      <img class="mw-100 border" src="/images/manage-participants-screenshot.png" alt="" />
    </div>
    <div class="col-12 col-sm-9 col-lg-6">
      <h4 class="mt-5">What happens next</h4>
      <hr />
      <p>
        The portal is in a very early stage of development and is only a prototype for now. In
        addition to obvious improvements like stability and security, the design of the interface
        and a lot of other features are on the agenda.
      </p>
      <p class="mb-1">Possible further developments could include, for example:</p>
      <ul>
        <li>Custom quotas</li>
        <li>Usability of private container registries</li>
        <li>GPU support</li>
        <li>External Kubernetes clusters</li>
        <li>Upload of course data in the portal</li>
        <li>Additional backends, e.g. Rstudio</li>
        <li>Authentication with university accounts</li>
        <li>Connection to learning platforms like Stud.IP</li>
      </ul>
      <p>
        These are just some examples, but in order for the portal to be purposefully developed to
        meet the needs of users, we need your feedback! So don't hesitate to contact us via
        <a :href="`mailto:${frontendConfiguration.MAIL_FEEDBACK_ADDRESS}`">{{ frontendConfiguration.MAIL_FEEDBACK_ADDRESS }}</a
        >.
      </p>
    </div>
  </div>
</template>
