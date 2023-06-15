import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import publicRoutes from '@/router/public.routes';
import authRoutes from '@/router/auth.routes';
import userRoutes from '@/router/user.routes';
import jupyterRoutes from '@/router/jupyter.routes';
import participationRoutes from '@/router/participation.routes';
import adminRoutes from '@/router/admin.routes';
import { useNotificationStore } from '@/stores/notification';

const publicPages: Array<string | symbol> = ['verify'];
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
    { ...participationRoutes },
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
  const { notify } = useNotificationStore();

  let isAuthPage = false;
  let isLeaderPage = false;
  let isAdminPage = false;
  let isPublicPage = false;

  if (to.name) {
    isAuthPage = to.fullPath.startsWith(router.resolve({ name: authRoutes.name }).fullPath);
    isLeaderPage = to.fullPath.startsWith(router.resolve({ name: jupyterRoutes.name }).fullPath);
    isAdminPage = to.fullPath.startsWith(router.resolve({ name: adminRoutes.name }).fullPath);
    isPublicPage = isAuthPage || publicPages.includes(to.name);
  }

  if (isAuthPage && auth.valid()) {
    notify({
      display: 'info',
      message: 'You are already logged in.'
    });
    return next({ name: 'start' });
  }

  if (!isPublicPage && !auth.valid()) {
    auth.setReturnUrl(to.fullPath);
    notify({
      display: 'warning',
      message: 'You must be logged in to view this page.'
    });
    return next({ name: 'login' });
  }

  if (isAdminPage && !user.isAdmin) {
    notify({
      display: 'warning',
      message: 'You must be an administrator to view this page.'
    });
    return next({ name: 'start' });
  }

  if (isLeaderPage && !user.isLead) {
    notify({
      display: 'warning',
      message: 'You must be a leader to view this page.'
    });
    return next({ name: 'start' });
  }

  return next();
});

export default router;
