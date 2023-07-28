// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.css'

// fortawesome
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
dom.watch()

createApp(App).mount('#app')