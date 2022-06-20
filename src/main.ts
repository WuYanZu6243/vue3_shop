import { createApp } from 'vue'
import App from './App.vue'
// 导入路由器
import router from './router/index'

createApp(App).use(router).mount('#app')
