<template>
  <div class="login-page">
    <button class="btn-back" @click="router.back()">
      <i class="fa-solid fa-arrow-left"></i>
    </button>

    <div class="login-logo">
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="90" height="90">
        <image 
          x="3" 
          y="3" 
          width="74" 
          height="74"
          :href="logoUcsUrl" 
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>

    <div class="avatar-big">
      <i class="fa-solid fa-user"></i>
    </div>

    <div class="login-form">
      <div class="input-group">
        <label>Usuário:</label>
        <input type="text" value="gsluz3@ucs.br" readonly />
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
</template>

<script setup>
import { useRouter } from 'vue-router'
import logoUcsUrl from '../assets/images/logo-ucs.png'

const router = useRouter()

function handleLogout() {
  localStorage.removeItem('ucs_logged')
  router.push('/login')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 32px;
  gap: 28px;
  position: relative;
}

.btn-back {
  position: absolute;
  top: 20px;
  left: 20px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  width: 40px;
  height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.login-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.logo-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-ucs {
  font-size: 36px;
  font-weight: 900;
  color: var(--color-text);
  letter-spacing: 2px;
  line-height: 1;
}

.logo-full {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  letter-spacing: 0.5px;
  line-height: 1.4;
}

.avatar-big {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44px;
  color: #888;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.input-group {
  display: flex;
  align-items: center;
  background: var(--color-white);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.input-group label {
  padding: 12px 14px;
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text);
  white-space: nowrap;
  border-right: 1.5px solid var(--color-border);
  background: #f5f5f5;
}

.input-group input {
  flex: 1;
  padding: 12px 14px;
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
  padding: 12px 14px;
  border: none;
  outline: none;
  font-size: 14px;
}

.toggle-pass {
  background: none;
  border: none;
  padding: 0 12px;
  color: var(--color-primary);
  font-size: 16px;
  cursor: pointer;
}

.btn-sair {
  background: var(--color-primary);
  color: white;
  font-size: 16px;
  font-weight: 700;
  padding: 14px 24px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.2s;
}

.btn-sair:hover {
  background: var(--color-primary-dark);
}
</style>
