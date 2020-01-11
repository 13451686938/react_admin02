import React,{Component,Fragment} from 'react'
import {HashRouter,Redirect,Route,Link} from 'react-router-dom'
// import loadable from '../Utils/loadable'
import Home from '../Page/Home/Home'
import Admin from '../Page/Admin/Admin'
import Login from '../Page/Login/Login'
import List from '../Page/Shop/List'
import Add from '../Page/Shop/Add'
import OrderList from '../Page/Order/OrderList'
import Update from '../Page/Shop/Update'
import Classify from '../Page/Shop/Classify'
import Role from '../Page/Role/Role'
import UserAdd from '../Page/User/add'
import UserList from '../Page/User/userList'
// const Admin = loadable (() => import('../Page/Admin/Admin'))
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
                <Redirect exact from='/admin' to='/admin/food/list'></Redirect>
                <Route path='/admin/home' component = {Home}></Route>
                <Route path='/admin/food' render = {()=>{
                  return(
                    <Fragment>
                      <Route path='/admin/food/list' component = {List}></Route>
                      <Route path='/admin/food/add' component = {Add}></Route>
                      <Route path='/admin/food/update' component = {Update}></Route>
                      <Route path='/admin/food/classify' component = {Classify}></Route>
                    </Fragment>
                  )
                }}></Route>
                <Route path='/admin/order' render = {()=>{
                  return(
                    <Fragment>
                      <Route path="/admin/order/list" component={OrderList}></Route>
                    </Fragment>
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
          }}></Route>
          
        </HashRouter>
      </Fragment>
    )
  }
}
export default Router