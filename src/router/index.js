import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          path: '/list-index',
          component: () => import('@/views/search/list-index.vue')
        },
        {
          path: '/Search-Page',
          component: () => import('@/views/search/Search-Page.vue')
        },
        {
          path: '/Order',
          component: () => import('@/views/search/Order-index.vue')
        },
        {
          path: '/Connection',
          component: () => import('@/views/search/Connection-index.vue')
        },
        {
          path: '/Choice',
          component: () => import('@/views/search/Choice-index.vue')
        },
        {
          path: '/Cart',
          component: () => import('@/views/pay/cart-page.vue')
        },
        {
          path: '/Pay',
          component: () => import('@/views/pay/pay-page.vue')
        },
        {
          path: '/admin-EnterData',
          component: () => import('@/views/search/admin-EnterData.vue')
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
            },
            {
              path: '/user/ChangePic',
              component: () => import('@/views/user/user-changepic.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/Login',
      component: () => import('@/views/Login/index.vue'),
      children: [
        {
          path: '/Login/LoginPage',
          component: () => import('@/views/Login/components/login-page.vue')
        },
        {
          path: '/Login/EmailCheck',
          component: () => import('@/views/Login/components/Email-check.vue')
        },
        {
          path: '/Login/register',
          component: () => import('@/views/Login/components/register-page.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const useStore = useUserStore()
  if (useStore.token && to.path === '/Login/LoginPage') return '/'
  if (!useStore.token && to.path === '/user/center') return '/'
  if (!useStore.token && to.path === '/user/ChangePic') return '/'
  if (!useStore.token && to.path === '/user/passwordChange') return '/'
  if (!useStore.token && to.path === '/user/dataChange') return '/'
  if (!useStore.token && to.path === '/Pay') return '/'
})
export default router
