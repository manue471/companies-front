import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/map',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: 'map', component: () => import('pages/MapPage.vue') }],
  },
  {
    path: '/',
    redirect: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '',  component: () => import('pages/LoginPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
