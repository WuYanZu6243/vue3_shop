// 存放用户列表功能用到的类型文件

// 请求参数类型
export interface infoType{
    query:string,
    pagenum:number,
    pagesize:number
}

// 用户列表数据类型
export interface usersType{
    id: number,
    username: string,
    mobile: string,
    type: number,
    email: string,
    create_time: string,
    mg_state: boolean, 
    role_name: string
}

// 请求状态和描述类型
interface metaType{
    msg:string,
    status:number
}

// 获取用户列表api返回值类型
export interface usersReturnType{
    data:{
        total:number,
        pagenum:number,
        users: usersType[]
    },
    meta:metaType
}

// 修改用户状态api返回值类型
export interface  stateReturnType{
    data:usersType,
    meta:metaType
}

// 添加用户api参数的类型
export interface addUserInfoType{
    username: string;
    password: string;
    email: string;
    mobile: string;
}

// 添加用户api返回值的类型
export interface addUserReturnType{
    data:{
        create_time: number
        email: string
        id: number
        mobile: string
        role_id: number
        username: string
    },
    meta:metaType
}

// 删除用户api返回值的类型
export interface removeUserReturnType{
    data:null,
    meta:metaType
}

// 根据id获取用户信息api返回值的类型
export interface getUserByIdReturnType{
    data:{
        email: string,
        id: number,
        mobile: string,
        rid: number,
        username: string
    },
    meta:metaType
}

// 修改用户信息api参数的类型
export interface updataUserInfoType{
    email:string | null,
    mobile:string | null
}

// 修改用户信息api返回值的类型
export interface  updataUserReturnType{
    data:{
        email: string
        id: number
        mobile: string
        role_id: number
        username: string
    },
    meta:metaType
}