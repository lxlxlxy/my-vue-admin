<script setup>
  import CommonAside from '@/components/CommonAside.vue';
  import CommonHeader from '@/components/CommonHeader.vue';
  import CommonTags from '@/components/CommonTags.vue';

</script>

<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 自定义左侧的组件 -->
      <common-aside/>
      <el-container>
        <!-- 右侧头顶组件 -->
          <el-header class="el-header">
            <common-header/>
          </el-header>
          <common-tags/>
          <!-- 右侧主页面 -->
          <el-main class="right-main">
            <!-- 其他子路径的组件的内容都要放在这里 -->
            <router-view></router-view>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
  .common-layout, .lay-container{
    height:100%;
  }
  .el-header{
    background-color: #333;
  }
</style>