# 🎓 Portal UCS — Aluno & Professor

> **Projeto Final** desenvolvido para a disciplina de **Interface Humano-Computador (IHC)** na Universidade de Caxias do Sul (UCS).

---

## 🎯 Sobre o Projeto

O objetivo deste projeto foi redesenhar o **AVA** da UCS, focando totalmente na experiência do usuário (UX/UI). Criamos uma interface moderna com botões mais legíveis, fluxos diretos e navegação intuitiva.

O portal agora atende **dois perfis** — **Aluno** e **Professor** — com dados compartilhados em tempo real via `localStorage`. O professor pode lançar notas, fazer chamada e publicar avisos que o aluno vê instantaneamente no seu dashboard.

---

## 👥 Perfis e Credenciais de Teste

O login identifica automaticamente se o usuário é aluno ou professor pelo email digitado.

| Perfil | Email | Senha |
|---|---|---|
| 👨‍🎓 **Aluno** | `gsluz3@ucs.br` | `123456` |
| 👩‍🏫 **Professor** | `anasilva@ucs.br` | `123456` |

---

## 📱 Telas

### 👨‍🎓 Aluno (5 telas)

| Tela | Descrição |
|---|---|
| **Home** | Status de aula do dia, acesso rápido (grid 2×2), próximas entregas com checklist |
| **Notas e Faltas** | Accordion por disciplina com notas e círculo de frequência (SVG) |
| **Boletos e Financeiro** | Mensalidades em aberto/pagas com botão "Pagar" |
| **Avisos** | Lista de avisos com filtro por disciplina + badge URGENTE |
| **Calendário** | Visão mensal/semanal com eventos criados pelo professor |

### 👩‍🏫 Professor (7 telas)

| Tela | Descrição |
|---|---|
| **Home** | Aulas do dia + acesso rápido (Turmas, Novo Aviso, Calendário) |
| **Turmas** | Lista de disciplinas com accordion mostrando alunos, acesso a notas e frequência |
| **Lançar Notas** | Tabela editável — cada linha é um aluno, cada coluna uma avaliação |
| **Fazer Chamada** | Toggle Presente/Ausente por aluno para a data selecionada |
| **Gerenciar Avisos** | Formulário para criar avisos + lista com botão de excluir |
| **Calendário** | Visão mensal/semanal + formulário para adicionar/remover eventos |
| **Detalhe da Turma** | Visão resumida de cada aluno (média + frequência) |

---

## 🔄 Fluxo de Dados Interativo

```
Professor lança nota, faz chamada ou publica aviso
         │
         ▼
   localStorage  ←── fonte única de verdade
         │
         ▼
Aluno abre o portal → vê tudo atualizado instantaneamente
```

Nenhum backend necessário — os dados persistem no navegador.

---

## 🛠️ Tecnologias Utilizadas

* 🌐 **HTML5** — Estruturação semântica da página
* 🎨 **CSS3** — Estilização moderna, layout mobile-first (max-width: 480px), custom properties
* ⚡ **Vue 3 (Composition API + `<script setup>`)** — Reatividade e componentização
* 🚦 **Vue Router 4** — Navegação com Hash History, guards de autenticação por perfil
* ⚡ **Vite 5** — Bundler e dev server

---

## 🧰 Recursos e Ferramentas

* 🎨 **Figma** — Criação e validação do protótipo de alta fidelidade
* 🤖 **ClaudeAI / Gemini** — Auxílio na estruturação e lógica do código
* ✨ **FontAwesome 6** — Biblioteca de ícones vetoriais
* 🔤 **Google Fonts (Inter)** — Tipografia do projeto

---

## 📁 Estrutura do Projeto

```
src/
├── assets/
│   ├── global.css              # Design system (cores, tipografia, layout)
│   └── images/logo-ucs.png     # Logo UCS
├── components/
│   ├── BottomNav.vue           # Navegação inferior (adaptável por perfil)
│   └── PageHeader.vue          # Cabeçalho com saudação + logo
├── composables/                # Lógica reutilizável (localStorage)
│   ├── useAuth.js              # Estado de autenticação
│   ├── useAvisos.js            # CRUD de avisos
│   ├── useBoletos.js           # Gestão de boletos
│   ├── useEventos.js           # CRUD de eventos do calendário
│   ├── useFrequencia.js        # Registro de presenças
│   ├── useNotas.js             # Leitura/escrita de notas
│   └── useTurmas.js            # Lista de turmas/disciplinas
├── data/
│   ├── dadosIniciais.js        # Seed data (turmas, notas, frequência, avisos, eventos)
│   └── usuarios.js             # Credenciais dos usuários (aluno + professor)
├── router/
│   └── index.js                # Rotas /aluno/* e /professor/* + guards
├── views/
│   ├── LoginView.vue           # Login com detecção automática de perfil
│   ├── LogoutView.vue          # Confirmação de saída
│   ├── aluno/                  # 5 views do aluno
│   └── professor/              # 7 views do professor
├── App.vue
└── main.js
```

---

## 🚀 Como Rodar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/GabrielSiras/PortalDoAlunoUCS.git
   cd PortalDoAlunoUCS
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Abra o link informado no terminal** (geralmente `http://localhost:5173`) no seu navegador.

5. **Faça login** com uma das credenciais de teste acima.

---

## 🔨 Build de Produção

```bash
npm run build    # gera a pasta dist/
npm run preview  # testa o build localmente
```

---

## 👥 Integrantes

* Gabriel Sironi da Luz — [GitHub](https://github.com/GabrielSiras)
* Bernard Wavrita — [GitHub](https://github.com/Bwavrita)
