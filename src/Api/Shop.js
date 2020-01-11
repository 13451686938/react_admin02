import axios from '../Utils/axios'
// 商品添加接口
export const foodAdd = async (val)=>{
  let res = await  axios.post('/hehe/shop/addFood', val)
  if(res.err!==0){
    throw res
  }
  return res
}
// 查询接口：分页查询
export const getFoods = async (val)=>{
  let vals = val||{page:1,pageSize:3}
  let res = await  axios.post('/hehe/shop/getFoods', vals)
  if(res.err!==0){
    throw res
  }
  return res
}
// 查询接口：分页查询所有
export const getFoodsAll = async (val)=>{
  let vals = val||{page:1,pageSize:9999999}
  let res = await  axios.post('/hehe/shop/getFoods', vals)
  if(res.err!==0){
    throw res
  }
  return res
}
//  查询接口：分类查询
export const getFoodsByType = async (val)=>{
  let vals = {page:1,pageSize:30,foodType:val||'服装T恤'}
  let res = await  axios.post('/hehe/shop/getFoodsByType', vals)
  if(res.err!==0){
    throw res
  }
  return res
}
//  查询接口：关键字查询
export const getFoodsBykw = async (val)=>{
  let vals = val||{page:1,pageSize:3,kw:''}
  let res = await  axios.post('/hehe/shop/getFoodsBykw', vals)
  if(res.err!==0){
    throw res
  }
  return res
}
//  删除接口
export const delFood = async (val)=>{
  let vals = val||{foodId:''}
  let res = await  axios.post('/hehe/shop/delFood', vals)
  if(res.err!==0){
    throw res
  }
  return res
}
//  更新接口
export const updateFood = async (val)=>{
  let res = await  axios.post('/hehe/shop/updateFood', val)
  if(res.err!==0){
    throw res
  }
  return res
}
