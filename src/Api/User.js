import axios from '../Utils/axios'
// 登录接口
export const userLogin = async (val)=>{
  let res = await  axios.post('/hehe/v1/admin/user/login', val)
  if(res.err!==0){
    throw res
  }
  return res
}
// 登出接口
export const userLogout = async (uid)=>{
  let res = await  axios.post('/hehe/v1/admin/user/logout', {uid})
  if(res.err!==0){
    throw res
  }
  return res
}
