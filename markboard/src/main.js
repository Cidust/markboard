
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'

const pinia = createPinia()
const app = createApp(App)

app.use(VueAxios, axios);
app.use(pinia)
app.use(ElementPlus);
app.use(router);

app.mount('#app')
