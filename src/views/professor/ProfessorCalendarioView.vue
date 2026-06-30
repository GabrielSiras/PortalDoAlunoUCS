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
      <p class="semanal-info">Minhas aulas — {{ nomeMes }} {{ ano }}</p>
      <div v-for="turma in turmas" :key="turma.id" class="ev-semanal">
        <div class="ev-date-col">
          <div class="ev-dia-sem">{{ turma.diaSemana }}</div>
          <div class="ev-dia-num">{{ turma.horario.split(',')[0] }}</div>
        </div>
        <div class="ev-bar" style="border-left-color: var(--color-primary)">
          <div class="ev-nome">{{ turma.nome }}</div>
          <div class="ev-local">Bloco {{ turma.bloco }}, Sala {{ turma.sala }}</div>
        </div>
      </div>
    </div>

    <!-- 📅 Adicionar Evento -->
    <div class="card form-card">
      <div class="form-title">📅 Adicionar evento ao calendário</div>

      <div class="form-group">
        <label>Nome do evento:</label>
        <input v-model="form.nome" type="text" placeholder="Ex: Prova de IHC" class="form-input" />
      </div>

      <div class="form-row-2">
        <div class="form-group flex-1">
          <label>Data:</label>
          <input v-model="form.data" type="date" class="form-input" />
        </div>
        <div class="form-group flex-1">
          <label>Cor:</label>
          <select v-model="form.color" class="form-select">
            <option value="#1a1adb">🔵 Azul</option>
            <option value="#f97316">🟠 Laranja</option>
            <option value="#22c55e">🟢 Verde</option>
            <option value="#ef4444">🔴 Vermelho</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Local (opcional):</label>
        <input v-model="form.local" type="text" placeholder="Ex: Bloco 71, Sala 307" class="form-input" />
      </div>

      <div class="form-group">
        <label>Vincular a uma turma (opcional):</label>
        <select v-model="form.turmaId" class="form-select">
          <option :value="null">Nenhuma</option>
          <option v-for="t in turmas" :key="t.id" :value="t.id">{{ t.nome }}</option>
        </select>
      </div>

      <button class="btn-adicionar" @click="adicionar">
        <i class="fa-solid fa-plus-circle"></i> ADICIONAR EVENTO
      </button>
      <p v-if="erro" class="erro">{{ erro }}</p>
    </div>

    <!-- Lista de eventos -->
    <div class="section-title" style="margin-top: 24px;">TODOS OS EVENTOS</div>
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
        <button class="btn-delete" @click="removerEvento(ev.id)">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <p v-if="eventos.length === 0" class="sem-eventos">Nenhum evento cadastrado.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useAuth } from '../../composables/useAuth.js'
import { useTurmas } from '../../composables/useTurmas.js'
import { useEventos } from '../../composables/useEventos.js'
import PageHeader from '../../components/PageHeader.vue'

const { userName } = useAuth()
const { turmas } = useTurmas()
const { eventos, adicionarEvento, removerEvento } = useEventos()

const view = ref('mensal')
const erro = ref('')

const form = reactive({
  nome: '',
  local: '',
  data: new Date().toISOString().slice(0, 10),
  color: '#1a1adb',
  turmaId: null,
})

// Calendário
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

function adicionar() {
  if (!form.nome.trim()) {
    erro.value = 'Informe o nome do evento.'
    return
  }
  if (!form.data) {
    erro.value = 'Informe a data do evento.'
    return
  }
  erro.value = ''
  adicionarEvento({
    nome: form.nome.trim(),
    local: form.local.trim(),
    data: form.data,
    color: form.color,
    turmaId: form.turmaId || null,
  })
  // Limpar
  form.nome = ''
  form.local = ''
  form.data = new Date().toISOString().slice(0, 10)
  form.color = '#1a1adb'
  form.turmaId = null
}
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
  padding: 8px 4px;
  border-radius: 6px;
  font-size: 14px;
  min-height: 52px;
  position: relative;
  gap: 3px;
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

/* Formulário */
.form-card {
  padding: 18px;
}

.form-title {
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 14px;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 4px;
}

.form-row-2 {
  display: flex;
  gap: 10px;
}

.flex-1 { flex: 1; }

.form-input, .form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-family: var(--font);
  outline: none;
  transition: border-color 0.15s;
  background: var(--color-white);
}

.form-input:focus, .form-select:focus {
  border-color: var(--color-primary);
}

.btn-adicionar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
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
  margin-top: 4px;
}

.btn-adicionar:hover {
  background: var(--color-primary-dark);
}

.erro {
  color: var(--color-accent-red);
  font-size: 13px;
  text-align: center;
  margin-top: 8px;
}

/* Eventos */
.section-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--color-text);
  margin-bottom: 12px;
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

.btn-delete {
  background: none;
  border: none;
  color: var(--color-accent-red);
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
  opacity: 0.6;
  transition: opacity 0.15s;
}

.btn-delete:hover {
  opacity: 1;
}

/* Semanal */
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

.sem-eventos {
  text-align: center;
  color: var(--color-text-muted);
  padding: 20px;
  font-size: 14px;
}
</style>
