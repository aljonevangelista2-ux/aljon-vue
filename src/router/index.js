import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '../stores/auth'

import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Shop from '../pages/Shop.vue'
import ManageProducts from '../pages/ManageProducts.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login, meta: { guestOnly: true } },
  { path: '/register', name: 'register', component: Register, meta: { guestOnly: true } },
  { path: '/shop', name: 'shop', component: Shop, meta: { requiresAuth: true } },
  { path: '/manage', name: 'manage', component: ManageProducts, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.guestOnly && isLoggedIn.value) {
    return { name: 'shop' }
  }
})

export default router
