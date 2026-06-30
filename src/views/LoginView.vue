<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-logo">
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
          <image x="3" y="3" width="74" height="74" :href="logoUcsUrl" preserveAspectRatio="xMidYMid meet"/>
        </svg>
      </div>

      <div class="avatar-small">
        <i class="fa-solid fa-user"></i>
      </div>

      <div class="login-form">
        <div class="input-group">
          <label>Usuário:</label>
          <input v-model="usuario" type="text" placeholder="seu@ucs.br" @keyup.enter="handleLogin" />
        </div>
        <div class="input-group">
          <label>Senha:</label>
          <div class="password-wrapper">
            <input v-model="senha" :type="showPass ? 'text' : 'password'" placeholder="••••••••••" @keyup.enter="handleLogin" />
            <button class="toggle-pass" @click="showPass = !showPass">
              <i :class="showPass ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
            </button>
          </div>
        </div>
        <p v-if="erro" class="erro">{{ erro }}</p>
        <p v-else class="dica">💡 Use um e-mail UCS cadastrado</p>
        <button class="btn-acessar" @click="handleLogin">
          ACESSAR <i class="fa-solid fa-right-to-bracket"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'
import { validarLogin } from '../data/usuarios.js'
import logoUcsUrl from '../assets/images/logo-ucs.png'

const router = useRouter()
const { login } = useAuth()
const usuario = ref('')
const senha = ref('')
const showPass = ref(false)
const erro = ref('')

function handleLogin() {
  if (!usuario.value || !senha.value) {
    erro.value = 'Preencha usuário e senha.'
    return
  }

  const user = validarLogin(usuario.value, senha.value)
  if (!user) {
    erro.value = 'Usuário ou senha incorretos.'
    return
  }

  erro.value = ''
  login(user.role, user.nome, user.nomeCompleto, user.email)
  const dest = user.role === 'aluno' ? '/aluno/home' : '/professor/home'
  router.push(dest)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.login-card {
  background: var(--color-white);
  border-radius: var(--radius);
  padding: 36px 32px 32px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.login-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-small {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #888;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-group {
  display: flex;
  align-items: center;
  background: var(--color-bg);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.input-group label {
  padding: 10px 12px;
  font-weight: 600;
  font-size: 13px;
  color: var(--color-text);
  white-space: nowrap;
  border-right: 1.5px solid var(--color-border);
  background: #eee;
}

.input-group input {
  flex: 1;
  padding: 10px 12px;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
}

.password-wrapper {
  display: flex;
  flex: 1;
  align-items: center;
}

.password-wrapper input {
  flex: 1;
  padding: 10px 12px;
  border: none;
  outline: none;
  font-size: 14px;
}

.toggle-pass {
  background: none;
  border: none;
  padding: 0 10px;
  color: var(--color-primary);
  font-size: 15px;
  cursor: pointer;
}

.btn-acessar {
  background: var(--color-primary);
  color: white;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  letter-spacing: 1px;
  transition: background 0.2s;
  margin-top: 4px;
}

.btn-acessar:hover {
  background: var(--color-primary-dark);
}

.erro {
  color: var(--color-accent-red);
  font-size: 13px;
  text-align: center;
}

.dica {
  text-align: center;
  font-size: 12px;
  color: var(--color-text-muted);
}

</style>
