import { ref, computed } from 'vue'

const isLoggedIn = ref(localStorage.getItem('ucs_logged') === 'true')
const role = ref(localStorage.getItem('ucs_role') || 'aluno')
const userFullName = ref(localStorage.getItem('ucs_user_fullname') || 'Gabriel Sironi da Luz')
const userName = ref(localStorage.getItem('ucs_user_name') || 'Gabriel')
const userEmail = ref(localStorage.getItem('ucs_user_email') || '')

export function useAuth() {
  function login(selectedRole, name, fullName, email) {
    role.value = selectedRole
    userName.value = name
    userFullName.value = fullName || name
    userEmail.value = email || ''
    isLoggedIn.value = true
    localStorage.setItem('ucs_logged', 'true')
    localStorage.setItem('ucs_role', selectedRole)
    localStorage.setItem('ucs_user_name', name)
    localStorage.setItem('ucs_user_fullname', fullName || name)
    localStorage.setItem('ucs_user_email', email || '')
  }

  function logout() {
    isLoggedIn.value = false
    role.value = 'aluno'
    userName.value = ''
    userFullName.value = ''
    userEmail.value = ''
    localStorage.removeItem('ucs_logged')
    localStorage.removeItem('ucs_role')
    localStorage.removeItem('ucs_user_name')
    localStorage.removeItem('ucs_user_fullname')
    localStorage.removeItem('ucs_user_email')
  }

  const isAluno = computed(() => role.value === 'aluno')
  const isProfessor = computed(() => role.value === 'professor')

  const homeRoute = computed(() =>
    role.value === 'professor' ? '/professor/home' : '/aluno/home'
  )

  return { isLoggedIn, role, userName, userFullName, userEmail, isAluno, isProfessor, homeRoute, login, logout }
}
