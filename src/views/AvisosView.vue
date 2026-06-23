<template>
  <div class="page-content">
    <PageHeader name="Gabriel" />
    <h1 class="page-title">Todos os Avisos</h1>

    <!-- Filtro -->
    <div class="filtro-wrapper">
      <select v-model="filtroSelecionado" class="filtro-select">
        <option value="">Filtro por Disciplina</option>
        <option v-for="d in disciplinas" :key="d" :value="d">{{ d }}</option>
      </select>
      <i class="fa-solid fa-filter filtro-icon"></i>
    </div>

    <!-- Lista de avisos -->
    <div class="avisos-list">
      <div
        v-for="aviso in avisosFiltrados"
        :key="aviso.id"
        class="aviso-card card"
        :style="{ borderLeftColor: aviso.color }"
      >
        <div class="aviso-header">
          <div class="aviso-titles">
            <div v-if="aviso.disciplina" class="aviso-disciplina">{{ aviso.disciplina }}</div>
            <div class="aviso-nome">{{ aviso.nome }}</div>
          </div>
          <span class="aviso-dot" :style="{ background: aviso.color }"></span>
        </div>
        <p class="aviso-corpo">{{ aviso.corpo }}</p>
        <div class="aviso-footer">
          <span v-if="aviso.urgente" class="badge-urgente">
            <i class="fa-solid fa-bell"></i> URGENTE
          </span>
          <span v-else class="aviso-tipo">
            <span class="dot-inline" :style="{ background: aviso.color }"></span>
            Anúncio normal
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'

const filtroSelecionado = ref('')
const disciplinas = ['IHC – Interface Humano Computador', 'Bancos de Dados I', 'Programação Orientada a Objetos']

const avisos = [
  {
    id: 1,
    disciplina: null,
    nome: 'Aviso de Feriado – 01/05',
    corpo: 'Prezados alunos!\nInformamos que a faculdade estará fechada por causa do Feriado dos Trabalhadores!',
    color: '#ef4444',
    urgente: true,
  },
  {
    id: 2,
    disciplina: 'IHC – Interface Humano Computador',
    nome: 'Trabalho Adiado',
    corpo: 'Prezados alunos!\nInformo que a apresentação do trabalho foi adiada para a aula de 06/05.',
    color: '#f97316',
    urgente: false,
  },
  {
    id: 3,
    disciplina: 'Bancos de Dados I',
    nome: 'Cancelamento de Aula',
    corpo: 'Prezados alunos!\nVenho a informar que a aula de hoje irá ser cancelada, pelos motivos citados na última aula.',
    color: '#22c55e',
    urgente: false,
  },
]

const avisosFiltrados = computed(() => {
  if (!filtroSelecionado.value) return avisos
  return avisos.filter(a => a.disciplina === filtroSelecionado.value)
})
</script>

<style scoped>
.filtro-wrapper {
  display: flex;
  align-items: center;
  background: var(--color-white);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0 14px;
  margin-bottom: 20px;
  position: relative;
}

.filtro-select {
  flex: 1;
  border: none;
  outline: none;
  padding: 13px 4px;
  font-size: 14px;
  font-family: var(--font);
  background: transparent;
  appearance: none;
  cursor: pointer;
}

.filtro-icon {
  color: var(--color-primary);
  font-size: 16px;
}

.avisos-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.aviso-card {
  border-left: 4px solid #ccc;
  padding: 14px 16px;
}

.aviso-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
}

.aviso-disciplina {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 500;
  margin-bottom: 2px;
}

.aviso-nome {
  font-size: 16px;
  font-weight: 700;
}

.aviso-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
}

.aviso-corpo {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.5;
  white-space: pre-line;
  margin-bottom: 12px;
}

.aviso-footer {
  display: flex;
  align-items: center;
}

.badge-urgente {
  background: #ef4444;
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.aviso-tipo {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-text-muted);
  font-weight: 500;
}

.dot-inline {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
