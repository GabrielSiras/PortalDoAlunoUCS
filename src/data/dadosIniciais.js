/**
 * Dados iniciais (seed) para popular o localStorage na primeira execução.
 * Após a primeira carga, o localStorage é a fonte de verdade.
 */

export const ALUNO_NOME = 'Gabriel'
export const ALUNO_COMPLETO = 'Gabriel Sironi da Luz'
export const PROFESSOR_NOME = 'Profª. Ana'
export const PROFESSOR_COMPLETO = 'Profª. Ana Silva'

export const turmas = [
  {
    id: 1,
    nome: 'IHC — Interface Humano Computador',
    bloco: '71',
    sala: '307',
    horario: 'Quinta-feira, 19:40',
    diaSemana: 'Quinta',
    alunos: [
      'Gabriel Sironi da Luz',
      'João Miguel Santos',
      'Maria Clara Oliveira',
      'Pedro Henrique Lima',
      'Ana Julia Costa',
    ],
    avaliacoes: ['Prova 1', 'Prova 2', 'Trabalho Final'],
  },
  {
    id: 2,
    nome: 'Banco de Dados I',
    bloco: '71',
    sala: '203',
    horario: 'Sexta-feira, 19:40',
    diaSemana: 'Sexta',
    alunos: [
      'Gabriel Sironi da Luz',
      'João Miguel Santos',
      'Maria Clara Oliveira',
      'Lucas Eduardo Pereira',
    ],
    avaliacoes: ['Prova 1', 'Prova 2', 'Trabalho Final'],
  },
  {
    id: 3,
    nome: 'Programação Orientada a Objetos',
    bloco: '71',
    sala: '405',
    horario: 'Quinta-feira, 21:30',
    diaSemana: 'Quinta',
    alunos: [
      'Gabriel Sironi da Luz',
      'Pedro Henrique Lima',
      'Ana Julia Costa',
      'Lucas Eduardo Pereira',
      'Maria Clara Oliveira',
    ],
    avaliacoes: ['Prova 1', 'Prova 2', 'Trabalho Final'],
  },
]

export const notasIniciais = {
  1: [
    { aluno: 'Gabriel Sironi da Luz', notas: { 'Prova 1': 8.5, 'Prova 2': 7.0, 'Trabalho Final': null } },
    { aluno: 'João Miguel Santos', notas: { 'Prova 1': 6.0, 'Prova 2': 7.5, 'Trabalho Final': null } },
    { aluno: 'Maria Clara Oliveira', notas: { 'Prova 1': 9.0, 'Prova 2': 8.5, 'Trabalho Final': null } },
    { aluno: 'Pedro Henrique Lima', notas: { 'Prova 1': 5.5, 'Prova 2': 6.0, 'Trabalho Final': null } },
    { aluno: 'Ana Julia Costa', notas: { 'Prova 1': 7.0, 'Prova 2': 8.0, 'Trabalho Final': null } },
  ],
  2: [
    { aluno: 'Gabriel Sironi da Luz', notas: { 'Prova 1': 6.0, 'Prova 2': 7.5, 'Trabalho Final': null } },
    { aluno: 'João Miguel Santos', notas: { 'Prova 1': 8.0, 'Prova 2': 6.5, 'Trabalho Final': null } },
    { aluno: 'Maria Clara Oliveira', notas: { 'Prova 1': 7.5, 'Prova 2': 9.0, 'Trabalho Final': null } },
    { aluno: 'Lucas Eduardo Pereira', notas: { 'Prova 1': 4.0, 'Prova 2': 5.5, 'Trabalho Final': null } },
  ],
  3: [
    { aluno: 'Gabriel Sironi da Luz', notas: { 'Prova 1': 7.5, 'Prova 2': 8.0, 'Trabalho Final': null } },
    { aluno: 'Pedro Henrique Lima', notas: { 'Prova 1': 6.5, 'Prova 2': 7.0, 'Trabalho Final': null } },
    { aluno: 'Ana Julia Costa', notas: { 'Prova 1': 9.0, 'Prova 2': 8.5, 'Trabalho Final': null } },
    { aluno: 'Lucas Eduardo Pereira', notas: { 'Prova 1': 5.0, 'Prova 2': 6.5, 'Trabalho Final': null } },
    { aluno: 'Maria Clara Oliveira', notas: { 'Prova 1': 8.0, 'Prova 2': 7.5, 'Trabalho Final': null } },
  ],
}

export const frequenciaInicial = {
  1: [
    { data: '2026-06-25', presentes: ['Gabriel Sironi da Luz', 'João Miguel Santos', 'Maria Clara Oliveira', 'Pedro Henrique Lima', 'Ana Julia Costa'] },
    { data: '2026-06-18', presentes: ['Gabriel Sironi da Luz', 'Maria Clara Oliveira', 'Pedro Henrique Lima', 'Ana Julia Costa'] },
    { data: '2026-06-11', presentes: ['Gabriel Sironi da Luz', 'João Miguel Santos', 'Maria Clara Oliveira', 'Pedro Henrique Lima'] },
    { data: '2026-06-04', presentes: ['Gabriel Sironi da Luz', 'João Miguel Santos', 'Maria Clara Oliveira', 'Pedro Henrique Lima', 'Ana Julia Costa'] },
  ],
  2: [
    { data: '2026-06-26', presentes: ['Gabriel Sironi da Luz', 'João Miguel Santos', 'Maria Clara Oliveira', 'Lucas Eduardo Pereira'] },
    { data: '2026-06-19', presentes: ['Gabriel Sironi da Luz', 'Maria Clara Oliveira', 'Lucas Eduardo Pereira'] },
    { data: '2026-06-12', presentes: ['Gabriel Sironi da Luz', 'João Miguel Santos', 'Maria Clara Oliveira'] },
    { data: '2026-06-05', presentes: ['Gabriel Sironi da Luz', 'João Miguel Santos', 'Maria Clara Oliveira', 'Lucas Eduardo Pereira'] },
  ],
  3: [
    { data: '2026-06-25', presentes: ['Gabriel Sironi da Luz', 'Pedro Henrique Lima', 'Ana Julia Costa', 'Lucas Eduardo Pereira', 'Maria Clara Oliveira'] },
    { data: '2026-06-18', presentes: ['Gabriel Sironi da Luz', 'Pedro Henrique Lima', 'Ana Julia Costa', 'Maria Clara Oliveira'] },
    { data: '2026-06-11', presentes: ['Gabriel Sironi da Luz', 'Pedro Henrique Lima', 'Lucas Eduardo Pereira'] },
    { data: '2026-06-04', presentes: ['Gabriel Sironi da Luz', 'Pedro Henrique Lima', 'Ana Julia Costa', 'Lucas Eduardo Pereira', 'Maria Clara Oliveira'] },
  ],
}

export const avisosIniciais = [
  {
    id: 1,
    disciplina: null,
    nome: 'Aviso de Feriado – 01/05',
    corpo: 'Prezados alunos!\nInformamos que a faculdade estará fechada por causa do Feriado dos Trabalhadores!',
    color: '#ef4444',
    urgente: true,
    data: '2026-04-28',
  },
  {
    id: 2,
    disciplina: 'IHC — Interface Humano Computador',
    nome: 'Trabalho Adiado',
    corpo: 'Prezados alunos!\nInformo que a apresentação do trabalho foi adiada para a aula de 06/05.',
    color: '#f97316',
    urgente: false,
    data: '2026-04-30',
  },
  {
    id: 3,
    disciplina: 'Banco de Dados I',
    nome: 'Cancelamento de Aula',
    corpo: 'Prezados alunos!\nVenho a informar que a aula de hoje irá ser cancelada, pelos motivos citados na última aula.',
    color: '#22c55e',
    urgente: false,
    data: '2026-05-02',
  },
]

export const eventosIniciais = [
  { id: 1, diaSemana: 'Qua', diaNum: '06', mesNome: 'Maio', dia: 6, mes: 4, nome: 'IHC – Apresentação do trabalho – 19:40', local: '(Bloco 71, Sala 307)', color: '#f97316', turmaId: 1 },
  { id: 2, diaSemana: 'Sex', diaNum: '08', mesNome: 'Maio', dia: 8, mes: 4, nome: 'Banco de Dados I – Trabalho Final', local: '(Bloco 71, Sala 203)', color: '#22c55e', turmaId: 2 },
  { id: 3, diaSemana: 'Qui', diaNum: '29', mesNome: 'Junho', dia: 29, mes: 5, nome: 'IHC – Aula Normal – 19:40', local: '(Bloco 71, Sala 307)', color: '#1a1adb', turmaId: 1 },
  { id: 4, diaSemana: 'Qui', diaNum: '29', mesNome: 'Junho', dia: 29, mes: 5, nome: 'POO – Aula Normal – 21:30', local: '(Bloco 71, Sala 405)', color: '#1a1adb', turmaId: 3 },
]

export const boletosIniciais = {
  abertos: [
    { id: 1, data: '04/07/26', valor: '1000' },
  ],
  pagos: [
    { id: 1, data: '04/01/26', valor: '1000' },
    { id: 2, data: '06/02/26', valor: '1000' },
    { id: 3, data: '05/03/26', valor: '1000' },
    { id: 4, data: '07/04/26', valor: '1000' },
    { id: 5, data: '04/05/26', valor: '1000' },
  ],
}

/**
 * Inicializa o localStorage com dados padrão caso ainda não existam.
 */
export function inicializarDados() {
  if (!localStorage.getItem('ucs_turmas')) {
    localStorage.setItem('ucs_turmas', JSON.stringify(turmas))
  }
  if (!localStorage.getItem('ucs_notas')) {
    localStorage.setItem('ucs_notas', JSON.stringify(notasIniciais))
  }
  if (!localStorage.getItem('ucs_frequencia')) {
    localStorage.setItem('ucs_frequencia', JSON.stringify(frequenciaInicial))
  }
  if (!localStorage.getItem('ucs_avisos')) {
    localStorage.setItem('ucs_avisos', JSON.stringify(avisosIniciais))
  }
  if (!localStorage.getItem('ucs_boletos')) {
    localStorage.setItem('ucs_boletos', JSON.stringify(boletosIniciais))
  }
  if (!localStorage.getItem('ucs_eventos')) {
    localStorage.setItem('ucs_eventos', JSON.stringify(eventosIniciais))
  }
}
