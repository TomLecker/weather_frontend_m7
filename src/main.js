import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { vuetify } from './plugins/vuetify'

import '../Sass/main.scss'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { useAuthStore } from "./stores/authStore"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(vuetify)

async function iniciarApp() {

  const auth = useAuthStore()

  // esperar a que Firebase detecte sesión
  await auth.initAuth()

  app.use(router)

  app.mount('#app')
}

iniciarApp()