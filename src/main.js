import { createApp } from 'vue'
import App from './App.vue'
import store from './vuexStore/store'
import router from './router/router'
import './assets/styles/styles.scss'
import axios from 'axios'
import VueTheMask from 'vue-the-mask'
import { vfmPlugin } from 'vue-final-modal'

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueTheMask);
app.use(vfmPlugin);
app.mount('#app');

app.config.globalProperties.$http = axios;
const token = localStorage.getItem('token');
if (token) {
    app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}