// 导入axios包
import axios from 'axios'

// 创建axios实例
const http = axios.create({
    baseURL:'http://182.61.30.46:8889/api/private/v1/',
    timeout:15000
})

// 请求拦截器
http.interceptors.request.use(cofig=>{
    // 获取浏览器缓存中的token
    const token = window.sessionStorage.getItem('token')
    // 有token:为请求头添加上
    if(token){
        // 如果请求头信息为undefined时,赋予一个空对象
        cofig.headers = cofig.headers || {}
        cofig.headers['Authorization'] = token
    }
    return cofig
},err=>{
    return Promise.reject(err)
})

// 响应拦截器
http.interceptors.response.use(result=>{
    return result.data
},err=>{
    return Promise.reject(err)
})

// 导出axios实例
export default http