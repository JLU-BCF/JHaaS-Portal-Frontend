export default {
  path: '/auth',
  name: 'auth',
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    }
  ]
};
