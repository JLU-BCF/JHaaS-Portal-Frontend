import { createRouter, createWebHistory } from 'vue-router';
import StartView from '../views/StartView.vue';
import { useAuthStore } from '@/stores/auth';
import authRoutes from './auth.routes';

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
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/error/404.vue')
    }
  ]
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [
    'start',
    'about',
    'login',
    'not-found'
  ];

  let authRequired = true;
  if (typeof to.name === 'string') {
    authRequired = !publicPages.includes(to.name);
  } else {
    return;
  }
  
  const { auth } = useAuthStore();

  if (authRequired && !auth.valid()) {
    auth.returnUrl = to.fullPath;
    return router.resolve({ name: 'login' }).fullPath;
  }
});

export default router;
