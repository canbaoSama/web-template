import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import { useUserStore } from '@/store/user'

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home.vue'),
        meta: {
            navigation: '首页',
            unlogin: false,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login.vue'),
        meta: {
            navigation: '登录',
            unlogin: true,
        },
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const userstore = useUserStore()
    if (userstore.userInfo.token || to.meta.unlogin)
        next()

    else
        next({
            path: '/login',
            query: { redirect: to.fullPath },
        })

    next()
})

export default router
