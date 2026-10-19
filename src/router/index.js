import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/panel'
  },
  {
    path: '/panel',
    name: 'Panel',
    component: () => import('@/views/Panel')
  },
  {
    path: '/preview/:type',
    name: 'Preview',
    props: true,
    component: () => import('@/views/Preview'),
  }
]

const router = new VueRouter({
  routes
})

export default router
