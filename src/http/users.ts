// 封装菜单请求相关方法

// 导入封装好的axios实例
import http from './index'
import {AxiosRequestConfig} from 'axios'
import {
    infoType,usersReturnType,stateReturnType,addUserInfoType,addUserReturnType,
    removeUserReturnType,getUserByIdReturnType,updataUserInfoType,updataUserReturnType
} from '../types/users'

// 获取用户列表数据
export const getUsersHttp = (data:AxiosRequestConfig<infoType>):Promise<usersReturnType>=>http.get('users',data)

// 修改用户的状态
export const updataUserStateHttp = (id:number,type:boolean):Promise<stateReturnType>=>http.put(`users/${id}/state/${type}`)

// 添加用户
export const addUserHttp = (data:addUserInfoType):Promise<addUserReturnType>=>http.post('users',data)

// 根据id删除用户
export const removeUserHttp = (id:number):Promise<removeUserReturnType>=>http.delete(`users/${id}`)

// 根据id获取用户信息
export const getUserByIdHttp = (id:number):Promise<getUserByIdReturnType>=>http.get(`users/${id}`)

// 修改用户信息请求
export const updataUserHttp = (id:number,data:updataUserInfoType):Promise<updataUserReturnType>=>http.put(`users/${id}`,data)