export default {
  path: '/auth',
  name: 'auth',
  component: () => import('../views/auth/AuthView.vue'),
  children: [
    {
      path: 'login',
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        },
        {
          path: 'local',
          name: 'localLogin',
          component: () => import('../views/auth/providers/LocalLoginView.vue')
        },
        {
          path: 'ldap',
          name: 'ldapLogin',
          component: () => import('../views/auth/providers/LdapLoginView.vue')
        },
        {
          path: 'oicd',
          name: 'oicdLogin',
          component: () => import('../views/auth/providers/OicdLoginView.vue')
        }
      ]
    },
    {
      path: 'register',
      children: [
        {
          path: 'local',
          name: 'localRegister',
          component: () => import('../views/auth/providers/LocalRegisterView.vue')
        }
      ]
    }
  ]
};
