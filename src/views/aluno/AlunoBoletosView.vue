<template>
  <div class="page-content">
    <PageHeader :name="userName" />
    <h1 class="page-title">Boletos e Financeiro</h1>

    <div class="card financeiro-card">
      <div class="aluno-info">
        <div class="aluno-nome">Gabriel Sironi da Luz</div>
        <div class="aluno-curso">Curso – Jogos Digitais (GRA012321V)</div>
      </div>

      <div class="mensalidades-grid">
        <div class="col-aberto">
          <div class="col-title">Mensalidades<br/>em Aberto:</div>
          <div class="boleto-item" v-for="boleto in boletos.abertos" :key="boleto.id">
            <div class="boleto-data">{{ boleto.data }} – R$ {{ boleto.valor }}</div>
            <button class="btn-pagar" @click="pagar(boleto)">
              <i class="fa-solid fa-cart-shopping"></i><br/>Pagar
            </button>
          </div>
          <div v-if="boletos.abertos.length === 0" class="sem-boletos">Nenhum boleto em aberto</div>
        </div>

        <div class="divider-v"></div>

        <div class="col-pagas">
          <div class="col-title">Mensalidades<br/>Pagas:</div>
          <div class="paga-item" v-for="paga in boletos.pagos" :key="paga.id">
            <span class="paga-data">{{ paga.data }}</span> –
            <span class="paga-valor">R$ {{ paga.valor }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../../composables/useAuth.js'
import { useBoletos } from '../../composables/useBoletos.js'
import PageHeader from '../../components/PageHeader.vue'

const { userName } = useAuth()
const { boletos, pagarBoleto } = useBoletos()

function pagar(boleto) {
  pagarBoleto(boleto)
}
</script>

<style scoped>
.financeiro-card {
  padding: 20px;
}

.aluno-info {
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--color-border);
}

.aluno-nome {
  font-weight: 700;
  font-size: 15px;
}

.aluno-curso {
  font-size: 13px;
  color: var(--color-text-muted);
}

.mensalidades-grid {
  display: flex;
  gap: 0;
  align-items: flex-start;
}

.col-aberto, .col-pagas {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.col-title {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 6px;
}

.divider-v {
  width: 1px;
  background: var(--color-border);
  align-self: stretch;
  margin: 0 16px;
}

.boleto-data {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}

.btn-pagar {
  background: var(--color-accent-green);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: fit-content;
  transition: background 0.2s;
}

.btn-pagar:hover {
  background: #16a34a;
}

.btn-pagar i {
  font-size: 16px;
}

.paga-item {
  font-size: 13px;
  line-height: 1.8;
}

.paga-data {
  font-weight: 500;
}

.paga-valor {
  color: var(--color-accent-green);
  font-weight: 700;
}

.sem-boletos {
  font-size: 13px;
  color: var(--color-accent-green);
  font-weight: 600;
}
</style>
