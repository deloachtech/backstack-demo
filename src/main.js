
import './assets/css/styles.scss'
import './assets/css/theme.css'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router.js'
import {setupAxios} from './axios.js'

setupAxios();

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
