<template>
  <div class="page-content">
    <PageHeader name="Gabriel" />

    <!-- Status de Aulas -->
    <div class="card status-card">
      <div class="status-title">Status de aulas</div>
      <div class="status-row">
        <div class="status-icon confirmed">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <div class="status-info">
          <div class="status-date"><strong>Status de hoje: 29/04 – AULA CONFIRMADA</strong></div>
          <div class="status-next">Sua próxima aula: <strong>Interface Humano Computador</strong> – Bloco 71, Sala 307 (19:40)</div>
        </div>
      </div>
    </div>

    <!-- Acesso Rápido -->
    <div class="section-title">ACESSO RÁPIDO</div>
    <div class="quick-grid">
      <router-link to="/notas-e-faltas" class="quick-card">
        <i class="fa-solid fa-chart-bar"></i>
        <span>Notas e Faltas</span>
      </router-link>
      <router-link to="/boletos-e-financeiro" class="quick-card">
        <i class="fa-solid fa-barcode"></i>
        <span>Boletos</span>
      </router-link>
      <router-link to="/avisos" class="quick-card">
        <i class="fa-solid fa-bell"></i>
        <span>Avisos</span>
      </router-link>
      <router-link to="/calendario" class="quick-card">
        <i class="fa-solid fa-calendar-days"></i>
        <span>Calendário</span>
      </router-link>
    </div>

    <!-- Próximas Entregas -->
    <div class="section-title">PRÓXIMAS ENTREGAS</div>
    <div class="entregas-list">
      <div
        v-for="entrega in entregas"
        :key="entrega.id"
        class="entrega-item card"
      >
        <span class="entrega-dot" :style="{ background: entrega.color }"></span>
        <div class="entrega-info">
          <div class="entrega-nome">{{ entrega.nome }}</div>
          <div class="entrega-data">{{ entrega.data }}</div>
        </div>
        <div
          class="entrega-check"
          :class="{ checked: entrega.done }"
          @click="entrega.done = !entrega.done"
        >
          <i v-if="entrega.done" class="fa-solid fa-check"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import PageHeader from '../components/PageHeader.vue'

const entregas = reactive([
  { id: 1, nome: 'IHC – Apresentação do trabalho', data: 'Quarta-feira (06/05)', color: '#f97316', done: true },
  { id: 2, nome: 'Banco de Dados I – Trabalho Final', data: 'Sexta-feira (08/05)', color: '#22c55e', done: false },
])
</script>

<style scoped>
.status-card {
  margin-bottom: 24px;
  border-left: 4px solid var(--color-accent-green);
}

.status-title {
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 10px;
}

.status-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.status-icon.confirmed {
  color: var(--color-accent-green);
  font-size: 28px;
  margin-top: 2px;
}

.status-date {
  font-size: 13px;
  margin-bottom: 4px;
}

.status-next {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.4;
}

.section-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--color-text);
  margin-bottom: 12px;
}

.quick-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.quick-card {
  background: var(--color-white);
  border-radius: var(--radius);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  transition: transform 0.15s;
}

.quick-card:hover {
  transform: translateY(-2px);
}

.quick-card i {
  font-size: 28px;
}

.entregas-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.entrega-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
}

.entrega-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.entrega-info {
  flex: 1;
}

.entrega-nome {
  font-weight: 600;
  font-size: 14px;
}

.entrega-data {
  font-size: 12px;
  color: var(--color-text-muted);
}

.entrega-check {
  width: 26px;
  height: 26px;
  border: 2px solid var(--color-border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  color: white;
  transition: background 0.2s, border-color 0.2s;
}

.entrega-check.checked {
  background: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
