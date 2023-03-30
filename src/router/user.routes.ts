export default {
  path: '/user',
  name: 'user',
  children: [
    {
      path: '',
      name: 'profile',
      component: () => import('../views/user/ProfileView.vue')
    }
  ]
};
