// 展示用户列表功能的hook模块
import { ref,reactive, onMounted, onBeforeUnmount } from "vue";
import useUsersPinia from '../../store/users' 
import {updataUserStateHttp} from '../../http/users'
import { ElMessage } from 'element-plus'

const usersPinia = useUsersPinia()

export default function() {
    // 搜索用户的防抖节流
    let timer:number|undefined = undefined
    // 搜索用户
    const searchUser = (query:string|number)=>{
        // 清除上一次的浮动
        clearTimeout(timer)
        // 延迟0.8秒再发送请求
        timer = setTimeout(()=>{
            // 去除搜索参数两边的空格
            usersPinia.info.query = usersPinia.info.query.trim()
            // 重新获取列表
            usersPinia.getUserList()
        },800)
    }
    // 修改用户状态
    const updataUserState = async (id:number,type:boolean)=>{
        // 发送请求
        const res = await updataUserStateHttp(id,type)
        if(res.meta.status !== 200){ // 请求失败
            ElMessage.error('设置用户状态失败')
        }else{ // 请求成功
            ElMessage.success('设置用户状态成功')
        }
        // 重新获取用户数据列表
        usersPinia.getUserList()
    }
    // 生命周期函数
    onMounted(()=>{
        // 调用获取用户数据列表
        usersPinia.getUserList()
    })

    return {
        updataUserState,
        searchUser
    }
}