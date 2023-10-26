import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
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
        },
        {
          path: '/user',
          component: () => import('@/views/user/index.vue'),
          children: [
            {
              path: '/user/center',
              component: () => import('@/views/user/user-center.vue')
            },
            {
              path: '/user/passwordChange',
              component: () => import('@/views/user/user-passwordChange.vue')
            },
            {
              path: '/user/dataChange',
              component: () => import('@/views/user/user-userdataChange.vue')
            }
          ]
        }
      ]
    },
    { path: '/Search', component: () => import('@/views/search/index.vue') },
    { path: '/Login', component: () => import('@/views/Login/login-page.vue') }
  ]
})

router.beforeEach((to) => {
  const useStore = useUserStore()
  console.log(to)
  console.log(useStore.token)
  if (useStore.token && to.path === '/login') {
    return '/user-page'
  }
})

export default router
