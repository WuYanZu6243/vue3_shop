<template>
    <!-- 面包屑导航 -->
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
        <!-- 搜索和添加按钮 -->
        <div class="searchAndAdd">
            <!-- 搜索框 -->
            <el-input
            v-model="usersPinia.info.query"
            placeholder="请输入用户名..."
            :suffix-icon="Search"
            @input="showUsers.searchUser"
            />
            <!-- 添加按钮 -->
            <el-button type="primary" @click="addUser.onAddUserBtn(addUserFormRef)">添加用户</el-button>
        </div>
        <!-- 用户列表 -->
        <el-table :data="usersPinia.userList" border style="width: 100%">
            <el-table-column type="index" label="#"/>
            <el-table-column prop="id" label="id值" />
            <el-table-column prop="username" label="用户名"/>
            <el-table-column prop="mobile" label="电话"/>
            <el-table-column prop="role_name" label="角色"/>
            <!-- 用户状态 -->
            <el-table-column label="状态">
                <template #default="scope">
                    <el-switch v-model="scope.row.mg_state" @change="showUsers.updataUserState(scope.row.id,scope.row.mg_state)"/>
                </template>
            </el-table-column>
            <!-- 操作按钮 -->
            <el-table-column label="操作" :width="200">
                <template #default="scope">
                    <!-- 修改按钮 -->
                    <el-button type="primary" :icon="EditPen" size="small" @click="updateUser.onUpdataUserBtn(scope.row.id,updateUserForm)"/>
                    <!-- 删除按钮 -->
                    <el-button type="danger" :icon="Delete" size="small" @click="removeUser.onRemoveUserBtn(scope.row.id)"/>
                    <!-- 分配权限按钮 -->
                    <el-tooltip content="分配角色" placement="bottom" effect="light" :enterable="false">
                        <el-button type="warning" :icon="Key" size="small"/>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页功能 -->
        <el-pagination
        v-model:currentPage="usersPinia.info.pagenum"
        v-model:page-size="usersPinia.info.pagesize"
        :page-sizes="[5,10,15,20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersPinia.total"
        @size-change="usersPinia.getUserList"
        @current-change="usersPinia.getUserList"
        />
        <!-- 添加用户对话框 -->
        <el-dialog
        v-model="addUser.dialogVisible.value"
        title="添加用户"
        width="40%"
        :before-close="addUser.handleClose"
        >
            <!-- 添加用户表单 -->
            <el-form
            ref="addUserFormRef"
            :model="addUser.addUserForm"
            :rules="formRules"
            label-width="120px"
            >
                <!-- 用户名 -->
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addUser.addUserForm.username" />
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addUser.addUserForm.password" />
                </el-form-item>
                <!-- 邮件 -->
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="addUser.addUserForm.email" />
                </el-form-item>
                <!-- 手机号 -->
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="addUser.addUserForm.mobile" />
                </el-form-item>
            </el-form>
            <!-- 添加用户按钮 -->
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="addUser.submitForm(addUserFormRef)">添加</el-button>
                    <el-button type="info" @click="addUser.resetForm(addUserFormRef)">重置</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 修改用户对话框 -->
        <el-dialog
        v-model="updateUser.dialogVisible.value"
        title="修改"
        width="40%"
        :before-close="updateUser.handleClose"
        >
            <!-- 修改用户表单 -->
            <el-form
            ref="updateUserForm"
            :model="updateUser.updateUserForm"
            :rules="formRules"
            label-width="120px"
            >
                <!-- 用户名 -->
                <el-form-item label="用户名">
                    <el-input :value="updateUser.updateUserForm.username"  disabled/>
                </el-form-item>
                <!-- 邮件 -->
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="updateUser.updateUserForm.email" />
                </el-form-item>
                <!-- 手机号 -->
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="updateUser.updateUserForm.mobile" />
                </el-form-item>
            </el-form>
            <!-- 添加用户按钮 -->
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="updateUser.submitForm(updateUserForm)">修改</el-button>
                    <el-button type="info" @click="updateUser.resetForm(updateUserForm)">重置</el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<script lang="ts" setup>
    import {ref,reactive,Ref} from 'vue'
    import { ArrowRight,Search,EditPen,Delete,Key } from '@element-plus/icons-vue'
    import useShowUsers from '../hooks/users/useShowUsers'
    import useAddUser from '../hooks/users/useAddUser'
    import useUsersPinia from '../store/users'
    import { FormInstance,FormRules } from 'element-plus'
    import useRemoveUser from '../hooks/users/useRemoveUser'
    import useUpdateUser from '../hooks/users/useUpdateUser'

    // 用户pinia
    const usersPinia = useUsersPinia()

    // 自定义邮箱的验证规则
    const emailPass = (rule: any, value: any, callback: any) => {
        // 验证邮箱的正则表达式
        var emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!emailRegExp.test(value)) {
          callback(new Error('邮箱地址格式不正确'))
        } else {
          callback()
        }
    }
    // 自定义手机号的验证规则
    const mobilePass = (rule: any, value: any, callback: any) => {
        // 手机号的正则表达式
        var mobileRegExp = /^[1][3-8]+\d{9}$/
        if (!mobileRegExp.test(value)) {
          callback(new Error('手机号码格式不正确'))
        } else {
          callback()
        }
    }
    // 表单验证规则
    const formRules = reactive<FormRules>({
        username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 1, max: 10, message: '用户名长度为1~12', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, max: 15, message: '用户名长度为6~20', trigger: 'blur' },
        ],
        email: [
            { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
            { validator: emailPass, trigger: 'blur' }
        ],
        mobile: [
            { required: true, message: '手机号码不能为空', trigger: 'blur' },
            { validator: mobilePass, trigger: 'blur' }
        ]
    })

    // 展示用户列表hook
    const showUsers = useShowUsers()

    // 添加用户hook
    const addUser = useAddUser()
    // 获取添加的输入用户表单
    const addUserFormRef = ref<FormInstance>()

    // 删除用户hook
    const removeUser = useRemoveUser()

    // 修改用户hook
    const updateUser = useUpdateUser()
    // 获取修改用户信息的表单
    const updateUserForm = ref<FormInstance>()

</script>

<style lang="scss" scoped>
    // 面包屑导航
    .el-breadcrumb{
        margin-bottom: 15px;
    }
    // 搜索和添加按钮
    .searchAndAdd{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .el-input{
            width: 30%;
        }
    }
    // 用户列表
    .el-table{
        margin-bottom: 10px;
    }
</style>
