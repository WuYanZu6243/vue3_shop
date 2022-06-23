// 用户列表数据-pinia容器
import {defineStore} from 'pinia'
import {infoType,usersType} from '../types/users'
import {getUsersHttp} from '../http/users'
import { ElMessage } from 'element-plus'

export default defineStore('users',{
    state:()=>{
        return{
            // 请求参数
            info:{
                query:'',
                pagenum:1,
                pagesize:5
            } as infoType,
            // 用户数据列表
            userList:[] as usersType[],
            // 数据总条数
            total:0,
        }
    },
    getters:{},
    actions:{
        // 获取数据列表
        async getUserList(){
            // 发送请求
            const res = await getUsersHttp({params:this.info})
            // 请求失败
            if(res.meta.status !== 200) return ElMessage.error('获取用户数据失败')
            // 请求成功:赋值
            this.userList = res.data.users
            this.total = res.data.total
        }
    }
})
