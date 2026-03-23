import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAllDataStore = defineStore('allData', () => {
  const cache=JSON.parse(localStorage.getItem('store')||'{}')
  /**
   * 导航栏交互相关
   */
  const isCollapse = ref(false)
  /**
   * 顶部tag相关
   */
  const tags=ref(cache.tags||   //管理所有顶部的tag的显示
    [
      {
        path:'/home',
        name:'home',
        label:'首页',
        icon:'home'
      }
    ]
  )
  function handleSelectMenu(val) {
    if(val !=='home'){
      const index=tags.value.findIndex( item => item.name===val.name )
      if(index === -1)  tags.value.push(val) 
    }
    console.log('tags',tags);
  
  }
  function updateMenuTag(val){
    const index=tags.value.findIndex( item => item.name===val.name )
    tags.value.splice(index,1)
  }
  /**
   * 登录数据相关
   * 菜单和token鉴权
  */
  const menuList=ref(cache.menuList||[])
  const token=ref(cache.token||'')
  const updateMenuList =(val)=>{
    menuList.value=val
  }

  /**
   * 动态路由相关
   */
  const routerList=ref([])
  const addMenu=(router)=>{
    if (!menuList.value.length) return
    const menu=menuList.value 
    console.log('store menu',menu);
    // ✅ 防止重复添加（重要）
    routerList.value.forEach(remove => remove())
    routerList.value = []

    const module=import.meta.glob("../views/**/*.vue")
    const routeArr=[]   //暂存所有的子路由+路由
    menu.forEach(item=>{
      if(item.children){
        item.children.forEach(subItem=>{
          let url=`../views/${subItem.url}.vue`
          subItem.component=module[url]
        })
        routeArr.push(...item.children)
      }else{
        let url=`../views/${item.url}.vue`
        item.component=module[url]
        routeArr.push(item)
      }
      
    })
    routeArr.forEach(item=>{
      //把每一次添加路由的返回值remove()收集起来，放到state中的routeList
      routerList.value.push(router.addRoute("main",item))
    })
  }
  const clean=()=>{
    routerList.value.forEach(remove=>{
      if(remove) remove()
    })
    routerList.value = []
    menuList.value=[]
    token.value=''
    tags.value=   //管理所有顶部的tag的显示
    [
      {
        path:'/home',
        name:'home',
        label:'首页',
        icon:'home'
      }
    ]
    localStorage.removeItem('store')
  }
  watch(()=>({
    menuList: menuList.value,
    token: token.value,
    tags:tags.value
  }),(newVal)=> {
    if(!newVal.token) {
      localStorage.removeItem('store')
      return
    }
    localStorage.setItem('store', JSON.stringify(newVal))
  },{ deep: true })

  return { 
    isCollapse,
    tags,
    token,
    menuList,
    handleSelectMenu,
    updateMenuTag,
    updateMenuList,
    addMenu,
    clean
  }
})
