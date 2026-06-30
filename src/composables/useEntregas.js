import { ref, computed } from 'vue'
import { entregasIniciais } from '../data/dadosIniciais.js'

const STORAGE_KEY = 'ucs_entregas'

function carregar() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(entregasIniciais))
}

const entregas = ref(carregar())

export function useEntregas() {
  const entregasAtivas = computed(() => {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    return entregas.value.filter(e => {
      const [dia, mes, ano] = e.data.split('/').map(Number)
      const dataEntrega = new Date(ano, mes - 1, dia)
      return dataEntrega >= hoje
    })
  })

  const entregasPassadas = computed(() => {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    return entregas.value.filter(e => {
      const [dia, mes, ano] = e.data.split('/').map(Number)
      const dataEntrega = new Date(ano, mes - 1, dia)
      return dataEntrega < hoje && !e.done
    })
  })

  function toggle(id) {
    const e = entregas.value.find(e => e.id === id)
    if (e) {
      e.done = !e.done
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entregas.value))
    }
  }

  function adicionarEntrega({ nome, data, color }) {
    const novo = { id: Date.now(), nome, data, color: color || '#f97316', done: false }
    entregas.value.push(novo)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entregas.value))
  }

  function recarregar() {
    entregas.value = carregar()
  }

  return { entregas, entregasAtivas, entregasPassadas, toggle, adicionarEntrega, recarregar }
}
