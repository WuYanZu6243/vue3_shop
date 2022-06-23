// 存放权限列表功能用到的类型文件

// 请求状态和描述类型
interface metaType{
    msg:string,
    status:number
}

// 权限列表的类型
export interface rightListType{
    authName: string
    id: number
    level: string
    path: string
    pid: number
}

// 获取list权限列表api的返回值类型
export interface getRightListReturnType{
    data:rightListType[]
    meta:metaType
}