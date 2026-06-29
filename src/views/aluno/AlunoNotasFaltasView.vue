<template>
  <div class="page-content">
    <PageHeader :name="userName" />
    <h1 class="page-title">Notas e Faltas</h1>

    <div class="disciplinas-list">
      <div
        v-for="disc in disciplinasAluno"
        :key="disc.id"
        class="disciplina-wrapper"
      >
        <!-- Accordion fechado -->
        <div
          v-if="!disc.aberta"
          class="disciplina-collapsed card"
          @click="disc.aberta = true"
        >
          <span class="disc-nome">{{ disc.nome }}</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>

        <!-- Accordion aberto -->
        <div v-else class="disciplina-expanded card">
          <div class="disc-header" @click="disc.aberta = false">
            <span class="disc-nome">{{ disc.nome }}</span>
            <i class="fa-solid fa-chevron-up"></i>
          </div>
          <div class="disc-body">
            <div class="notas-col">
              <div class="col-label">Notas:</div>
              <div v-for="nota in disc.notas" :key="nota.label" class="nota-row">
                <span>{{ nota.label }}:</span>
                <span>{{ nota.valor ?? '–' }}</span>
              </div>
              <div class="media-row">Média Parcial: <strong>{{ disc.mediaParcial }}</strong></div>
            </div>
            <div class="faltas-col">
              <div class="col-label">Faltas:</div>
              <div class="freq-circle-wrapper">
                <svg viewBox="0 0 80 80" class="freq-svg">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#e0e0e0" stroke-width="7"/>
                  <circle
                    cx="40" cy="40" r="32"
                    fill="none"
                    :stroke="disc.freqColor"
                    stroke-width="7"
                    stroke-linecap="round"
                    stroke-dasharray="201"
                    :stroke-dashoffset="201 - (disc.frequencia / 100) * 201"
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                <div class="freq-label">
                  <div class="freq-pct">{{ disc.frequencia }}%</div>
                  <div class="freq-status">{{ disc.freqStatus }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="disc.alerta" class="alerta-badge">{{ disc.alerta }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useAuth } from '../../composables/useAuth.js'
import { useTurmas } from '../../composables/useTurmas.js'
import { useNotas } from '../../composables/useNotas.js'
import { useFrequencia } from '../../composables/useFrequencia.js'
import PageHeader from '../../components/PageHeader.vue'

const { userName } = useAuth()
const { turmas } = useTurmas()
const { getNotasFormatadas, getMediaParcial, getMediaNumerica } = useNotas()
const { getPorcentagemFrequencia, getStatusFrequencia } = useFrequencia()

const disciplinasAluno = reactive(
  turmas.value.map(t => {
    const notas = getNotasFormatadas(t.id, userName.value)
    const media = getMediaParcial(t.id, userName.value)
    const mediaNum = getMediaNumerica(t.id, userName.value)
    const freq = getPorcentagemFrequencia(t.id, userName.value)
    const freqStatus = getStatusFrequencia(freq)
    const alerta = mediaNum > 0 && mediaNum < 6.0 ? 'Risco de Recuperação' : null

    return {
      id: t.id,
      nome: t.nome,
      aberta: false,
      notas,
      mediaParcial: media,
      frequencia: freq,
      freqColor: freqStatus.color,
      freqStatus: freqStatus.status,
      alerta,
    }
  })
)
</script>

<style scoped>
.disciplinas-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.disciplina-collapsed {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  cursor: pointer;
}

.disc-nome {
  font-weight: 600;
  font-size: 15px;
}

.disciplina-expanded {
  padding: 16px 18px;
}

.disc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 16px;
}

.disc-body {
  display: flex;
  gap: 16px;
}

.notas-col {
  flex: 1;
}

.faltas-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.col-label {
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
}

.nota-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 2px 0;
}

.media-row {
  font-size: 13px;
  margin-top: 8px;
  border-top: 1px solid var(--color-border);
  padding-top: 6px;
}

.freq-circle-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
}

.freq-svg {
  width: 80px;
  height: 80px;
}

.freq-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 1.2;
}

.freq-pct {
  font-size: 15px;
  font-weight: 800;
}

.freq-status {
  font-size: 8px;
  font-weight: 600;
  color: var(--color-text-muted);
}

.alerta-badge {
  margin-top: 14px;
  background: #ef4444;
  color: white;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 700;
  display: inline-block;
  border: 2px solid #b91c1c;
}
</style>
