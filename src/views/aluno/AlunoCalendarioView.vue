<template>
  <div class="page-content">
    <PageHeader :name="userName" />

    <!-- Tabs Mensal / Semanal -->
    <div class="tabs">
      <button :class="['tab', { active: view === 'mensal' }]" @click="view = 'mensal'">Mensal</button>
      <button :class="['tab', { active: view === 'semanal' }]" @click="view = 'semanal'">Semanal</button>
    </div>

    <!-- Calendário Mensal -->
    <div v-if="view === 'mensal'" class="calendario-card card">
      <div class="cal-nav">
        <button class="cal-arrow" @click="mesAnterior"><i class="fa-solid fa-chevron-left"></i></button>
        <span class="cal-mes">{{ nomeMes }} {{ ano }}</span>
        <button class="cal-arrow" @click="proximoMes"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
      <div class="cal-grid">
        <div class="cal-head" v-for="d in diasSemana" :key="d">{{ d }}</div>
        <div
          v-for="(dia, i) in diasCalendario"
          :key="i"
          :class="['cal-dia', { vazio: !dia, hoje: dia === diaAtual && mesAtual === mes && ano === anoAtual }]"
        >
          <span>{{ dia || '' }}</span>
          <span
            v-for="ev in eventosNoDia(dia)"
            :key="ev.id"
            class="ev-dot"
            :style="{ background: ev.color }"
          ></span>
        </div>
      </div>
    </div>

    <!-- Calendário Semanal -->
    <div v-else class="semanal-card card">
      <p class="semanal-info">Semana atual – {{ nomeMes }} {{ ano }}</p>
      <div v-for="ev in eventosDaSemana" :key="ev.id" class="ev-semanal">
        <div class="ev-date-col">
          <div class="ev-dia-sem">{{ ev.diaSemana }}</div>
          <div class="ev-dia-num">{{ ev.diaNum }}<br/><small>{{ ev.mesNome }}</small></div>
        </div>
        <div class="ev-bar" :style="{ borderLeftColor: ev.color }">
          <div class="ev-nome">{{ ev.nome }}</div>
          <div class="ev-local">{{ ev.local }}</div>
        </div>
      </div>
      <p v-if="eventosDaSemana.length === 0" class="sem-info">Nenhum evento nesta semana.</p>
    </div>

    <!-- Lista de eventos -->
    <div class="section-title">TODOS OS EVENTOS</div>
    <div class="eventos-list">
      <div v-for="ev in eventosOrdenados" :key="ev.id" class="evento-item card">
        <div class="ev-date-col">
          <div class="ev-dia-sem">{{ ev.diaSemana }}</div>
          <div class="ev-dia-num">{{ ev.diaNum }}<br/><small>{{ ev.mesNome }}</small></div>
        </div>
        <div class="ev-bar" :style="{ borderLeftColor: ev.color }">
          <div class="ev-nome">{{ ev.nome }}</div>
          <div class="ev-local">{{ ev.local }}</div>
        </div>
      </div>
      <p v-if="eventos.length === 0" class="sem-info">Nenhum evento cadastrado.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '../../composables/useAuth.js'
import { useEventos } from '../../composables/useEventos.js'
import PageHeader from '../../components/PageHeader.vue'

const { userName } = useAuth()
const { eventos } = useEventos()

const view = ref('mensal')
const hoje = new Date()
const diaAtual = hoje.getDate()
const mesAtual = hoje.getMonth()
const anoAtual = hoje.getFullYear()

const mes = ref(mesAtual)
const ano = ref(anoAtual)

const mesesNomes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const diasSemana = ['Dom','Seg','Ter','Quar','Quin','Sex','Sáb']

const nomeMes = computed(() => mesesNomes[mes.value])

function mesAnterior() {
  if (mes.value === 0) { mes.value = 11; ano.value-- } else mes.value--
}
function proximoMes() {
  if (mes.value === 11) { mes.value = 0; ano.value++ } else mes.value++
}

const diasCalendario = computed(() => {
  const primeiro = new Date(ano.value, mes.value, 1).getDay()
  const total = new Date(ano.value, mes.value + 1, 0).getDate()
  const dias = []
  for (let i = 0; i < primeiro; i++) dias.push(null)
  for (let i = 1; i <= total; i++) dias.push(i)
  return dias
})

function eventosNoDia(dia) {
  if (!dia) return []
  return eventos.value.filter(e => e.dia === dia && e.mes === mes.value)
}

const eventosOrdenados = computed(() =>
  [...eventos.value].sort((a, b) => {
    if (a.mes !== b.mes) return b.mes - a.mes
    return b.dia - a.dia
  })
)

const eventosDaSemana = computed(() => {
  return eventos.value.filter(() => true).slice(0, 10)
})
</script>

<style scoped>
.tabs {
  display: flex;
  border-radius: var(--radius);
  overflow: hidden;
  border: 2px solid var(--color-primary);
  margin-bottom: 16px;
}

.tab {
  flex: 1;
  padding: 11px;
  font-size: 15px;
  font-weight: 700;
  background: transparent;
  color: var(--color-primary);
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.tab.active {
  background: var(--color-primary);
  color: white;
}

.calendario-card {
  margin-bottom: 20px;
}

.cal-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.cal-mes {
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 1px;
}

.cal-arrow {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.cal-head {
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-muted);
  padding: 4px 0;
}

.cal-dia {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 2px;
  border-radius: 6px;
  font-size: 13px;
  min-height: 34px;
  position: relative;
  gap: 2px;
}

.cal-dia.hoje > span:first-child {
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.ev-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.section-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--color-text);
  margin-bottom: 12px;
  margin-top: 4px;
}

.eventos-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.evento-item {
  display: flex;
  gap: 14px;
  padding: 14px 16px;
  align-items: center;
}

.ev-date-col {
  min-width: 48px;
  text-align: center;
  line-height: 1.3;
}

.ev-dia-sem {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 600;
}

.ev-dia-num {
  font-size: 16px;
  font-weight: 800;
}

.ev-dia-num small {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-muted);
}

.ev-bar {
  border-left: 4px solid #ccc;
  padding-left: 12px;
  flex: 1;
}

.ev-nome {
  font-weight: 700;
  font-size: 14px;
}

.ev-local {
  font-size: 12px;
  color: var(--color-text-muted);
}

.semanal-card {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.semanal-info {
  font-size: 13px;
  color: var(--color-text-muted);
  font-weight: 600;
}

.ev-semanal {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.sem-info {
  text-align: center;
  color: var(--color-text-muted);
  padding: 20px;
  font-size: 14px;
}
</style>
