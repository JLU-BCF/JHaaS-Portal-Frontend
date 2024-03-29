import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://jhaas-portal-backend:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/docs': {
        target: 'http://jhaas-user-docs:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/docs/, '')
      },
      '/livereload': {
        target: 'http://jhaas-user-docs:8000',
        changeOrigin: true
      }
    }
  }
});
