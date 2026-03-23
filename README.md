# 项目简介

基于vue3+vite+pinia+element-plus+apifox+nvm+axios+less的后台管理系统前端项目，主要用于用户管理、权限控制、数据监控等功能。

# 技术栈
* **前端框架**: Vue 3 + Composition API
* **UI组件库**: Element Plus
* **状态管理**: Pinia
* **路由管理**: Vue Router
* **HTTP请求**: Axios
* **构建工具**: Vite
* **样式预处理器**: Less

# 项目结构

```
src/
├── api/                    # API接口
├── assets/                 # 静态资源
├── components/             # 公共组件
├── config/                 # 配置文件
├── router/                 # 路由配置
├── stores/                 # 状态管理
├── views/                  # 页面组件
└── App.vue                 # 根组件
```

# 项目启动
## 环境要求
``` sh
Node.js 20
```
## 运行
```sh
npm install
npm run dev
npm run build
```

# 功能模块
## 1. 用户管理模块
- 用户列表展示
- 新增/编辑用户
- 批量操作功能
- 删除撤销功能
- 回收站管理

## 2. 权限管理

- 基于角色的权限控制
- 动态路由生成
- 菜单权限管理

## 3. 全局功能

- 响应式布局
- 路由守卫
- 错误处理

# 登录帐号
## 管理员帐号
- **用户名**: admin
- **密码**: admin

## 普通用户账号

- **用户名**: lixinyu
- **密码**: lixinyu






