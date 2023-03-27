import LoginView from '../views/auth/LoginView.vue';

export default {
  path: '/auth',
  name: 'auth',
  children: [{ path: 'login', name: 'login', component: LoginView }]
};
