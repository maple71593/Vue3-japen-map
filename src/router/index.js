import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/home/home.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/Home-page.vue')
        },
        {
          path: '/search',
          component: () => import('@/views/search/index.vue')
        },
        {
          path: '/list-1',
          component: () => import('@/views/search/list-1.vue')
        },
        {
          path: '/list-2',
          component: () => import('@/views/search/list-2.vue')
        },
        {
          path: '/list-3',
          component: () => import('@/views/search/list-3.vue')
        }
      ]
    },
    { path: '/Search', component: () => import('@/views/search/index.vue') }
  ]
})

export default router
