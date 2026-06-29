<template>
  <div class="page-content">
    <button class="btn-back" @click="router.push('/professor/turmas')">
      <i class="fa-solid fa-arrow-left"></i> Turmas
    </button>

    <div v-if="turma">
      <h1 class="page-title">Chamada — {{ turma.nome }}</h1>

      <div class="data-card card">
        <label class="data-label">Data da aula:</label>
        <input type="date" v-model="dataAula" class="data-input" />
      </div>

      <div class="chamada-list">
        <div v-for="aluno in turma.alunos" :key="aluno" class="chamada-item card">
          <span class="chamada-nome">{{ aluno }}</span>
          <div class="toggle-group">
            <button
              :class="['toggle-btn', 'presente', { active: presentes.includes(aluno) }]"
              @click="marcarPresente(aluno)"
            >
              <i class="fa-solid fa-check"></i> Presente
            </button>
            <button
              :class="['toggle-btn', 'ausente', { active: !presentes.includes(aluno) }]"
              @click="marcarAusente(aluno)"
            >
              <i class="fa-solid fa-xmark"></i> Ausente
            </button>
          </div>
        </div>
      </div>

      <button class="btn-salvar" @click="salvarChamada">
        <i class="fa-solid fa-floppy-disk"></i> SALVAR FREQUÊNCIA
      </button>
      <p v-if="salvo" class="msg-ok"><i class="fa-solid fa-circle-check"></i> Frequência salva com sucesso!</p>
    </div>

    <div v-else class="card" style="text-align:center;padding:40px;">
      Turma não encontrada.
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTurmas } from '../../composables/useTurmas.js'
import { useFrequencia } from '../../composables/useFrequencia.js'

const route = useRoute()
const router = useRouter()
const { getTurma } = useTurmas()
const { getFrequenciaTurma, salvarChamada: persistir } = useFrequencia()

const turma = computed(() => getTurma(route.params.id))
const dataAula = ref(new Date().toISOString().slice(0, 10))
const presentes = reactive([])
const salvo = ref(false)

function carregar() {
  if (!turma.value) return
  const registros = getFrequenciaTurma(turma.value.id)
  const reg = registros.find(r => r.data === dataAula.value)
  presentes.length = 0
  if (reg) {
    presentes.push(...reg.presentes)
  } else {
    // Por padrão, todos presentes
    presentes.push(...turma.value.alunos)
  }
  salvo.value = false
}

watch(() => route.params.id, carregar, { immediate: true })
watch(dataAula, carregar)

function marcarPresente(nome) {
  if (!presentes.includes(nome)) {
    presentes.push(nome)
    salvo.value = false
  }
}

function marcarAusente(nome) {
  const idx = presentes.indexOf(nome)
  if (idx > -1) {
    presentes.splice(idx, 1)
    salvo.value = false
  }
}

function salvarChamada() {
  if (!turma.value) return
  persistir(turma.value.id, dataAula.value, [...presentes])
  salvo.value = true
  setTimeout(() => (salvo.value = false), 2500)
}
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

.data-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 14px 16px;
}

.data-label {
  font-weight: 600;
  font-size: 14px;
}

.data-input {
  flex: 1;
  padding: 8px 12px;
  border: 1.5px solid var(--color-border);
  border-radius: 6px;
  font-size: 14px;
  font-family: var(--font);
  outline: none;
}

.data-input:focus {
  border-color: var(--color-primary);
}

.chamada-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.chamada-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}

.chamada-nome {
  font-weight: 600;
  font-size: 14px;
}

.toggle-group {
  display: flex;
  gap: 6px;
}

.toggle-btn {
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  border: 2px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s;
  font-family: var(--font);
}

.toggle-btn i {
  font-size: 12px;
}

.toggle-btn.presente.active {
  background: var(--color-accent-green);
  color: white;
  border-color: var(--color-accent-green);
}

.toggle-btn.ausente.active {
  background: var(--color-accent-red);
  color: white;
  border-color: var(--color-accent-red);
}

.btn-salvar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font);
  transition: background 0.2s;
}

.btn-salvar:hover {
  background: var(--color-primary-dark);
}

.msg-ok {
  text-align: center;
  margin-top: 10px;
  color: var(--color-accent-green);
  font-weight: 600;
  font-size: 14px;
}
</style>
