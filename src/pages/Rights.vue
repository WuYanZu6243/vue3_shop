<template>
    <!-- 面包屑导航 -->
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限列表 -->
    <el-table :data="rightList" border style="width: 100%">
        <el-table-column type="index" label="#"/>
        <el-table-column prop="authName" label="权限名称" />
        <el-table-column prop="path" label="路径"/>
        <el-table-column label="权限等级">
            <template #default="scope">
                <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
                <el-tag type="warning" v-else>三级</el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
    import {ref,reactive,onMounted} from 'vue'
    import { ArrowRight } from '@element-plus/icons-vue'
    import {getRightListHttp} from '../http/rights'
    import { ElMessage } from 'element-plus'
    import {rightListType} from '../types/rights'

    // 权限列表数据
    const rightList = ref([] as rightListType[])

    // 获取权限列表方法
    const getRigtList = async()=>{
        // 发送请求
        const res = await getRightListHttp()
        // 请求失败
        if(res.meta.status !== 200) return ElMessage.error('获取权限列表失败')
        // 请求成功，赋值
        rightList.value = res.data
    }

    // 生命周期函数
    onMounted(()=>{
        // 调用获取权限列表方法
        getRigtList()
    })

</script>

<style lang="scss" scoped>
    .el-breadcrumb{
        margin-bottom: 15px;
    }
</style>
