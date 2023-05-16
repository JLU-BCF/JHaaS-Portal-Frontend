<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <footer class="d-flex flex-wrap justify-content-between align-items-center px-3 py-1 mt-4">
    <ul class="nav col-md-5 col-12 justify-content-center justify-content-md-start">
      <li class="nav-item">
        <a
          class="nav-link px-2 text-secondary"
          target="_blank"
          href="https://www.uni-giessen.de/de/fbz/fb08/Inst/bioinformatik"
        >
          2023 Computational Bio
        </a>
      </li>
    </ul>

    <div class="col-md-2 col-12 d-flex align-items-center justify-content-center">
      <img src="/favicon.ico" width="32" height="32" />
    </div>

    <ul class="nav col-md-5 col-12 justify-content-center justify-content-md-end">
      <li class="nav-item">
        <RouterLink
          :active-class="'text-dark'"
          class="nav-link px-2 text-secondary"
          :to="{ name: 'contact' }"
          >Contact</RouterLink
        >
      </li>
      <li class="nav-item">
        <RouterLink
          :active-class="'text-dark'"
          class="nav-link px-2 text-secondary"
          :to="{ name: 'tos' }"
          >Terms of Use</RouterLink
        >
      </li>
      <li class="nav-item">
        <RouterLink
          :active-class="'text-dark'"
          class="nav-link px-2 text-secondary"
          :to="{ name: 'imprint' }"
          >Imprint</RouterLink
        >
      </li>
      <li class="nav-item">
        <RouterLink
          :active-class="'text-dark'"
          class="nav-link px-2 text-secondary"
          :to="{ name: 'faq' }"
          >FAQs</RouterLink
        >
      </li>
    </ul>
  </footer>
</template>
