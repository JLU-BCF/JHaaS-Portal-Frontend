import { createRouter, createWebHistory } from 'vue-router';
import StartView from '../views/StartView.vue';
import { useAuthStore } from '@/stores/auth';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import jupyterRoutes from './jupyter.routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    { ...authRoutes },
    { ...userRoutes },
    { ...jupyterRoutes },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/error/NotFoundView.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const publicPages = ['start', 'about'];

  const { auth } = useAuthStore();
  let isAuthPage = false;
  let isPublicPage = false;

  if (typeof to.name === 'string') {
    isAuthPage = to.fullPath.startsWith(router.resolve({ name: 'auth' }).fullPath);
    isPublicPage = isAuthPage || publicPages.includes(to.name);
  }

  if (isAuthPage && auth.valid()) {
    return next({ name: 'start' });
  }

  if (!isPublicPage && !auth.valid()) {
    auth.returnUrl = to.fullPath;
    return next({ name: 'login' });
  }

  return next();
});

export default router;
