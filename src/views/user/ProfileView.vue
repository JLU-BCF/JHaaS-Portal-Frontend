<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useFrontendConfigurationStore } from '@/stores/config.store';

const { frontendConfiguration } = useFrontendConfigurationStore();
const { user } = useAuthStore();

const currentUrlEncoded = encodeURIComponent(window.location.href);
</script>

<template>
  <h1>{{ user.firstName }} {{ user.lastName }}</h1>
  <p>
    Contact Email Address:
    <a :href="`mailto:${user.email}`">{{ user.email }}</a>
  </p>

  <hr />

  <p class="mt-5">
    Your profile is managed through <a :href="frontendConfiguration.AUTHENTIK_URL">Authentik</a>.
  </p>

  <div class="row">
    <div class="col-12 col-md-6 col-xl-3">
      <div class="card mt-5">
        <div class="card-header">
          <strong>Basic Settings</strong>
        </div>
        <div class="card-body">
          <p>Make basic changes to the access to your account.</p>
          <p>If you have lost your recovery tokens, you can generate new tokens here.</p>
          <p class="mt-4">
            <a
              :aria-disabled="!frontendConfiguration.AUTHENTIK_CONFIG_PASSWORD"
              :class="!frontendConfiguration.AUTHENTIK_CONFIG_PASSWORD ? 'disabled' : ''"
              :href="`${frontendConfiguration.AUTHENTIK_URL}/flows/-/configure/${frontendConfiguration.AUTHENTIK_CONFIG_PASSWORD}/?redirect=${currentUrlEncoded}`"
              class="btn btn-outline-dark w-100"
              target="_self"
              >Change Password</a
            >
          </p>
          <p>
            <a
              :aria-disabled="!frontendConfiguration.AUTHENTIK_CONFIG_STATIC"
              :class="!frontendConfiguration.AUTHENTIK_CONFIG_STATIC ? 'disabled' : ''"
              :href="`${frontendConfiguration.AUTHENTIK_URL}/flows/-/configure/${frontendConfiguration.AUTHENTIK_CONFIG_STATIC}/?redirect=${currentUrlEncoded}`"
              class="btn btn-outline-dark w-100"
              target="_self"
              >Generate Recovery Keys</a
            >
          </p>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 col-xl-3">
      <div class="card mt-5">
        <div class="card-header">
          <strong>MFA Settings</strong>
        </div>
        <div class="card-body">
          <p>
            JHaaS uses multi-factor authentication by default to make your logins as secure as
            possible.
          </p>
          <p>
            It is advisable to store several MFA devices. On the one hand, this serves as a backup
            in case a device is lost. On the other hand, there are devices, such as Windows Hello,
            that only work at a specific workstation.
          </p>
          <p class="mt-4">
            <a
              :aria-disabled="!frontendConfiguration.AUTHENTIK_CONFIG_TOTP"
              :class="!frontendConfiguration.AUTHENTIK_CONFIG_TOTP ? 'disabled' : ''"
              :href="`${frontendConfiguration.AUTHENTIK_URL}/flows/-/configure/${frontendConfiguration.AUTHENTIK_CONFIG_TOTP}/?redirect=${currentUrlEncoded}`"
              class="btn btn-outline-dark w-100"
              target="_self"
              >Enroll TOTP Device</a
            >
          </p>
          <p>
            <a
              :aria-disabled="!frontendConfiguration.AUTHENTIK_CONFIG_WEBAUTHN"
              :class="!frontendConfiguration.AUTHENTIK_CONFIG_WEBAUTHN ? 'disabled' : ''"
              :href="`${frontendConfiguration.AUTHENTIK_URL}/flows/-/configure/${frontendConfiguration.AUTHENTIK_CONFIG_WEBAUTHN}/?redirect=${currentUrlEncoded}`"
              class="btn btn-outline-dark w-100"
              target="_self"
              >Enroll WebAuthn Device</a
            >
          </p>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 col-xl-3">
      <div class="card mt-5">
        <div class="card-header">
          <strong>Authentik Settings</strong>
        </div>
        <div class="card-body">
          <p>Advanced changes to your account can be made via the Authentik interface.</p>
          <p>
            Changes to your profile in Authentik will only take effect after profile
            synchronisation.
          </p>
          <p class="mt-4">
            <a
              :href="`${frontendConfiguration.AUTHENTIK_URL}/if/user/#/settings`"
              class="btn btn-outline-dark w-100"
              target="_blank"
              >Open authentik settings</a
            >
          </p>
          <p>
            <a href="/api/auth/oidc/login" class="btn btn-outline-dark w-100" target="_self"
              >Sync Profile</a
            >
          </p>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 col-xl-3">
      <div class="card mt-5 border-danger">
        <div class="card-header text-danger">
          <strong>Danger Zone</strong>
        </div>
        <div class="card-body">
          <p>Be careful. Changes made here are irreversible.</p>
          <p>
            It is not yet possible to delete your account automatically. Please contact support if
            you would like to delete your account.
          </p>
          <p class="mt-4">
            <a
              aria-disabled="true"
              :href="`${frontendConfiguration.AUTHENTIK_URL}/if/flow/mfa-recovery/`"
              class="btn btn-outline-danger w-100 disabled"
              target="_blank"
              >Reset MFA</a
            >
          </p>
          <p>
            <a
              aria-disabled="true"
              href="/api/auth/oidc/login"
              class="btn btn-outline-danger w-100 disabled"
              target="_self"
              >Delete Account</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
