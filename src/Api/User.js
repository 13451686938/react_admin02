import axios from '../Utils/axios'
// 登录接口
export const userLogin = async (val)=>{
  let res = await  axios.post('/hehe/admin/login', val)
  if(res.err!==0){
    throw res
  }
  return res
}
// 登出接口
export const userLogout = async (uid)=>{
  let res = await  axios.post('/hehe/admin/logout', {uid})
  if(res.err!==0){
    throw res
  }
  return res
}
export const GetUsers = async (page = 1, pageSize = 5) => {
  let res = await axios.post('/hehe/admin/user/getUsers', {
    page,
    pageSize
  })
  if (res.err !== 0) {
    throw res
  }
  return res
}
export const AddUser = async (obj) => {
  let res = await axios.post('/hehe/admin/user/addUser', {
    ...obj
  })
  if (res.err !== 0) {
    throw res
  }
  return res
}



export const DelUser = async (userId) => {
  let res = await axios.post('/hehe/admin/user/deluser', {
    userId
  })
  if (res.err !== 0) {
    throw res
  }
  return res
}


export const UpdateUser = async (obj) => {
  // 接口数据需要一个foodId  将_id 转化为foodId
  let data = {
    ...obj
  }
  data.userId = data._id
  let res = await axios.post('/hehe/admin/user/updateUser', data)
  if (res.err !== 0) {
    throw res
  }
  return res
}


