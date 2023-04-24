export default {
  path: '/admin',
  name: 'admin',
  children: [
    {
      path: '',
      name: 'admin-overview',
      component: () => import('../views/admin/OverviewView.vue')
    },
    {
      path: 'review',
      name: 'admin-open-requests',
      component: () => import('../views/admin/OpenRequestsView.vue')
    },
    {
      path: 'review/:slug',
      name: 'admin-review-jupyter',
      component: () => import('../views/jupyter/DetailsView.vue'),
      props: {
        isReview: true
      }
    }
  ]
};
