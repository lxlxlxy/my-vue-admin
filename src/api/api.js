/**
 * 整个项目的api统一管理
 */
import request from './request'

//home界面请求表格数据
export function getTableData(){
    return request({
        url:'/home/getTableData',
        method:'get',
        mock:false,
    })
}
export function getCountData(){
    return request({
        url:'/home/getCountData',
        method:'get',
        mock:false,
    })
}
export function getChartData(){
    return request({
        url:'/home/getChartData',
        method:'get',
        mock:false,
    })
}
//user页面的接口
export function getUserData(data){
    return request({
        url:'/user/getUserData',
        method:'get',
        data
    })
}
export function deleteUser(data){
    return request({
        url:'/user/deleteUser',
        method:'delete',
        data
    })
}
export function addUser(data){
    return request({
        url:'/user/addUser',
        method:'post',
        data
    })
}
export function editUser(data){
    return request({
        url:'/user/editUser',
        method:'put',
        data
    })
}
//获取菜单接口（在登录页面完成）
export function getMenuList(data){
    return request({
        url:'/permission/getMenu',
        method:'post',
        data
    })
}