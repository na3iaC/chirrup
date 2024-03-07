

import { createApp } from 'vue'
import App from './views/App.vue'
import router from "./router"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css';

createApp(App).use(router).mount('#app')
