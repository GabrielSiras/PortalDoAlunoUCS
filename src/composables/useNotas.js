import { ref } from 'vue'
import { notasIniciais } from '../data/dadosIniciais.js'

function carregar() {
  const raw = localStorage.getItem('ucs_notas')
  return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(notasIniciais))
}

const todasNotas = ref(carregar())

export function useNotas() {
  function getNotasTurma(turmaId) {
    const id = String(turmaId)
    return todasNotas.value[id] || []
  }

  function getNotasAluno(turmaId, alunoNome) {
    const turma = getNotasTurma(turmaId)
    return turma.find(a => a.aluno === alunoNome)?.notas || {}
  }

  function salvarNotas(turmaId, dados) {
    const id = String(turmaId)
    todasNotas.value = { ...todasNotas.value, [id]: dados }
    localStorage.setItem('ucs_notas', JSON.stringify(todasNotas.value))
  }

  function atualizarNotaAluno(turmaId, alunoNome, avaliacao, valor) {
    const id = String(turmaId)
    const turma = [...(todasNotas.value[id] || [])]
    const idx = turma.findIndex(a => a.aluno === alunoNome)
    if (idx > -1) {
      turma[idx] = {
        ...turma[idx],
        notas: { ...turma[idx].notas, [avaliacao]: valor === '' ? null : Number(valor) },
      }
      salvarNotas(turmaId, turma)
    }
  }

  /** Retorna { label, valor } para exibição no accordion do aluno */
  function getNotasFormatadas(turmaId, alunoNome) {
    const notas = getNotasAluno(turmaId, alunoNome)
    return Object.entries(notas).map(([label, valor]) => ({ label, valor }))
  }

  /** Calcula média parcial (ignora null) */
  function getMediaParcial(turmaId, alunoNome) {
    const notas = getNotasAluno(turmaId, alunoNome)
    const valores = Object.values(notas).filter(v => v !== null)
    if (valores.length === 0) return '–'
    const media = valores.reduce((s, v) => s + v, 0) / valores.length
    return media.toFixed(2).replace('.', ',')
  }

  function getMediaNumerica(turmaId, alunoNome) {
    const notas = getNotasAluno(turmaId, alunoNome)
    const valores = Object.values(notas).filter(v => v !== null)
    if (valores.length === 0) return 0
    return valores.reduce((s, v) => s + v, 0) / valores.length
  }

  function recarregar() {
    todasNotas.value = carregar()
  }

  return {
    todasNotas,
    getNotasTurma,
    getNotasAluno,
    salvarNotas,
    atualizarNotaAluno,
    getNotasFormatadas,
    getMediaParcial,
    getMediaNumerica,
    recarregar,
  }
}
