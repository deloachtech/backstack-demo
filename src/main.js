
import './assets/css/styles.scss'
import './assets/css/theme.css'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router.js'
import {setupAxios} from './axios.js'
import accessConstants from './configs/access-constants.json'

setupAxios();

const app = createApp(App)

app.use(createPinia())
app.use(router)

/*
 Add the access constants to the global properties. 
 Use this in your components like this: $access.FOO 
 Combine access constants like this: [$access.FOO, $access.BAR].join(';')
 See the router.js file for an example of how to use this.
*/
app.config.globalProperties.$access = accessConstants;

app.mount('#app')

// Bootstrap objects requiring javascript will randomly quit working if you don't import bootstrap.js here again.
import "bootstrap/dist/js/bootstrap.js";
