import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'

const app = createApp(App)


// Vuetify
const vuetify = createVuetify({
  components,
  directives,
})
app.use(vuetify)

// Firebase
app.use(VueFire, {
  firebaseApp,
  modueles: [VueFireAuth()]
})

app.use(createPinia())
app.use(router)

app.mount('#app')