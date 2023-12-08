export default {
  path: '/participation',
  name: 'participation',
  children: [
    {
      path: '',
      name: 'participation-overview',
      component: () => import('../views/participation/OverviewView.vue')
    },
    {
      path: 'participate/:slug',
      name: 'participation-participate',
      component: () => import('../views/participation/ParticipateView.vue')
    },
    {
      path: 'revoke/:slug',
      name: 'participation-revoke',
      component: () => import('../views/participation/RevokeView.vue')
    }
  ]
};
