import { ref } from 'vue'
import { turmas as turmasSeed } from '../data/dadosIniciais.js'

const turmas = ref(JSON.parse(localStorage.getItem('ucs_turmas') || JSON.stringify(turmasSeed)))

export function useTurmas() {
  function getTurma(id) {
    return turmas.value.find(t => t.id === Number(id))
  }

  function recarregar() {
    turmas.value = JSON.parse(localStorage.getItem('ucs_turmas') || JSON.stringify(turmasSeed))
  }

  return { turmas, getTurma, recarregar }
}
