/**
 * Usuários do sistema com tipagem por email.
 * O login identifica automaticamente se é aluno ou professor pelo email.
 */

export const usuarios = [
  // --- ALUNOS ---
  {
    email: 'gsluz3@ucs.br',
    senha: '123456',
    role: 'aluno',
    nome: 'Gabriel',
    nomeCompleto: 'Gabriel Sironi da Luz',
    avatar: null,
  },

  // --- PROFESSORES ---
  {
    email: 'anasilva@ucs.br',
    senha: '123456',
    role: 'professor',
    nome: 'Profª. Ana',
    nomeCompleto: 'Profª. Ana Silva',
    avatar: null,
  },
]

/**
 * Busca usuário por email. Retorna null se não encontrar.
 */
export function buscarPorEmail(email) {
  return usuarios.find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null
}

/**
 * Valida login: retorna o usuário se email e senha baterem, ou null.
 */
export function validarLogin(email, senha) {
  const user = buscarPorEmail(email)
  if (!user) return null
  if (user.senha !== senha) return null
  return user
}
