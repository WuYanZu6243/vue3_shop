// 添加用户功能的hook模块
import { ref,Ref,reactive, onMounted, onBeforeUnmount } from "vue";
import useUsersPinia from '../../store/users' 
import {addUserHttp} from '../../http/users'
import { ElMessage,ElMessageBox,FormInstance, FormRules } from 'element-plus'

const usersPinia = useUsersPinia()

export default function() {
    // 控制添加用户对话框的出现和隐藏
    const dialogVisible = ref(false)
    // 添加用户表单数据
    const addUserForm = reactive({
        username:'',
        password:'',
        email:'',
        mobile:''
    })
    // 点击添加用户按钮:重置表单，展示对话框
    const onAddUserBtn = (formEl: FormInstance | undefined)=>{
        // 重置表单
        resetForm(formEl)
        // 展示对话框
        dialogVisible.value = true
    }
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
    // 重置添加用户表单
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }
    // 提交添加用户表单：验证表单是否通过，发送请求去添加用户，关闭对话框
    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate(async(valid, fields) => {
            // 验证不通过
            if(!valid) return
            // 验证通过
            // 发送请求
            const res = await addUserHttp(addUserForm)
            // 请求失败
            if(res.meta.status !== 201) return ElMessage.error('添加失败')
            // 请求成功
            ElMessage.success('添加成功')
            // 重新获取列表数据
            usersPinia.getUserList()
            // 关闭对话框
            dialogVisible.value = false
        })
    }
    // 返回值
    return {
        dialogVisible,
        addUserForm,
        handleClose,
        onAddUserBtn,
        resetForm,
        submitForm
    }
}