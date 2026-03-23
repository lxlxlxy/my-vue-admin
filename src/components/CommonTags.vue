<template>
  <div class="tags">

    <el-tag 
      v-for="tag in tags" 
      :key="tag.name" 
      :closable="tag.name!=='home'" 
      :effect="route.name===tag.name?'dark':'plain'"
      @click="handleClick(tag)"
      @close="handleClose(tag)"
      >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script setup>
import { useRoute ,useRouter } from 'vue-router';
import { useAllDataStore } from '@/stores';
import { storeToRefs } from 'pinia';
  const store=useAllDataStore()
  const { tags }=storeToRefs( store )
  const { updateMenuTag }= store 
  const route=useRoute()
  const router=useRouter()
  const handleClick=(val)=>{
    if(val.path!==route.path){
      router.push(val.path)
    }
  }

  const handleClose = (tag) => {
    //如果当前页面已有tag则处理，否则直接关闭
    const index = tags.value.findIndex((item) => item.name === tag.name)
    if (index === -1) return

    const isActive = route.name === tag.name
    const prevTag = tags.value[index - 1] || tags.value[0]  //当前页面的前一个

    updateMenuTag(tag)

    if (isActive && prevTag) {  //如果删除的是当前页面且前一个页面存在则跳转
      router.push(prevTag.path)
    }
}
</script>

<style scoped lang="less">
.tags{
  margin:20px 0 0 20px;
  cursor:pointer;
    .el-tag{
    margin-right: 10px !important;
  }
}

</style>