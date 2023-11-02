// import { createApp } from 'vue-demi'
import { createApp } from 'vue'
import pinia from './stores'
import router from './router'
import App from './App.vue'
import firebase from './firebase'
import MessageBox from '@/components/Message-Box.vue'
const app = createApp(App)
app.component('MessageBox', MessageBox)
app.use(firebase)
app.use(router)
app.use(pinia)
app.mount('#app')
