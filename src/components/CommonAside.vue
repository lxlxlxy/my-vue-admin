<template>
    <el-aside :width="width">
        <el-menu background-color="#545c64" text-color="#fff" :collapse="isCollapse" :collapse-transition="false" :default-active="activeMenu">
            <h3 v-show="!isCollapse">后台通用管理系统</h3>
            <h3 v-show="isCollapse">后台</h3>
            <el-menu-item 
                v-for="item in noChildren"
                :key="item.path"
                :index="item.path"
                @click="handleMenu(item)"
                >
                <component class="icons" :is="item.icon"></component>
                <span>{{item.label}}</span>
            </el-menu-item>
            <el-sub-menu
                v-for="item in hasChildren"
                    :key="item.path"
                    :index="item.path"
                >
            <template #title>
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item 
                    v-for="(subItem) in item.children"
                    :key="subItem.path"
                    :index="subItem.path"
                    @click="handleMenu(subItem)"
                    >
                        <component class="icons" :is="subItem.icon"></component>
                        <span>{{subItem.label}}</span>
                </el-menu-item>
            </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script setup>
    import {computed, ref } from 'vue'
    import { useAllDataStore } from '@/stores'
    import { storeToRefs } from 'pinia'
    import {useRouter,useRoute} from 'vue-router'
    const store=useAllDataStore()
    const { handleSelectMenu } = store
    const { isCollapse } =storeToRefs(store)

    const list = computed(()=>store.menuList)
    const noChildren=computed(()=>list.value.filter(item=>!item.children))
    const hasChildren=computed(()=>list.value.filter(item=>item.children))
    console.log('list,noChildren,hasChildren',list,noChildren,hasChildren);
    
    const width=computed(()=>{
        return isCollapse.value? '64px' : '180px'
    })
    const router = useRouter()
    const route = useRoute()
    const handleMenu= val=>{
        router.push(val.path)
        handleSelectMenu(val)
    }
    const activeMenu=computed(()=>route.path)
</script>

<style scoped lang="less">
    .icons{
        height: 18px;
        width: 18px;
        margin-right:5px
    }
    .el-menu{
        border-right:none;
        h3{
            line-height: 48px;
            text-align: center;
            color: #fff;
        }
        
    }
    .el-aside{
        height:100%;
        background-color: #545c64;
    }
</style>