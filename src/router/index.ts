import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [{ path: '/', component: () => import('@/views/TheHome.vue') }]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
