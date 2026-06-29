import { createRouter, createWebHashHistory } from 'vue-router'

// Autenticação
import Login from '../views/LoginView.vue'
import Logout from '../views/LogoutView.vue'

// Aluno
import AlunoHome from '../views/aluno/AlunoHomeView.vue'
import AlunoAvisos from '../views/aluno/AlunoAvisosView.vue'
import AlunoBoletos from '../views/aluno/AlunoBoletosView.vue'
import AlunoNotasFaltas from '../views/aluno/AlunoNotasFaltasView.vue'
import AlunoCalendario from '../views/aluno/AlunoCalendarioView.vue'

// Professor
import ProfessorHome from '../views/professor/ProfessorHomeView.vue'
import ProfessorTurmas from '../views/professor/ProfessorTurmasView.vue'
import ProfessorTurmaDetalhe from '../views/professor/ProfessorTurmaDetalheView.vue'
import ProfessorLancarNotas from '../views/professor/ProfessorLancarNotasView.vue'
import ProfessorFrequencia from '../views/professor/ProfessorFrequenciaView.vue'
import ProfessorAvisos from '../views/professor/ProfessorAvisosView.vue'
import ProfessorCalendario from '../views/professor/ProfessorCalendarioView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },

  // Rotas antigas — redirecionam para as novas do aluno
  { path: '/home', redirect: '/aluno/home' },
  { path: '/avisos', redirect: '/aluno/avisos' },
  { path: '/boletos-e-financeiro', redirect: '/aluno/boletos-e-financeiro' },
  { path: '/notas-e-faltas', redirect: '/aluno/notas-e-faltas' },
  { path: '/calendario', redirect: '/aluno/calendario' },

  // Aluno
  { path: '/aluno/home', component: AlunoHome, meta: { requiresAuth: true, role: 'aluno' } },
  { path: '/aluno/avisos', component: AlunoAvisos, meta: { requiresAuth: true, role: 'aluno' } },
  { path: '/aluno/boletos-e-financeiro', component: AlunoBoletos, meta: { requiresAuth: true, role: 'aluno' } },
  { path: '/aluno/notas-e-faltas', component: AlunoNotasFaltas, meta: { requiresAuth: true, role: 'aluno' } },
  { path: '/aluno/calendario', component: AlunoCalendario, meta: { requiresAuth: true, role: 'aluno' } },

  // Professor
  { path: '/professor/home', component: ProfessorHome, meta: { requiresAuth: true, role: 'professor' } },
  { path: '/professor/turmas', component: ProfessorTurmas, meta: { requiresAuth: true, role: 'professor' } },
  { path: '/professor/turma/:id', component: ProfessorTurmaDetalhe, meta: { requiresAuth: true, role: 'professor' } },
  { path: '/professor/lancar-notas/:id', component: ProfessorLancarNotas, meta: { requiresAuth: true, role: 'professor' } },
  { path: '/professor/lancar-frequencia/:id', component: ProfessorFrequencia, meta: { requiresAuth: true, role: 'professor' } },
  { path: '/professor/avisos', component: ProfessorAvisos, meta: { requiresAuth: true, role: 'professor' } },
  { path: '/professor/calendario', component: ProfessorCalendario, meta: { requiresAuth: true, role: 'professor' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('ucs_logged') === 'true'
  const userRole = localStorage.getItem('ucs_role') || 'aluno'

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.meta.role && to.meta.role !== userRole) {
    // Redireciona para a home do perfil correto se tentar acessar rota de outro perfil
    const dest = userRole === 'professor' ? '/professor/home' : '/aluno/home'
    next(dest)
  } else {
    next()
  }
})

export default router
