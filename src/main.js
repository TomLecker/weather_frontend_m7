import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* Vuetify */
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { vuetify } from './plugins/vuetify'

/* estilos */
import '../Sass/main.scss'

/* Bootstrap (si aún lo usas) */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')