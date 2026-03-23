/**
 * 环境配置文件
 * 一般在企业级项目中有以下三个环境
 * 开发环境，测试环境，线上环境
 */
const env=import.meta.env.MODE || 'prod'

const EnvConfig={
    development:{
        baseApi:'/api',
        //使用云端mock
        mockApi:'https://m1.apifoxmock.com/m1/7940151-7692068-default/api'
    },
    test:{
        baseApi: '//test.future.com/api',
        mockApi:'https://m1.apifoxmock.com/m1/7940151-7692068-default/api'
    },
    prod:{
        baseApi: '//future.com/api',
        mockApi:'https://m1.apifoxmock.com/m1/7940151-7692068-default/api'
    }
}

export default{
    env,
    mock:false,  //在这里控制全局的mock开关
    ...EnvConfig[env]
}