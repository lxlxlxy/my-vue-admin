import axios from 'axios'
import { ElMessage } from 'element-plus'
import config from '@/config'
const service=axios.create({
    baseURL:config.baseApi,
})
const NETWORK_ERROR='网络错误...'
//请求拦截器
service.interceptors.request.use(
    function (config){
        return config  //在发送请求前做什么（一般是加token）
    },
    function(error){  //请求错误做什么
        return Promise.reject(error)
    }
);
service.interceptors.response.use(
    res=>{
        console.log('拦截器',res);
        
        const {code,data,msg} = res.data
        if(code===200) return data
        else{
            ElMessage.error(msg||NETWORK_ERROR)
            return Promise.reject(msg||NETWORK_ERROR)
        }
    }
)

function request(options){
    options.method=options.method||'get'
    //关于get请求参数的调整
    if(options.method.toLowerCase()==='get'){
        options.params=options.data  //把data赋值给get请求的params参数
    }
    if(options.method.toLowerCase()==='delete'){
        options.params=options.data  //把data赋值给get请求的params参数
    }
    let isMock=config.mock  //控制是否接收mock拦截的开关
    if(typeof options.mock!== 'undefined'){
        isMock=options.mock  //针对单个接口的mock开关
    }
    if(config.env==='prod'){
        //线上不能用mock
        service.defaults.baseURL=config.baseApi
    }else{
        service.defaults.baseURL=isMock?config.mockApi:config.baseApi
    }
    return service(options)
}

export default request
