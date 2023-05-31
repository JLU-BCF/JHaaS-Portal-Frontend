export default {
  path: '/participation',
  name: 'participation',
  children: [
    {
      path: '',
      name: 'participation-overview',
      component: () => import('../views/participation/OverviewView.vue')
    }
  ]
};
