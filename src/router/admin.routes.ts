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
      path: 'open-requests',
      name: 'admin-open-requests',
      component: () => import('../views/admin/OpenRequestsView.vue')
    }
  ]
};
