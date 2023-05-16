import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import publicRoutes from '@/router/public.routes';
import authRoutes from '@/router/auth.routes';
import userRoutes from '@/router/user.routes';
import jupyterRoutes from '@/router/jupyter.routes';
import adminRoutes from '@/router/admin.routes';

const publicPages: Array<string | symbol> = [];
for (const publicRoute of publicRoutes) {
  publicPages.push(publicRoute.name);
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...publicRoutes,
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

  let isAuthPage = false;
  let isAdminPage = false;
  let isPublicPage = false;

  if (to.name) {
    isAuthPage = to.fullPath.startsWith(router.resolve({ name: authRoutes.name }).fullPath);
    isAdminPage = to.fullPath.startsWith(router.resolve({ name: adminRoutes.name }).fullPath);
    isPublicPage = isAuthPage || publicPages.includes(to.name);
  }

  if (isAuthPage && auth.valid()) {
    return next({ name: 'start' });
  }

  if (!isPublicPage && !auth.valid()) {
    auth.returnUrl = to.fullPath;
    return next({ name: 'login' });
  }

  if (isAdminPage && !user.isAdmin) {
    return next({ name: 'start' });
  }

  return next();
});

export default router;
