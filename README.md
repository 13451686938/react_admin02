#常用插件
npm i less less-loader antd babel-plugin-import echarts echarts-for-react redux react-redux axios react-router-dom
redux-thunk 

#配置config文件
less  babel-plugin-import(按需加载antd)  proxy(服务器代理)

#项目环境
1.路由 按需加载
2.utils 
#运行项目
npm run serve

#路由搭建
根据页面结构区分出路由层级

#样式的使用
安装less npm install less less-loader
在配置文件下 webpack.config.js 将sass 相关的改成less

#react中样式混淆 
1.bem命名法 2.样式模块化 文件名 xxx.module.less import hehe from 'xxx.modules.less'
3.cssinJS componentStyle

#使用antd
npm install antd 
1.全局使用 import 'antd/dist/antd.css'; import {Button} from 'antd' 
2.按需引入 使用的时候只引入组件样式自动加入 npm install babel-plugin-import 在配置文件下 webpack.config.js babel-loader plugins:[['import',{ "libraryName": "antd", style: true }],....] 安装的less版本和antd的less版本有冲突 将less 降价到2.7.3

#管理平台权限控制
1.根据用户权限渲染不同的侧边栏 
2.根据用户权限加载不同的组件 用户登录的时候除了需要返回token之外 还需要一个权限列表

#网络请求处理
1.axios 二次封装 
2.api 同一管理 promise asyn cawait

#路由懒加载
react-loadable lazy

#管理信息
表格渲染数据 （查询 分类查询 模糊查询 分页查询） 添加数据 修改数据 删除数据 图片上传 数据统计 折线图 饼图 ...可视化图标 富文本编辑器 导出excel 退出登录 （注销） 国际化 全局token处理

#全局api返回token相关的状态码拦截 拦截
拦截的是 token 无用的状态码 丢失 失效 超时
1.调用api接口返回该状态码的时候 弹出模态框引导用户重新登录 通过axios的响应拦截器 可以获取所有的api返回码 在该位置判断状态码 模态框的显示和隐藏 由全局状态管理控制 需要显示模态框就去修改全局状态管理的值 true 用户点击去登录 将模态框隐藏

#hooks
react 新增的特性 给函数组件赋予类组件的特性 state useState 生命周期 useEffect 给函数组价赋予类组件的功能

#编辑器（富文本编辑器 markdown编辑器 拓扑图编辑器 导图编辑器）
富文本编辑器