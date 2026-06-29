<template>
  <div class="page-content">
    <PageHeader :name="userName" />
    <h1 class="page-title">Minhas Turmas</h1>

    <div class="turmas-list">
      <div v-for="turma in turmas" :key="turma.id" class="turma-wrapper">
        <!-- Fechado -->
        <div
          v-if="!abertas[turma.id]"
          class="turma-collapsed card"
          @click="toggle(turma.id)"
        >
          <div class="turma-info">
            <span class="turma-nome">{{ turma.nome }}</span>
            <span class="turma-meta">{{ turma.alunos.length }} alunos • {{ turma.horario }}</span>
          </div>
          <i class="fa-solid fa-chevron-down"></i>
        </div>

        <!-- Aberto -->
        <div v-else class="turma-expanded card">
          <div class="turma-header" @click="toggle(turma.id)">
            <div class="turma-info">
              <span class="turma-nome">{{ turma.nome }}</span>
              <span class="turma-meta">{{ turma.alunos.length }} alunos • {{ turma.horario }}</span>
            </div>
            <i class="fa-solid fa-chevron-up"></i>
          </div>
          <div class="turma-actions">
            <button class="btn-acao" @click="router.push('/professor/turma/' + turma.id)">
              <i class="fa-solid fa-eye"></i> Ver Turma
            </button>
            <button class="btn-acao primary" @click="router.push('/professor/lancar-notas/' + turma.id)">
              <i class="fa-solid fa-pen-to-square"></i> Notas
            </button>
            <button class="btn-acao accent" @click="router.push('/professor/lancar-frequencia/' + turma.id)">
              <i class="fa-solid fa-clipboard-check"></i> Frequência
            </button>
          </div>
          <div class="alunos-list">
            <div class="alunos-title">Alunos</div>
            <div v-for="aluno in turma.alunos" :key="aluno" class="aluno-item">
              <i class="fa-solid fa-user-graduate"></i> {{ aluno }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth.js'
import { useTurmas } from '../../composables/useTurmas.js'
import PageHeader from '../../components/PageHeader.vue'

const router = useRouter()
const { userName } = useAuth()
const { turmas } = useTurmas()

const abertas = reactive({})

function toggle(id) {
  abertas[id] = !abertas[id]
}
</script>

<style scoped>
.turmas-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.turma-collapsed {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  cursor: pointer;
}

.turma-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.turma-nome {
  font-weight: 600;
  font-size: 15px;
}

.turma-meta {
  font-size: 12px;
  color: var(--color-text-muted);
}

.turma-expanded {
  padding: 16px 18px;
}

.turma-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 14px;
}

.turma-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.btn-acao {
  flex: 1;
  min-width: 90px;
  padding: 10px 8px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  border: 1.5px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: background 0.15s;
  font-family: var(--font);
}

.btn-acao i {
  font-size: 16px;
}

.btn-acao.primary {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.btn-acao.accent {
  background: var(--color-accent-green);
  color: white;
  border-color: var(--color-accent-green);
}

.alunos-list {
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
}

.alunos-title {
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 8px;
}

.aluno-item {
  font-size: 13px;
  padding: 4px 0;
  color: var(--color-text-muted);
}

.aluno-item i {
  margin-right: 6px;
  color: var(--color-primary);
  font-size: 12px;
}
</style>
