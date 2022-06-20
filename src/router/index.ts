// 导入vue-router包的一些方法
import {createRouter,createWebHashHistory,RouteRecordRaw} from 'vue-router'

// 定义路由
const routes:RouteRecordRaw[] = [
    // 根路径,跳转到登录路由
    {
        path:'/',
        redirect:'/login'
    },
    // 登录路由
    {
        name:'login',
        path:'/login',
        component:()=>import('../pages/Login.vue')
    },
    // 首页路由
    {
        name:'home',
        path:'/home',
        component:()=>import('../pages/Home.vue'),
        children:[
            // 用户路由
            {
                name:'users',
                path:'users',
                component:()=>import('../pages/Users.vue')
            },
            // 角色列表路由
            {
                name:'roles',
                path:'roles',
                component:()=>import('../pages/Roles.vue')
            },
            // 权限列表路由
            {
                name:'rights',
                path:'rights',
                component:()=>import('../pages/Rights.vue')
            },
            // 商品列表路由
            {
                name:'goods',
                path:'goods',
                component:()=>import('../pages/Goods.vue')
            },
            // 分类参数路由
            {
                name:'params',
                path:'params',
                component:()=>import('../pages/Params.vue')
            },
            // 商品分类路由
            {
                name:'categories',
                path:'categories',
                component:()=>import('../pages/Categories.vue')
            },
            // 订单列表路由
            {
                name:'orders',
                path:'orders',
                component:()=>import('../pages/Orders.vue')
            },
            // 数据报表路由
            {
                name:'reports',
                path:'reports',
                component:()=>import('../pages/Reports.vue')
            },
        ]
    },
    
]

// 创建路由器
const router = createRouter({
    // 路由模式
    history:createWebHashHistory(),
    // 路由
    routes
})

// 前置路由守卫
router.beforeEach((to,from,next)=>{
    // 防止用户未登录就访问其它页面(检测浏览器缓存中有没有token)
    // 如果用户访问的是登录页面，直接放行
    if(to.fullPath === '/login') return next()
    // 用户还没登录，把它重定向回登录页面(token为空)
    const token = window.sessionStorage.getItem('token')
    if(!token) return next('/login')
    // 用户已经登录，放行
    next()
})

// 导出路由器
export default router

