import { ref, computed } from 'vue'

const isLoggedIn = ref(localStorage.getItem('ucs_logged') === 'true')
const role = ref(localStorage.getItem('ucs_role') || 'aluno')
const userName = ref(localStorage.getItem('ucs_user_name') || 'Gabriel')

export function useAuth() {
  function login(selectedRole, name) {
    role.value = selectedRole
    userName.value = name
    isLoggedIn.value = true
    localStorage.setItem('ucs_logged', 'true')
    localStorage.setItem('ucs_role', selectedRole)
    localStorage.setItem('ucs_user_name', name)
  }

  function logout() {
    isLoggedIn.value = false
    role.value = 'aluno'
    userName.value = ''
    localStorage.removeItem('ucs_logged')
    localStorage.removeItem('ucs_role')
    localStorage.removeItem('ucs_user_name')
  }

  const isAluno = computed(() => role.value === 'aluno')
  const isProfessor = computed(() => role.value === 'professor')

  const homeRoute = computed(() =>
    role.value === 'professor' ? '/professor/home' : '/aluno/home'
  )

  return { isLoggedIn, role, userName, isAluno, isProfessor, homeRoute, login, logout }
}
