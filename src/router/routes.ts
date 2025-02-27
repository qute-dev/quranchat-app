import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/privacy',
        component: () => import('pages/PrivacyPage.vue'),
        meta: { title: 'Privacy Policy' },
      },
    ],
  },
  {
    path: '/apk',
    component: () => import('pages/InstallPage.vue'),
    props: { store: 'google' },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
