import { ref } from 'vue'
import { boletosIniciais } from '../data/dadosIniciais.js'

function carregar() {
  const raw = localStorage.getItem('ucs_boletos')
  return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(boletosIniciais))
}

const boletos = ref(carregar())

export function useBoletos() {
  function pagarBoleto(boleto) {
    const idx = boletos.value.abertos.findIndex(b => b.id === boleto.id)
    if (idx > -1) {
      const [pago] = boletos.value.abertos.splice(idx, 1)
      boletos.value.pagos.unshift(pago)
      localStorage.setItem('ucs_boletos', JSON.stringify(boletos.value))
    }
  }

  function recarregar() {
    boletos.value = carregar()
  }

  return { boletos, pagarBoleto, recarregar }
}
