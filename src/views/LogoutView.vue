<template>
  <div class="login-page">
    <div class="login-card">
      <button class="btn-back" @click="router.back()">
        <i class="fa-solid fa-arrow-left"></i>
      </button>

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
          <input type="text" :value="userEmail" readonly />
        </div>
        <div class="input-group">
          <label>Senha:</label>
          <div class="password-wrapper">
            <input type="password" value="••••••••••••" readonly />
            <button class="toggle-pass"><i class="fa-solid fa-eye"></i></button>
          </div>
        </div>
        <button class="btn-sair" @click="handleLogout">
          Sair <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'
import logoUcsUrl from '../assets/images/logo-ucs.png'

const router = useRouter()
const { logout, userEmail } = useAuth()

function handleLogout() {
  logout()
  router.push('/login')
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
  position: relative;
}

.btn-back {
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  width: 36px;
  height: 36px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

.btn-sair {
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
  transition: background 0.2s;
  margin-top: 4px;
}

.btn-sair:hover {
  background: var(--color-primary-dark);
}
</style>
