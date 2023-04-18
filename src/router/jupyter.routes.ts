export default {
  path: '/jupyter',
  name: 'jupyter',
  children: [
    {
      path: '',
      name: 'jupyter-overview',
      component: () => import('../views/jupyter/OverviewView.vue')
    },
    {
      path: 'create',
      name: 'jupyter-create',
      component: () => import('../views/jupyter/CreateView.vue')
    },
    {
      path: 'details/:slug',
      name: 'jupyter-details',
      component: () => import('../views/jupyter/DetailsView.vue')
    },
    {
      path: 'update/:slug',
      name: 'jupyter-update',
      component: () => import('../views/jupyter/CreateChangeView.vue')
    }
  ]
};
