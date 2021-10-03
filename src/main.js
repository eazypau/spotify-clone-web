import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import { store } from './store/store.js'
import './index.css'
import ('../node_modules/bootstrap-icons/font/bootstrap-icons.css')

createApp(App).use(router).use(store).mount('#app')
