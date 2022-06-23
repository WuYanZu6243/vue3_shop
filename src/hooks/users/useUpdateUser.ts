// 修改用户信息功能的hook模块
import { ref,reactive, onMounted, onBeforeUnmount } from "vue"
import useUsersPinia from '../../store/users' 
import { getUserByIdHttp,updataUserHttp } from '../../http/users'
import { ElMessage,ElMessageBox,FormInstance } from 'element-plus'

const usersPinia = useUsersPinia()

export default function() {
    // 控制修改用户对话框的出现与隐藏
    const dialogVisible = ref(false)
    // 修改用户表单
    const updateUserForm = reactive({
        id:0,
        username : '',
        email:'' as string | null,
        mobile:'' as string | null
    })
    // 添加用户对话框关闭前的回调
    const handleClose = (done: () => void) => {
        ElMessageBox.confirm(
            '您编辑的内容还没提交，是否继续退出？',
            '提示',
            {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            }
        ).then(() => {
            done()
        }).catch(() => {
            // catch error
        })
    }
    // 点击修改用户信息的按钮：重置表单,清空上一次的记录;根据id获取用户信息,将用户信息整合到对话框的表单中，展示对话框
    const onUpdataUserBtn = async(id:number,formEl: FormInstance | undefined)=>{
        // 重置表单,清空上一次的记录
        resetForm(formEl)
        // 根据id获取用户信息
        const res = await getUserByIdHttp(id)
        // 请求失败
        if(res.meta.status !== 200) return ElMessage.error('获取用户信息失败')
        // 请求成功
        // 将用户信息整合到对话框的表单中
        updateUserForm.id = res.data.id
        updateUserForm.username = res.data.username
        updateUserForm.email = res.data.email
        updateUserForm.mobile = res.data.mobile
        // 展示对话框
        dialogVisible.value = true
    }
    // 重置修改用户表单
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }
    // 提交添加用户表单：验证表单是否通过，发送请求去添加用户，关闭对话框,重新获取用户列表数据
    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate(async(valid, fields) => {
            // 验证不通过
            if(!valid) return
            // 验证通过
            // 发送修改用户信息请求
            const res = await updataUserHttp(updateUserForm.id,{
                email:updateUserForm.email,
                mobile:updateUserForm.mobile
            })
            // 请求失败
            if(res.meta.status !== 200) return ElMessage.error('更新失败')
            // 请求成功
            ElMessage.success('更新成功')
            // 关闭对话框
            dialogVisible.value = false
            // 重新获取用户列表数据
            usersPinia.getUserList()
        })
    }

    // 返回值
    return {
        dialogVisible,
        updateUserForm,
        handleClose,
        onUpdataUserBtn,
        resetForm,
        submitForm
    }
}