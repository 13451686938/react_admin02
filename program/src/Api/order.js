import axios from '../Utils/axios'
// 登录接口
export const getOrderList = async (page,pageSize)=>{
  let res = await  axios.post('/hehe/order/getOrder',{page,pageSize})
  if(res.err!==0){
    throw res
  }
  return res
}
export const delOrderList = async (id)=>{
  let res = await  axios.post('/hehe/order/delOrder',{id})
  if(res.err!==0){
    throw res
  }
  return res
}
export const selectDelOrderList = async (ids)=>{
  let res = await  axios.post('/hehe/order/selectDelOrder',{ids})
  if(res.err!==0){
    throw res
  }
  return res
}
export const findOneOrder = async (val)=>{
  let res = await  axios.post('/hehe/order/findOneOrder',val)
  if(res.err!==0){
    throw res
  }
  return res
}
export const findOrder = async (val)=>{
  let res = await  axios.post('/hehe/order/findOrder',val)
  if(res.err!==0){
    throw res
  }
  return res
}

