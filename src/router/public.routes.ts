export default [
  {
    path: '/',
    name: 'start',
    component: () => import('../views/public/StartView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/public/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/public/ContactView.vue')
  },
  {
    path: '/terms-of-use',
    name: 'tos',
    component: () => import('../views/public/TosView.vue')
  },
  {
    path: '/imprint',
    name: 'imprint',
    component: () => import('../views/public/ImprintView.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/public/FaqView.vue')
  }
];
