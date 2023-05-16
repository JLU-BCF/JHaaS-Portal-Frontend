export default [
  {
    path: '/',
    name: 'start',
    component: () => import('../views/StartView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/terms-of-use',
    name: 'tos',
    component: () => import('../views/TosView.vue')
  },
  {
    path: '/imprint',
    name: 'imprint',
    component: () => import('../views/ImprintView.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/FaqView.vue')
  }
];
