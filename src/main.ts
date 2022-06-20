import { createApp } from 'vue'
import App from './App.vue'
// 导入全局样式
import './assets/css/global.css'
// 导入element提示框样式
import 'element-plus/theme-chalk/el-message.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入路由器
import router from './router/index'

createApp(App).use(router).mount('#app')
