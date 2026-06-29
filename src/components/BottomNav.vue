<template>
  <!-- Nav do Aluno -->
  <nav v-if="role === 'aluno'" class="bottom-nav">
    <router-link to="/aluno/home" class="nav-item" active-class="active">
      <i class="fa-solid fa-house"></i>
      <span>Home</span>
    </router-link>
    <router-link to="/aluno/notas-e-faltas" class="nav-item" active-class="active">
      <i class="fa-solid fa-chart-bar"></i>
      <span>Notas e Faltas</span>
    </router-link>
    <router-link to="/aluno/boletos-e-financeiro" class="nav-item" active-class="active">
      <i class="fa-solid fa-barcode"></i>
      <span>Boletos</span>
    </router-link>
    <router-link to="/aluno/avisos" class="nav-item" active-class="active">
      <i class="fa-solid fa-bell"></i>
      <span>Avisos</span>
    </router-link>
    <router-link to="/aluno/calendario" class="nav-item" active-class="active">
      <i class="fa-solid fa-calendar-days"></i>
      <span>Calendário</span>
    </router-link>
    <router-link to="/logout" class="nav-item" active-class="active">
      <i class="fa-solid fa-arrow-left"></i>
      <span>Sair</span>
    </router-link>
  </nav>

  <!-- Nav do Professor -->
  <nav v-else class="bottom-nav">
    <router-link to="/professor/home" class="nav-item" active-class="active">
      <i class="fa-solid fa-house"></i>
      <span>Home</span>
    </router-link>
    <router-link to="/professor/turmas" class="nav-item" active-class="active">
      <i class="fa-solid fa-book-open"></i>
      <span>Turmas</span>
    </router-link>
    <router-link to="/professor/avisos" class="nav-item" active-class="active">
      <i class="fa-solid fa-bell"></i>
      <span>Avisos</span>
    </router-link>
    <router-link to="/professor/calendario" class="nav-item" active-class="active">
      <i class="fa-solid fa-calendar-days"></i>
      <span>Calendário</span>
    </router-link>
    <router-link to="/logout" class="nav-item" active-class="active">
      <i class="fa-solid fa-arrow-left"></i>
      <span>Sair</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useAuth } from '../composables/useAuth.js'

const { role } = useAuth()
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  height: var(--nav-height);
  background: var(--color-white);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.08);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  text-decoration: none;
  color: var(--color-text-muted);
  font-size: 10px;
  font-weight: 500;
  padding: 6px 8px;
  border-radius: 8px;
  transition: color 0.2s;
  min-width: 52px;
}

.nav-item i {
  font-size: 20px;
}

.nav-item.active {
  color: var(--color-primary);
}

.nav-item.active i {
  color: var(--color-primary);
}
</style>
