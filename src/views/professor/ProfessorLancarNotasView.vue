<template>
  <div class="page-content">
    <button class="btn-back" @click="router.push('/professor/turmas')">
      <i class="fa-solid fa-arrow-left"></i> Turmas
    </button>

    <div v-if="turma">
      <h1 class="page-title">Lançar Notas — {{ turma.nome }}</h1>

      <div class="notas-table-wrapper card">
        <div class="table-scroll">
          <table class="notas-table">
            <thead>
              <tr>
                <th>Aluno</th>
                <th v-for="av in turma.avaliacoes" :key="av">{{ av }}</th>
                <th>Média</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="aluno in alunosNotas" :key="aluno.nome">
                <td class="aluno-cell">{{ aluno.nome.split(' ')[0] }}</td>
                <td v-for="av in turma.avaliacoes" :key="av">
                  <input
                    type="number"
                    class="nota-input"
                    :value="aluno.notas[av]"
                    @input="e => atualizar(aluno.nome, av, e.target.value)"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="–"
                  />
                </td>
                <td class="media-cell">{{ calcularMedia(aluno) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn-salvar" @click="salvar">
          <i class="fa-solid fa-floppy-disk"></i> SALVAR NOTAS
        </button>
        <p v-if="salvo" class="msg-ok"><i class="fa-solid fa-circle-check"></i> Notas salvas com sucesso!</p>
      </div>
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
import { useNotas } from '../../composables/useNotas.js'

const route = useRoute()
const router = useRouter()
const { getTurma } = useTurmas()
const { getNotasTurma, salvarNotas } = useNotas()

const turma = computed(() => getTurma(route.params.id))
const salvo = ref(false)

// Cópia local para edição
const alunosNotas = reactive([])

function init() {
  if (!turma.value) return
  const salvas = getNotasTurma(turma.value.id)
  alunosNotas.length = 0
  turma.value.alunos.forEach(nome => {
    const existente = salvas.find(a => a.aluno === nome)
    const notas = existente?.notas || {}
    turma.value.avaliacoes.forEach(av => {
      if (!(av in notas)) notas[av] = null
    })
    alunosNotas.push({ nome, notas: { ...notas } })
  })
}

watch(() => route.params.id, init, { immediate: true })

function atualizar(nome, av, valor) {
  const aluno = alunosNotas.find(a => a.nome === nome)
  if (aluno) {
    aluno.notas[av] = valor === '' ? null : Number(valor)
    salvo.value = false
  }
}

function calcularMedia(aluno) {
  const vals = Object.values(aluno.notas).filter(v => v !== null)
  if (vals.length === 0) return '–'
  return (vals.reduce((s, v) => s + v, 0) / vals.length).toFixed(1)
}

function salvar() {
  if (!turma.value) return
  const dados = alunosNotas.map(a => ({ aluno: a.nome, notas: { ...a.notas } }))
  salvarNotas(turma.value.id, dados)
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

.notas-table-wrapper {
  padding: 16px;
}

.table-scroll {
  overflow-x: auto;
  margin: -4px;
  padding: 4px;
}

.notas-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.notas-table th {
  text-align: center;
  font-weight: 700;
  font-size: 11px;
  color: var(--color-text-muted);
  padding: 8px 4px;
  border-bottom: 2px solid var(--color-border);
  white-space: nowrap;
}

.notas-table td {
  padding: 6px 4px;
  text-align: center;
}

.aluno-cell {
  text-align: left !important;
  font-weight: 500;
  white-space: nowrap;
}

.nota-input {
  width: 48px;
  padding: 6px 4px;
  border: 1.5px solid var(--color-border);
  border-radius: 6px;
  text-align: center;
  font-size: 13px;
  font-family: var(--font);
  outline: none;
  transition: border-color 0.15s;
}

.nota-input:focus {
  border-color: var(--color-primary);
}

.media-cell {
  font-weight: 700;
  color: var(--color-primary);
}

.btn-salvar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
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
