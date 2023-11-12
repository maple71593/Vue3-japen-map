import { createApp } from 'vue'
import pinia from './stores'
import router from './router'
import App from './App.vue'
import firebase from './firebase'
import MessageBox from '@/components/Message-Box.vue'
import Loadingpage from '@/components/Loaing-index.vue'
import loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const app = createApp(App)
app.component('MessageBox', MessageBox)
app.component('Loading-page', Loadingpage)
app.component('loading', loading)
app.use(firebase)
app.use(router)
app.use(pinia)
app.mount('#app')
