import { createRouter, createWebHistory } from 'vue-router'
import { useAllDataStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      redirect:'/home',  //重定向到home路径
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404.vue')
    }
    
  ],
})

export default router
