<template>
<el-container>
        <!-- 头部 -->
        <el-header>
            <!-- logo -->
            <h1>
                <img src="../assets/images/logo.png" alt="logo">
                <span>电商后台管理系统</span>
            </h1>
            <!-- 退出按钮 -->
            <el-button type="info" @click="onDropOutBtn">退出</el-button>
        </el-header>
        <el-container>
            <!-- 导航区 -->
            <el-aside width="200px">
                <el-menu
                active-text-color="#ffd04b"
                background-color="#4b5255"
                text-color="#fff"
                default-active="/home/users"
                unique-opened
                router
                >
                    <!-- 一级导航 -->
                    <el-sub-menu v-for="item1 in menus.data" :key="item1.id" :index="item1.path">
                        <!-- 一级导航描述 -->
                        <template #title>
                            <span class="iconfont" :class="item1.icon"></span>
                            <span>{{item1.authName}}</span>
                        </template>
                        <!-- 二级导航 -->
                        <el-menu-item v-for="item2 in item1.children" :key="item2.id" :index="'/home/' + item2.path">
                            <!-- 二级导航描述 -->
                            <template #title>
                                <el-icon><Menu /></el-icon>
                                <span>{{item2.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <!-- 内容区 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
    import {ref,reactive,onMounted} from 'vue'
    import {useRouter} from 'vue-router'
    import {Location,Menu} from '@element-plus/icons-vue'
    import {menusHttp,menusHttpDataType} from '../http/menus'
    import { ElMessage } from 'element-plus'

    // 执行useRouter,获取vue-router上的一些方法
    const router = useRouter()

    // 左侧菜单权限
    const menus = reactive({
        // 数据
        data:[] as menusHttpDataType[],
        // icon图标
        icons:['icon-haoyou','icon-quanxian','icon-shangpin','icon-dingdan','icon-shujutongji']
    })

    // 生命周期函数
    onMounted(() => {
        // 调用获取左侧菜单权限方法
        getMenus()
    })

    // 点击提出按钮,退出登录
    const onDropOutBtn = ()=>{
        // 清空缓存中的token值
        window.sessionStorage.removeItem('token')
        // 跳转回登录界面
        router.push('/login')
    }

     // 获取左侧菜单权限方法
    const getMenus = async ()=>{
        // 发送请求
        const res = await menusHttp()
        // 请求失败
        if(res.meta.status !== 200) return ElMessage.error('获取左侧菜单权限数据失败,请稍后重试')
        // 请求成功
        // 为一级标题添加上icon属性
        res.data.forEach((item,index)=>{
            item.icon = menus.icons[index]
        })
        // 赋值
        menus.data = res.data
    }
</script>

<style lang="scss" scoped>
.el-container{
    height: 100%;
    // 头部
    .el-header{
        background-color: #545c64;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1{
            display: flex;
            align-items: center;
            img{
                width: 50px;
                height: 50px;
                margin-right:10px;
            }
            span{
                color: #fff;
            }
        }
    }
    // 导航区
    .el-aside{
        background-color: #4b5255;
    }
    // 内容区
    .el-main{
        background-color: #E4E7ED;
    }
}
</style>
