export default {
  path: '/user',
  name: 'user',
  children: [
    {
      path: 'profile',
      name: 'profile',
      component: () => import('../views/user/ProfileView.vue')
    }
  ]
};
