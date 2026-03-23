<template>
<div class="user-header">
    <el-button type="primary" @click="handleClick">
        新增
    </el-button>
    <el-form :inline="true" :model="formInline">
        <el-form-item label="请输入">
            <el-input placeholder="请输入用户名" v-model="formInline.keyword"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="hadleSearch">搜索</el-button>
        </el-form-item>
    </el-form>
</div>
<div class="table">
  <el-table :data="tableData" style="width: 100%" >
    <el-table-column 
      v-for="item in tableLabel"
      :key="item.name"
      :prop="item.prop"
      :label="item.label"
      :width="item.width?item.width:'125px'"
    />
    <el-table-column fixed="right" label="操作" min-width="120">
    <template #default="{row}">
        <el-button type="primary" size="small" @click="handleEdit(row)">
        编辑
        </el-button>
        <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
    </template>
    </el-table-column>
  </el-table>
  <el-pagination 
    class="pager"
    background 
    layout="prev, pager, next" 
    :total="config.total"
    size="small"
    @current-change="handleChange"
    />
</div>
<!-- 新增/编辑弹窗 -->
  <el-dialog 
    v-model="visible" 
    :title="action==='add'?'新增用户':'编辑用户'"
    width="40%"
    :before-close="handleClose"
    >
    <el-form  :inline="true" :model="formUser" :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入姓名" v-model="formUser.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age" >
            <el-input placeholder="请输入年龄" v-model.number="formUser.age"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row >
        <el-col :span="12">
          <el-form-item label="性别" prop="sex" class="select-clearn">
            <el-select placeholder="请选择" v-model="formUser.sex">
              <el-option label="男" :value='1' />
              <el-option label="女" :value='0' />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth" >
            <el-date-picker 
              v-model="formUser.birth"
              type="date"
              placeholder="请输入"
              style="width: 100%;"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              />
          </el-form-item>
        </el-col>
      </el-row>
        
      <el-row>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="formUser.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-button type="primary" @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup>
import {onMounted, ref, reactive, useTemplateRef, nextTick } from 'vue'
import { getUserData ,deleteUser,addUser,editUser} from '@/api/api'
import {ElMessage,ElMessageBox} from "element-plus"

const tableData = ref([])
const tableLabel=reactive([
  {
    prop:'name',
    label:'姓名'
  },
  {
    prop:'age',
    label:'年龄'
  },
  {
    prop:'sexLabel',
    label:'性别'
  },
  {
    prop:'birth',
    label:'出生日期',
    width:'200px'
  },
  {
    prop:'addr',
    label:'地址',
    width:'300px'
  },
])
const formInline=reactive({
  keyword:''
})
const config=reactive({
  name:'',
  total: 0,
  page:1
})
const getUser= async()=>{
  let res=await getUserData(config)
  console.log(res);
  tableData.value = res.list.map(item=>({
      ...item,
      sexLabel: (item.sex === 1)?'男':'女'
  }))
  config.total=res.count
}
  onMounted(()=>{
    getUser()
  })
  function hadleSearch(){
    config.name=formInline.keyword
    getUser()
  }
  function handleChange(page){
    config.page=page
    getUser()
  }
  const handleDelete= (val)=>{
    console.log('id',val);
    ElMessageBox.confirm("你确定要删除吗？",
      {confirmButtonText: '确认删除',
      cancelButtonText: '取消',}).then(async ()=>{
      await deleteUser({ id:val.id})
      ElMessage({
        showClose:true,
        message:"删除成功",
        type:"success",
        
      })
      getUser()  //删除后重新请求用户数据
    }).catch((err) => {
    console.log('取消删除');
  })
  }

  //新增/编辑弹窗
  const visible= ref(false)
  const formUser=reactive({
    sex: 1
  })
  const rules=reactive({
    name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
    age: [
      { required: true, message: "年龄是必填项", trigger: "blur" },
      { type: "number", message: "年龄必须是数字" },
    ],
    sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
    birth: [{ required: true, message: "出生日期是必选项" }],
    addr:[{ required: true, message: '地址是必填项' }]
  })
  const action = ref('add')
  const userForm=useTemplateRef('userForm') 

  function handleClick(){
    action.value='add'
    visible.value= true
  }
  function handleEdit(val){
    visible.value=true
    action.value='edit'
    nextTick(()=>{
      Object.assign(formUser,{...val})
    })
    console.log('newForm',formUser);
  }
  const handleClose=()=>{
    //重置表单
    userForm.value.resetFields()
    visible.value=false
  }
  const handleCancel=()=>{
    //重置表单
    userForm.value.resetFields()
    visible.value=false
  }
  const onSubmit=()=>{
    userForm.value.validate(async (valid)=>{
      if(valid){  //如果校验成功
        let res=null
        if(action.value==='add'){
          res=await addUser(formUser)
          console.log('addUser',res);
          if(res){
            ElMessage({
              showClose:true,
              message:"添加成功",
              type:"success",
            })
          }
        }
        else if(action.value==='edit'){
          res=await editUser(formUser)
          console.log('editUser',res);
          if(res){
            ElMessage({
              showClose:true,
              message:"编辑成功",
              type:"success",
            })
          }
        }
        //关闭
        visible.value=false
        userForm.value.resetFields()
        getUser()
      }else{
        ElMessage({
            showClose:true,
            message:"请输入正确内容",
            type:"error",
          })
      }
    })
    
  }
</script>


<style lang="less" scoped>
.user-header{
    display: flex;
    justify-content: space-between;
}
.table{
  position: relative;
  height: 550px;
  .pager{
    position: absolute;
    right: 10px;
    bottom: 30px;
  }
  .el-table{
    width: 100%;
    height: 580px;
  }
}
.select-clearn{
  display: flex;
}
</style> 