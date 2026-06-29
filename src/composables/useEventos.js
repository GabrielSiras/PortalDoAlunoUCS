import { ref } from 'vue'
import { eventosIniciais } from '../data/dadosIniciais.js'

function carregar() {
  const raw = localStorage.getItem('ucs_eventos')
  return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(eventosIniciais))
}

const eventos = ref(carregar())

const diasSemana = ['Dom', 'Seg', 'Ter', 'Quar', 'Quin', 'Sex', 'Sáb']
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export function useEventos() {
  function adicionarEvento({ nome, local, data, color, turmaId }) {
    const d = new Date(data + 'T12:00:00') // evita fuso
    const dia = d.getDate()
    const mes = d.getMonth()
    const diaSemana = diasSemana[d.getDay()]
    const mesNome = meses[mes]

    const novo = {
      id: Date.now(),
      nome,
      local: local || '',
      color: color || '#1a1adb',
      dia,
      mes,
      diaSemana,
      diaNum: String(dia).padStart(2, '0'),
      mesNome,
      turmaId: turmaId || null,
    }
    eventos.value = [...eventos.value, novo]
    localStorage.setItem('ucs_eventos', JSON.stringify(eventos.value))
    return novo
  }

  function removerEvento(id) {
    eventos.value = eventos.value.filter(e => e.id !== id)
    localStorage.setItem('ucs_eventos', JSON.stringify(eventos.value))
  }

  function eventosNoMes(mes, ano) {
    return eventos.value.filter(e => e.mes === mes)
  }

  function eventosNoDia(dia, mes, ano) {
    return eventos.value.filter(e => e.dia === dia && e.mes === mes)
  }

  function recarregar() {
    eventos.value = carregar()
  }

  return { eventos, adicionarEvento, removerEvento, eventosNoMes, eventosNoDia, recarregar }
}
