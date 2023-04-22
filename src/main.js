import { createApp } from 'vue'
import App from './App.vue'
import store from './vuexStore/store'
import router from './router/router'
import './assets/styles/styles.scss'
import axios from 'axios'
import VueTheMask from 'vue-the-mask'
import { vfmPlugin } from 'vue-final-modal'
import Vue3MobileDetection from "vue3-mobile-detection"
import Notifications from '@kyvg/vue3-notification'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import easySpinner from 'vue-easy-spinner'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueTheMask)
app.use(vfmPlugin)
app.use(Vue3MobileDetection)
app.use(Notifications)
app.use(autoAnimatePlugin)
app.use(easySpinner, {
    prefix: 'easy',
})
app.mount('#app')

app.config.globalProperties.$http = axios
const token = localStorage.getItem('token')
if (token) {
    app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}