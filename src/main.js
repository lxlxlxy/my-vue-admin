import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/less/index.less'
import '@/api/mock.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import { useAllDataStore } from '@/stores'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(createPinia())
const store=useAllDataStore()
store.addMenu(router)
app.use(router)
store.addMenu(router)
//getRoutes获得所有路由记录的完整列表。
 //这个方法判断要跳转的路由是否存在
function isRoute(to){
    return router.getRoutes().filter(item=>item.path===to.path).length>0
}

router.beforeEach((to, from) => {
     //如果要跳转的不是login,且token不存在(可以通过不存在token判断出用户未登录)
    if(to.path !== '/login'&&!store.token){
        //跳转到login
        return { name: 'login' }
    }
    //如果路由记录不存在
    if(!isRoute(to)){
        //跳转到404界面
        return {name: "404"}
    }
})
app.mount('#app')
