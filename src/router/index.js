import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/LoginComponent.vue'
import RedirectComponent from '../components/RedirectComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/oauth-redirect',
      name: 'redirect',
      component: RedirectComponent
    },
    {
      path: '/',
      name: 'login',
      component: LoginComponent
    },
  ]
})

export default router
