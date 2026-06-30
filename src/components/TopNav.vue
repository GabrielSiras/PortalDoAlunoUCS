<template>
  <nav class="topnav">
    <!-- Marca UCS -->
    <div class="topnav-brand">
      <svg viewBox="0 0 60 59" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <image x="-11" y="3" width="80" height="70" :href="logoUcsUrl" preserveAspectRatio="xMidYMid meet"/>
      </svg>
      <span class="brand-text">Portal UCS</span>
    </div>

    <!-- Links do Aluno -->
    <div v-if="role === 'aluno'" class="topnav-links">
      <router-link to="/aluno/home" class="nav-link" active-class="active">
        <i class="fa-solid fa-house"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/aluno/notas-e-faltas" class="nav-link" active-class="active">
        <i class="fa-solid fa-chart-bar"></i>
        <span>Notas e Faltas</span>
      </router-link>
      <router-link to="/aluno/boletos-e-financeiro" class="nav-link" active-class="active">
        <i class="fa-solid fa-barcode"></i>
        <span>Boletos</span>
      </router-link>
      <router-link to="/aluno/avisos" class="nav-link" active-class="active">
        <i class="fa-solid fa-bell"></i>
        <span>Avisos</span>
      </router-link>
      <router-link to="/aluno/calendario" class="nav-link" active-class="active">
        <i class="fa-solid fa-calendar-days"></i>
        <span>Calendário</span>
      </router-link>
      <router-link to="/logout" class="nav-link logout-link" active-class="active">
        <i class="fa-solid fa-right-from-bracket"></i>
        <span>Sair</span>
      </router-link>
    </div>

    <!-- Links do Professor -->
    <div v-else class="topnav-links">
      <router-link to="/professor/home" class="nav-link" active-class="active">
        <i class="fa-solid fa-house"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/professor/turmas" class="nav-link" active-class="active">
        <i class="fa-solid fa-book-open"></i>
        <span>Turmas</span>
      </router-link>
      <router-link to="/professor/avisos" class="nav-link" active-class="active">
        <i class="fa-solid fa-bell"></i>
        <span>Avisos</span>
      </router-link>
      <router-link to="/professor/calendario" class="nav-link" active-class="active">
        <i class="fa-solid fa-calendar-days"></i>
        <span>Calendário</span>
      </router-link>
      <router-link to="/logout" class="nav-link logout-link" active-class="active">
        <i class="fa-solid fa-right-from-bracket"></i>
        <span>Sair</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '../composables/useAuth.js'
import logoUcsUrl from '../assets/images/logo-ucs.png'

const { role } = useAuth()
</script>

<style scoped>
.topnav {
  width: 100%;
  height: var(--topnav-height);
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  position: sticky;
  top: 0;
  z-index: 100;
}

.topnav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  margin-right: 20px;
}

.brand-text {
  font-size: 16px;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: 1px;
  white-space: nowrap;
}

.topnav-links {
  display: flex;
  align-items: center;
  gap: 2px;
  overflow-x: auto;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  transition: color 0.2s, background 0.2s;
  white-space: nowrap;
}

.nav-link i {
  font-size: 16px;
}

.nav-link:hover {
  color: var(--color-primary);
  background: rgba(26, 26, 219, 0.06);
}

.nav-link.active {
  color: var(--color-primary);
  background: rgba(26, 26, 219, 0.10);
}

.logout-link {
  margin-left: 8px;
  color: var(--color-text-muted);
}

.logout-link:hover,
.logout-link.active {
  color: var(--color-accent-red);
  background: rgba(239, 68, 68, 0.08);
}
</style>
