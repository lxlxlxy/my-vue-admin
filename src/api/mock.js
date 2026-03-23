import Mock from 'mockjs'
import homeApi from '@/api/mockData/home'
import userApi from '@/api/mockData/user'
import permissionApi from '@/api/mockData/permission'

//mock函数接收的参数 1. 拦截的路径 2. 拦截的方式 3. 假数据
Mock.mock('/api/home/getTableData','get',homeApi.getTableData)
Mock.mock('/api/home/getCountData','get',homeApi.getCountData)
Mock.mock('/api/home/getChartData','get',homeApi.getChartData)
//user页面的mock
Mock.mock(/api\/user\/getUserData/,'get',userApi.getUserList)
Mock.mock(/api\/user\/deleteUser/,'delete',userApi.deleteUser)
Mock.mock(/api\/user\/addUser/,'post',userApi.createUser)
Mock.mock(/api\/user\/editUser/,'put',userApi.updateUser)
//菜单数据获取
Mock.mock(/api\/permission\/getMenu/,'post',permissionApi.getMenu)





