<template>
  <div class="page-content">
    <PageHeader :name="userName" />
    <h1 class="page-title">Gerenciar Avisos</h1>

    <!-- Formulário Novo Aviso -->
    <div class="card form-card">
      <div class="form-title">📢 Novo Aviso</div>
      <div class="form-group">
        <label>Disciplina (opcional):</label>
        <select v-model="form.disciplina" class="form-select">
          <option value="">Geral (todas as disciplinas)</option>
          <option v-for="t in turmas" :key="t.id" :value="t.nome">{{ t.nome }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Título:</label>
        <input v-model="form.nome" type="text" placeholder="Título do aviso" class="form-input" />
      </div>
      <div class="form-group">
        <label>Mensagem:</label>
        <textarea v-model="form.corpo" rows="3" placeholder="Digite a mensagem..." class="form-textarea"></textarea>
      </div>
      <div class="form-row">
        <label class="checkbox-label">
          <input type="checkbox" v-model="form.urgente" />
          <span class="urgente-badge">URGENTE</span>
        </label>
        <select v-model="form.color" class="color-select">
          <option value="#f97316">🟠 Laranja</option>
          <option value="#22c55e">🟢 Verde</option>
          <option value="#ef4444">🔴 Vermelho</option>
          <option value="#1a1adb">🔵 Azul</option>
        </select>
      </div>
      <button class="btn-publicar" @click="publicar">
        <i class="fa-solid fa-bullhorn"></i> PUBLICAR AVISO
      </button>
      <p v-if="erro" class="erro">{{ erro }}</p>
    </div>

    <!-- Avisos Publicados -->
    <div class="section-title" style="margin-top: 28px;">AVISOS PUBLICADOS</div>
    <div class="avisos-list">
      <div
        v-for="aviso in avisos"
        :key="aviso.id"
        class="aviso-card card"
        :style="{ borderLeftColor: aviso.color }"
      >
        <div class="aviso-header">
          <div>
            <div v-if="aviso.disciplina" class="aviso-disc">{{ aviso.disciplina }}</div>
            <div class="aviso-nome">{{ aviso.nome }}</div>
          </div>
          <button class="btn-delete" @click="removerAviso(aviso.id)">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        <p class="aviso-corpo">{{ aviso.corpo }}</p>
        <div class="aviso-footer">
          <span v-if="aviso.urgente" class="urgente-tag">URGENTE</span>
          <span class="aviso-data">{{ formatarData(aviso.data) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuth } from '../../composables/useAuth.js'
import { useTurmas } from '../../composables/useTurmas.js'
import { useAvisos } from '../../composables/useAvisos.js'
import PageHeader from '../../components/PageHeader.vue'

const { userName } = useAuth()
const { turmas } = useTurmas()
const { avisos, adicionarAviso, removerAviso } = useAvisos()

const erro = ref('')
const form = reactive({
  disciplina: '',
  nome: '',
  corpo: '',
  urgente: false,
  color: '#f97316',
})

function publicar() {
  if (!form.nome.trim() || !form.corpo.trim()) {
    erro.value = 'Preencha o título e a mensagem.'
    return
  }
  erro.value = ''
  adicionarAviso({
    disciplina: form.disciplina || null,
    nome: form.nome.trim(),
    corpo: form.corpo.trim(),
    urgente: form.urgente,
    color: form.color,
  })
  // Limpar form
  form.nome = ''
  form.corpo = ''
  form.urgente = false
  form.disciplina = ''
  form.color = '#f97316'
}

function formatarData(data) {
  if (!data) return ''
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}
</script>

<style scoped>
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

.form-input, .form-select, .form-textarea {
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

.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: var(--color-primary);
}

.form-textarea {
  resize: vertical;
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.urgente-badge {
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
}

.color-select {
  padding: 6px 10px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-family: var(--font);
}

.btn-publicar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: var(--color-accent-orange);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font);
  transition: background 0.2s;
}

.btn-publicar:hover {
  background: #ea580c;
}

.erro {
  color: var(--color-accent-red);
  font-size: 13px;
  text-align: center;
  margin-top: 8px;
}

.section-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--color-text);
  margin-bottom: 12px;
}

.avisos-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.aviso-card {
  border-left: 4px solid #ccc;
  padding: 14px 16px;
}

.aviso-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
}

.aviso-disc {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-bottom: 2px;
}

.aviso-nome {
  font-size: 15px;
  font-weight: 700;
}

.aviso-corpo {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-bottom: 10px;
}

.aviso-footer {
  display: flex;
  align-items: center;
  gap: 10px;
}

.urgente-tag {
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 12px;
}

.aviso-data {
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
  opacity: 0.7;
  transition: opacity 0.15s;
}

.btn-delete:hover {
  opacity: 1;
}
</style>
