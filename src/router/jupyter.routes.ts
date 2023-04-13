export default {
  path: '/jupyter',
  name: 'jupyter',
  children: [
    {
      path: '',
      name: 'jupyter-overview',
      component: () => import('../views/jupyter/OverviewView.vue')
    }
  ]
};
