<template>
    <div class="login-container">
        <!-- 登录框 -->
        <div class="login-box">
            <!-- 登录框头部 -->
            <header>
                <h1>登录</h1>
            </header>
            <!-- 登录框内容区 -->
            <main>
                <!-- 登录表单 -->
                <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginRules"
                >
                    <!-- 用户名 -->
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入用户名" />
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" placeholder="请输入密码" />
                    </el-form-item>
                    <!-- 按钮 -->
                    <div class="btns">
                        <el-button type="primary" @click="onLoginBtn(loginFormRef)">登录</el-button>
                        <el-button type="info" @click="onResetBtn(loginFormRef)">重置</el-button>
                    </div>
                </el-form>
            </main>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {ref,reactive} from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import { loginHttp,loginHttpInfoType } from '../http/login'
    import { ElMessage } from 'element-plus'
    import {useRouter} from 'vue-router'

    // 执行useRouter,获取vue-router上的一些方法
    const router = useRouter()

    // 获取到表单
    const loginFormRef = ref<FormInstance>()
    // 表单数据
    const loginForm:loginHttpInfoType = reactive({
        username:'admin',
        password:'123456'
    })
    // 表单验证规则
    const loginRules = reactive<FormRules>({
        username:[
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 1, max: 12, message: '用户名长度为1~12', trigger: 'blur' }
        ],
        password:[
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度为6~20', trigger: 'blur' }
        ]
    })
    // 点击重置按钮，重置表单
    const onResetBtn = (formEl: FormInstance | undefined)=>{
        if (!formEl) return
        formEl.resetFields()
    }
    // 点击发送按钮：检测是否通过验证，发送表单数据到服务器验证用户名和密码
    const onLoginBtn = async (formEl: FormInstance | undefined)=>{
        if (!formEl) return
        // 检测是否通过验证
        await formEl.validate( async (valid, fields) => {
            // 验证不通过
            if(!valid) return 
            // 验证通过:发送请求
            const res = await loginHttp(loginForm)
            // 请求失败
            if(res.meta.status !== 200) return ElMessage.error('用户名或密码错误')
            // 请求成功:
            // 保存token
            window.sessionStorage.setItem('token',res.data.token)
            // 跳转到首页
            router.push('/home')
        })
    }
    
</script>

<style lang="scss" scoped>
.login-container {
    width: 100%;
    height: 100%;
    background: url("http://182.61.30.46:2406/uploads/upload_e2a5f235f53f3aded07d7eb1dae0fe42.png") no-repeat center / 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // 登录框
    .login-box{
        width: 440px;
        background-color: #fff;
        border-radius: 10px;
        // 登录框头部
        header{
            height: 40px;
            background-color: #73767a;
            border-radius: 10px 10px 0 0;
            display: flex;
            align-items: center;
            h1{
                font-size: 20px;
                color: #fff;
                margin-left: 20px;
                font-weight: normal;
            }
        }
        // 登录框内容区
        main{
            padding: 30px;
            .btns{
                text-align: end;
            }
        }
    }
}
</style>
