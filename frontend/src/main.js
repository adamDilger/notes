import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import wails runtime
import * as Wails from '@wailsapp/runtime';

Wails.Init(() => {
  createApp(App)
    .use(router)
    .mount('#app')
})
