<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { onMounted, onUpdated } from 'vue';

const local_accounts_enabled = ['true', true, 1].includes(
  import.meta.env.VITE_ENABLE_LOCAL_ACCOUNTS
);
const authStore = useAuthStore();
const userStore = useUserStore();
const auth = authStore.auth;
const user = userStore.user;
const route = useRoute();

onMounted(addCloseNavListeners);
onUpdated(addCloseNavListeners);

function addCloseNavListeners() {
  const btn = document.getElementById('navbar-toggle-btn');
  if (btn) {
    document
      .querySelectorAll('#navbar-collapse .nav-link, #navbar-collapse .dropdown-item')
      .forEach((item) => {
        if (
          !item.classList.contains('dropdown-toggle') &&
          !item.hasAttribute('auto-toggle-applied')
        ) {
          item.setAttribute('auto-toggle-applied', '1');
          item.addEventListener('click', () => {
            if (window.getComputedStyle(btn).display !== 'none') btn.click();
          });
        }
      });
  }
}
</script>

<template>
  <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark" aria-label="Navigation">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="{ name: 'start' }">JHaaS Portal</RouterLink>
      <button
        class="navbar-toggler"
        id="navbar-toggle-btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-collapse"
        aria-controls="navbar-collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <RouterLink :active-class="'active'" class="nav-link" :to="{ name: 'start' }"
              >Start</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink :active-class="'active'" class="nav-link" :to="{ name: 'about' }"
              >About</RouterLink
            >
          </li>
          <li v-if="auth.valid()" class="nav-item">
            <RouterLink
              :active-class="'active'"
              class="nav-link"
              :to="{ name: 'participation-overview' }"
              >Participation</RouterLink
            >
          </li>
          <li v-if="auth.valid() && user.isLead" class="nav-item">
            <RouterLink :active-class="'active'" class="nav-link" :to="{ name: 'jupyter-overview' }"
              >Leadership</RouterLink
            >
          </li>
          <li v-if="auth.valid() && user.isAdmin" class="nav-item">
            <RouterLink :active-class="'active'" class="nav-link" :to="{ name: 'admin-overview' }"
              >Administration</RouterLink
            >
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-md-0">
          <li
            v-if="auth.valid()"
            class="nav-item dropdown"
            :class="route.matched.some(({ name }) => name == 'user') ? 'active' : ''"
          >
            <a
              id="auth-dropdown"
              class="nav-link dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >{{ user.firstName }}</a
            >
            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
              <li>
                <RouterLink :to="{ name: 'profile' }" class="dropdown-item" :active-class="'active'"
                  >Profile Settings</RouterLink
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <form action="/api/auth/logout" method="post">
                  <button class="dropdown-item" type="submit">Logout</button>
                </form>
              </li>
            </ul>
          </li>
          <li v-else-if="local_accounts_enabled" class="nav-item">
            <RouterLink :active-class="'active'" class="nav-link" :to="{ name: 'login' }"
              >Login</RouterLink
            >
          </li>
          <li v-else class="nav-item">
            <a href="/api/auth/oidc/login" class="nav-link">Login</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
