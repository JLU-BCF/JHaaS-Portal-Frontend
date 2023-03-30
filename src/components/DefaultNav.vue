<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
const authStore = useAuthStore();
const userStore = useUserStore();
const auth = authStore.auth;
const user = userStore.user;
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Navigation">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="{ name: 'start' }">JHaaS Portal</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample07"
        aria-controls="navbarsExample07"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample07">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink
              :active-class="'active'"
              class="nav-link"
              aria-current="page"
              :to="{ name: 'start' }"
              >Start</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink :active-class="'active'" class="nav-link" :to="{ name: 'about' }"
              >About</RouterLink
            >
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li v-if="auth.getToken()" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >{{ user?.firstName }}</a
            >
            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><button class="dropdown-item" @click="authStore.logout()">Logout</button></li>
            </ul>
          </li>
          <li v-else class="nav-item">
            <RouterLink :active-class="'active'" class="nav-link" :to="{ name: 'login' }"
              >Login</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
