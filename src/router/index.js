import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/home', component: () => import('@/views/home/home.vue') },
    {
      path: '/',
      component: () => import('@/views/home.vue'),
      redirect: '/home'
    }
  ]
})

export default router
