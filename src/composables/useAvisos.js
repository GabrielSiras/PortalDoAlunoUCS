import { ref } from 'vue'
import { avisosIniciais } from '../data/dadosIniciais.js'

function carregar() {
  const raw = localStorage.getItem('ucs_avisos')
  return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(avisosIniciais))
}

const avisos = ref(carregar())

export function useAvisos() {
  function adicionarAviso({ disciplina, nome, corpo, color, urgente }) {
    const novo = {
      id: Date.now(),
      disciplina: disciplina || null,
      nome,
      corpo,
      color: color || '#f97316',
      urgente: !!urgente,
      data: new Date().toISOString().slice(0, 10),
    }
    avisos.value = [novo, ...avisos.value]
    localStorage.setItem('ucs_avisos', JSON.stringify(avisos.value))
    return novo
  }

  function removerAviso(id) {
    avisos.value = avisos.value.filter(a => a.id !== id)
    localStorage.setItem('ucs_avisos', JSON.stringify(avisos.value))
  }

  function recarregar() {
    avisos.value = carregar()
  }

  return { avisos, adicionarAviso, removerAviso, recarregar }
}
