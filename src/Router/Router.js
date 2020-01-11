import React,{Component,Fragment} from 'react'
import {HashRouter,Redirect,Route,Link} from 'react-router-dom'
// import loadable from '../Utils/loadable'
import Home from '../Page/Home/Home'
import Admin from '../Page/Admin/Admin'
import Login from '../Page/Login/Login'
import Role from '../Page/Role/Role'
import UserAdd from '../Page/User/add'
import UserList from '../Page/User/userList'
// const Admin = loadable (() => import('../Page/Admin/index.js'))
class Router extends Component{
  render() {
    return (
      <Fragment>
        <HashRouter>
          {/* 跳转区 */}
          <Redirect exact from ='/' to='/login'></Redirect>
          <Route path='/login' component = {Login}></Route>
          <Route path='/admin' render={()=>{
            return (
              <Admin>
                <Redirect exact from='/admin' to='/admin/home'></Redirect>
                <Route path='/admin/home' component = {Home}></Route>
                <Route path='/admin/food' component = {()=>{
                  return (
                    <h2>商品分类</h2>
                  )
                }}></Route>
                 <Route path='/admin/user/list' 
                           component={UserList}
                           ></Route>
                           <Route path='/admin/user/add' 
                           component={UserAdd}
                           ></Route>

                <Route path='/admin/role' component = {Role}></Route>
              </Admin>
            )
          }}>
          </Route>
          
        </HashRouter>
      </Fragment>
    )
  }
}
export default Router