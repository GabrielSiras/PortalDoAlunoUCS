import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/global.css'
import { inicializarDados } from './data/dadosIniciais.js'

inicializarDados()
createApp(App).use(router).mount('#app')
