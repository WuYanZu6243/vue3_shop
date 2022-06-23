// 删除用户功能的hook模块
import { ref,reactive, onMounted, onBeforeUnmount } from "vue"
import useUsersPinia from '../../store/users' 
import { removeUserHttp } from '../../http/users'
import { ElMessage,ElMessageBox } from 'element-plus'

const usersPinia = useUsersPinia()

export default function() {
    // 点击删除按钮，根据id删除用户
    const onRemoveUserBtn = (id:number)=>{
        // 提示是否确定删除
        ElMessageBox.confirm(
            '是否确定删除该用户',
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
        .then(async() => {
            // 确认删除
            // 发送删除用户请求
            const res = await removeUserHttp(id)
            // 请求失败
            if(res.meta.status !== 200) return ElMessage.error('删除失败')
            // 请求成功
            ElMessage.success('删除成功')
            // 重新获取数据列表
            usersPinia.getUserList()
        })
        .catch(() => {
            // 取消删除
        })
    }
    
    // 返回值
    return {
        onRemoveUserBtn
    }
}