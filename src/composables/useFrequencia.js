import { ref } from 'vue'
import { frequenciaInicial } from '../data/dadosIniciais.js'

function carregar() {
  const raw = localStorage.getItem('ucs_frequencia')
  return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(frequenciaInicial))
}

const frequencia = ref(carregar())

export function useFrequencia() {
  function getFrequenciaTurma(turmaId) {
    const id = String(turmaId)
    return frequencia.value[id] || []
  }

  /** Calcula % de presença de um aluno em uma turma */
  function getPorcentagemFrequencia(turmaId, alunoNome) {
    const registros = getFrequenciaTurma(turmaId)
    if (registros.length === 0) return 100
    const presente = registros.filter(r => r.presentes.includes(alunoNome)).length
    return Math.round((presente / registros.length) * 100)
  }

  /** Retorna status texto e cor para a % de frequência */
  function getStatusFrequencia(porcentagem) {
    if (porcentagem >= 85) return { status: 'OK', color: '#22c55e' }
    if (porcentagem >= 75) return { status: 'NO LIMITE', color: '#1a1adb' }
    return { status: 'CRÍTICO', color: '#ef4444' }
  }

  /** Retorna se o aluno estava presente em uma data específica */
  function getPresencaNaData(turmaId, data, alunoNome) {
    const registros = getFrequenciaTurma(turmaId)
    const registro = registros.find(r => r.data === data)
    if (!registro) return null // sem registro
    return registro.presentes.includes(alunoNome)
  }

  /** Salva ou atualiza a chamada de uma data */
  function salvarChamada(turmaId, data, presentes) {
    const id = String(turmaId)
    const registros = [...(frequencia.value[id] || [])]
    const idx = registros.findIndex(r => r.data === data)
    if (idx > -1) {
      registros[idx] = { data, presentes }
    } else {
      registros.push({ data, presentes })
    }
    frequencia.value = { ...frequencia.value, [id]: registros }
    localStorage.setItem('ucs_frequencia', JSON.stringify(frequencia.value))
  }

  function recarregar() {
    frequencia.value = carregar()
  }

  return {
    frequencia,
    getFrequenciaTurma,
    getPorcentagemFrequencia,
    getStatusFrequencia,
    getPresencaNaData,
    salvarChamada,
    recarregar,
  }
}
