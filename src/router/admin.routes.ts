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
      path: 'user',
      name: 'admin-user',
      children: [
        {
          path: 'list',
          name: 'admin-list-user',
          component: () => import('../views/admin/AllRequestsView.vue')
        },
        {
          path: 'create',
          name: 'admin-create-user',
          component: () => import('../views/admin/CreateLocalUserView.vue')
        }
      ]
    },
    {
      path: 'jupyter',
      name: 'admin-jupyter',
      children: [
        {
          path: '',
          name: 'admin-list-requests',
          component: () => import('../views/admin/AllRequestsView.vue')
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
    },
    {
      path: 'tos',
      name: 'admin-tos',
      children: [
        {
          path: '',
          name: 'admin-tos-overview',
          component: () => import('../views/admin/ListTosView.vue')
        },
        {
          path: 'create',
          name: 'admin-tos-create',
          component: () => import('../views/admin/CreateTosView.vue')
        }
      ]
    }
  ]
};
