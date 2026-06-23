import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Logout from '../views/LogoutView.vue'
import Home from '../views/HomeView.vue'
import Avisos from '../views/AvisosView.vue'
import Boletos from '../views/BoletosView.vue'
import NotasFaltas from '../views/NotasFaltasView.vue'
import Calendario from '../views/CalendarioView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/avisos', component: Avisos, meta: { requiresAuth: true } },
  { path: '/boletos-e-financeiro', component: Boletos, meta: { requiresAuth: true } },
  { path: '/notas-e-faltas', component: NotasFaltas, meta: { requiresAuth: true } },
  { path: '/calendario', component: Calendario, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('ucs_logged') === 'true'
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
