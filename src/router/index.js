import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'
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
    { path: '/Search', component: () => import('@/views/search/index.vue') },
    { path: '/Login', component: () => import('@/views/Login/login-page.vue') }
  ]
})

export default router

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for
  // the users, others won't
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser()
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return {
        path: '/Login',
        query: {
          // we keep the current path in the query so we can
          // redirect to it after login with
          // `router.push(route.query.redirect || '/')`
          redirect: to.fullPath
        }
      }
    }
  }
})
