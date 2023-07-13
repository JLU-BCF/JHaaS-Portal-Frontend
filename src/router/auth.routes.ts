export default {
  path: '/auth',
  name: 'auth',
  component: () => import('../views/auth/AuthView.vue'),
  children: [
    {
      path: 'login',
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        }
      ]
    },
    {
      path: 'verify',
      name: 'auth-verify',
      component: () => import('../views/auth/VerifyView.vue')
    }
  ]
};
