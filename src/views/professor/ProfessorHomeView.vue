<template>
  <div class="page-content">
    <PageHeader :name="userName" />

    <!-- Aulas de Hoje -->
    <div class="section-title">📌 AULAS DE HOJE</div>
    <div class="aulas-list">
      <div
        v-for="turma in turmasHoje"
        :key="turma.id"
        class="aula-card card"
        @click="router.push('/professor/turma/' + turma.id)"
      >
        <div class="aula-header">
          <div class="aula-nome">{{ turma.nome }}</div>
          <div class="aula-horario">{{ turma.horario }}</div>
        </div>
        <div class="aula-info">
          <span><i class="fa-solid fa-location-dot"></i> Bloco {{ turma.bloco }}, Sala {{ turma.sala }}</span>
          <span><i class="fa-solid fa-users"></i> {{ turma.alunos.length }} alunos</span>
        </div>
      </div>
      <div v-if="turmasHoje.length === 0" class="sem-aulas">
        Nenhuma aula programada para hoje.
      </div>
    </div>

    <!-- Acesso Rápido -->
    <div class="section-title">⚡ ACESSO RÁPIDO</div>
    <div class="quick-grid">
      <router-link :to="'/professor/turmas'" class="quick-card">
        <i class="fa-solid fa-book-open"></i>
        <span>Minhas Turmas</span>
      </router-link>
      <router-link to="/professor/avisos" class="quick-card">
        <i class="fa-solid fa-bullhorn"></i>
        <span>Novo Aviso</span>
      </router-link>
      <router-link to="/professor/calendario" class="quick-card">
        <i class="fa-solid fa-calendar-days"></i>
        <span>Calendário</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth.js'
import { useTurmas } from '../../composables/useTurmas.js'
import PageHeader from '../../components/PageHeader.vue'

const router = useRouter()
const { userName } = useAuth()
const { turmas } = useTurmas()

const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const hoje = diasSemana[new Date().getDay()]

const turmasHoje = computed(() =>
  turmas.value.filter(t => t.diaSemana === hoje)
)
</script>

<style scoped>
.section-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--color-text);
  margin-bottom: 12px;
  margin-top: 4px;
}

.aulas-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.aula-card {
  padding: 16px;
  border-left: 4px solid var(--color-primary);
  cursor: pointer;
  transition: transform 0.15s;
}

.aula-card:hover {
  transform: translateY(-2px);
}

.aula-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.aula-nome {
  font-weight: 700;
  font-size: 15px;
}

.aula-horario {
  font-size: 12px;
  color: var(--color-text-muted);
  font-weight: 600;
  white-space: nowrap;
}

.aula-info {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.aula-info i {
  margin-right: 4px;
  color: var(--color-primary);
}

.sem-aulas {
  text-align: center;
  color: var(--color-text-muted);
  padding: 20px;
  font-size: 14px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 4px;
}

.quick-card {
  background: var(--color-white);
  border-radius: var(--radius);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
  font-size: 30px;
}
</style>
