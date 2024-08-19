

import './template/theme.css'
import './template/styles.css'

// Import all of Bootstrap's JS
//import * as bootstrap from 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router.js'
import { setupAxios } from './axios.js'

setupAxios();

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Bootstrap objects requiring javascript will randomly quit working if you don't import the js here again.
//import "bootstrap/dist/js/bootstrap.js";
