// 封装菜单请求相关方法

// 导入封装好的axios实例
import http from './index'

// 获取左侧菜单权限列表
// 方法返回值类型
export interface menusHttpDataType{
    "id": number,
    "authName": string,
    "path": string,
    "icon"?:string,
    "children": {
        "id": number,
        "authName": string,
        "path": string,
        "children":{
            "id": number,
            "authName": string,
            "path": string,
        }[]
    }[]
}
interface menusHttpType{
    data:menusHttpDataType[],
    meta:{
        "msg": string,
        "status": number
    }
}
export const menusHttp = ():Promise<menusHttpType>=>http.get('menus')