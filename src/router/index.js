import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

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
        },
        {
          path: '/search',
          component: () => import('@/views/search/index.vue'),
          redirect: 'search/Search-Page',
          children: []
        }
      ]
    },
    { path: '/Search', component: () => import('@/views/search/index.vue') },
    {
      path: '/Login',
      component: () => import('@/views/Login/index.vue'),
      // redirect: '/Login/LoginPage',
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
          path: '/Login/forgetPassword',
          component: () =>
            import('@/views/Login/components/forget-password.vue')
        },
        {
          path: '/Login/register',
          component: () => import('@/views/Login/components/register-page.vue')
        }
      ]
    }
  ]
})

// router.beforeEach(async (to, from, next) => {
//   const auth = getAuth()
//   const useStore = useUserStore()

//   // 创建一个Promise来等待onAuthStateChanged的结果
//   const authStatePromise = new Promise((resolve) => {
//     onAuthStateChanged(auth, (user) => {
//       if (user.accessToken && to.path === '/Login/LoginPage') {
//         resolve('/user/center')
//       } else {
//         resolve(null)
//       }
//     })
//   })

//   // 使用Promise.all等待onAuthStateChanged和其他条件
//   const [authStateResult, tokenResult] = await Promise.all([
//     authStatePromise,
//     useStore.token
//   ])

//   // 根据结果来决定导航
//   if (authStateResult) {
//     next(authStateResult)
//   } else if (tokenResult && to.path === '/Login/LoginPage') {
//     next('/user/center')
//   } else {
//     next()
//   }
// })
export default router
