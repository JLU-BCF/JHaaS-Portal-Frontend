export default {
  path: '/user',
  name: 'user',
  children: [
    {
      path: 'profile',
      name: 'profile',
      component: () => import('../views/user/ProfileView.vue')
    },
    {
      path: 'delete',
      name: 'user-delete',
      component: () => import('../views/user/DeleteView.vue')
    },
    {
      path: 'logout',
      component: () => import('../views/auth/AuthView.vue'),
      children: [
        {
          path: '',
          name: 'auth-logout',
          component: () => import('../views/auth/VerifyView.vue')
        }
      ]
    }
  ]
};
