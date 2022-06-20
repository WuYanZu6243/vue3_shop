// 封装登录请求相关方法

// 导入封装好的axios实例
import http from './index'

// 登录并返回token的请求方法
// 请求参数类型
export interface loginHttpInfoType{
    username: string;
    password: string;
}
// 方法返回值类型
interface loginHttpType{
    data:{
        "id": number,
        "rid": number,
        "username": string,
        "mobile": string,
        "email": string,
        "token": string
    },
    meta:{
        "msg": string,
        "status": number
    }
}
export const loginHttp = (data:loginHttpInfoType):Promise<loginHttpType>=>http.post('login',data)
