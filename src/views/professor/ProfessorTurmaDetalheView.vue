<template>
  <div class="page-content">
    <button class="btn-back" @click="router.push('/professor/turmas')">
      <i class="fa-solid fa-arrow-left"></i> Turmas
    </button>

    <div v-if="turma" class="turma-detalhe">
      <h1 class="page-title">{{ turma.nome }}</h1>
      <div class="meta-card card">
        <div class="meta-row"><i class="fa-solid fa-clock"></i> {{ turma.horario }}</div>
        <div class="meta-row"><i class="fa-solid fa-location-dot"></i> Bloco {{ turma.bloco }}, Sala {{ turma.sala }}</div>
        <div class="meta-row"><i class="fa-solid fa-users"></i> {{ turma.alunos.length }} alunos</div>
      </div>

      <!-- Resumo dos alunos -->
      <div class="section-title">ALUNOS</div>
      <div v-for="aluno in turma.alunos" :key="aluno" class="aluno-card card">
        <div class="aluno-nome">{{ aluno }}</div>
        <div class="aluno-stats">
          <span class="stat">
            Média: <strong>{{ getMediaParcial(turma.id, aluno) }}</strong>
          </span>
          <span class="stat" :style="{ color: getStatusFrequencia(getPorcentagemFrequencia(turma.id, aluno)).color }">
            Freq: <strong>{{ getPorcentagemFrequencia(turma.id, aluno) }}%</strong>
          </span>
        </div>
      </div>
    </div>

    <div v-else class="card" style="text-align:center;padding:40px;">
      Turma não encontrada.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth.js'
import { useTurmas } from '../../composables/useTurmas.js'
import { useNotas } from '../../composables/useNotas.js'
import { useFrequencia } from '../../composables/useFrequencia.js'

const route = useRoute()
const router = useRouter()
const { userName } = useAuth()
const { getTurma } = useTurmas()
const { getMediaParcial } = useNotas()
const { getPorcentagemFrequencia, getStatusFrequencia } = useFrequencia()

const turma = computed(() => getTurma(route.params.id))
</script>

<style scoped>
.btn-back {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-family: var(--font);
}

.turma-detalhe {
  display: flex;
  flex-direction: column;
}

.meta-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.meta-row {
  font-size: 14px;
  color: var(--color-text-muted);
}

.meta-row i {
  width: 20px;
  color: var(--color-primary);
}

.section-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--color-text);
  margin-bottom: 10px;
}

.aluno-card {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.aluno-nome {
  font-weight: 600;
  font-size: 14px;
}

.aluno-stats {
  display: flex;
  gap: 14px;
}

.stat {
  font-size: 12px;
}

.stat strong {
  font-size: 13px;
}
</style>
