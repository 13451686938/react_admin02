import axios from '../Utils/axios'
// 权限相关
export const getRoles= async (val)=>{
  let res = await axios.post('/hehe/order/role/getRoles',{val})
  if(res.status!==0){
    throw res
  }
  return res
}
//添加
export const reqAddRole= async (roleName)=>{
  let res = await axios.post('/hehe/order/role/add',{roleName})
  if(res.status!==0){
    throw res
  }
  return res
}

// 更新
export const reqUpdateRole= async (role)=>{
  let res = await axios.post('/hehe/order/role/update',role)
  if(res.status!==0){
    throw res
  }
  return res
}
// 删除
export const DelRole= async (roles_id)=>{
  let res = await axios.post('/hehe/order/role/del',{roles_id})
  if(res.status!==0){
    throw res
  }
  return res
}