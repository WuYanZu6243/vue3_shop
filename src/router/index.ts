// 导入vue-router包的一些方法
import {createRouter,createWebHashHistory,RouteRecordRaw} from 'vue-router'

// 定义路由
const routes:RouteRecordRaw[] = [

]

// 创建路由器
const router = createRouter({
    // 路由模式
    history:createWebHashHistory(),
    // 路由
    routes
})

// 导出路由器
export default router

