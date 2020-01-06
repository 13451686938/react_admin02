import axios from 'axios'
import {getItem} from './webStorage'
import actionCreator from '../Store/actionCreator'
import store from '../Store/store'
axios.interceptors.request.use(function(config){
  console.log('请求拦截', config)
  let token = (getItem('token')) ? (getItem('token').token):''
  config.data.token=token
  return config;
},function (error){
  return Promise.reject(error)
})
axios.interceptors.response.use(function(response){
  // 假如token失效，修改全局状态值弹出模块框
  let list = [-996,-997,-998,-999]
  if(list.indexOf(response.data.err)!==-1){
    store.dispatch(actionCreator.setTokenModal())
  }
  return response.data
},function (error){
  return Promise.reject(error)
})
export default axios