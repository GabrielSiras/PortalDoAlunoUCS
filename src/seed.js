/**
 * Bootstrap: semeia o localStorage com dados iniciais ANTES de qualquer
 * composable ou view ser carregado. Isso garante que os dados exibidos
 * sempre reflitam o que está em dadosIniciais.js.
 */
import { inicializarDados } from './data/dadosIniciais.js'

inicializarDados()
