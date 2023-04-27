import { createRouter, createWebHistory } from 'vue-router';
import StartView from '@/views/StartView.vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import authRoutes from '@/router/auth.routes';
import userRoutes from '@/router/user.routes';
import jupyterRoutes from '@/router/jupyter.routes';
import adminRoutes from '@/router/admin.routes';

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
    { ...adminRoutes },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/error/NotFoundView.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const { auth } = useAuthStore();
  const { user } = useUserStore();
  const publicPages = ['start', 'about'];

  let isAuthPage = false;
  let isAdminPage = false;
  let isPublicPage = false;

  if (typeof to.name === 'string') {
    isAuthPage = to.fullPath.startsWith(router.resolve({ name: 'auth' }).fullPath);
    isAdminPage = to.fullPath.startsWith(router.resolve({ name: 'admin' }).fullPath);
    isPublicPage = isAuthPage || publicPages.includes(to.name);
  }

  if (isAuthPage && auth.valid()) {
    return next({ name: 'start' });
  }

  if (isAdminPage && (!auth.valid() || !user.isAdmin)) {
    return next({ name: 'start' });
  }

  if (!isPublicPage && !auth.valid()) {
    auth.returnUrl = to.fullPath;
    return next({ name: 'login' });
  }

  return next();
});

export default router;
