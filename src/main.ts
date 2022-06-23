import { createApp } from 'vue'
import App from './App.vue'
// 导入全局样式
import './assets/css/global.css'
// 导入element提示框样式
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入路由器
import router from './router/index'
// 导入pinia
import {createPinia} from 'pinia'
let store = createPinia()

createApp(App).use(router).use(store).mount('#app')
