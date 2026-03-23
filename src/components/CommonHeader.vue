<template>
    <div class="header">
        <div class="l-content">
            <el-button size="small" @click="handleCollapse">
                <el-icon class="icons"><Menu /></el-icon>
            </el-button>
            <!-- 面包屑导航栏 -->
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <!-- 下拉框和图片 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImgUrl('user')" class="user">
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleExit">退出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
    import {} from 'vue'
    import { useAllDataStore } from '@/stores'
    import { storeToRefs } from 'pinia'
    import { useRouter } from 'vue-router'
    const router=useRouter()

    const store=useAllDataStore()
    const { isCollapse } =storeToRefs(store)

    function handleCollapse(){
        isCollapse.value=!isCollapse.value
    }
    function getImgUrl(user){
        return new URL(`../assets/images/${user}.png`,import.meta.url).href
    }
    const handleExit=()=>{
        store.clean()
        router.push('/login')
    }
</script>

<style scoped lang="less">
.header{
    display:flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #333;
}
.icons{
    width: 20px;
    height: 20px;
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right:20px;
    }   
}
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
:deep(.bread span){
    color: #fff !important;
    cursor: pointer !important;
}
</style>