import React,{Component,Fragment} from 'react'
import {HashRouter,Redirect,Route,Link} from 'react-router-dom'
// import loadable from '../Utils/loadable'
import Home from '../Page/Home/Home'
import Admin from '../Page/Admin/Admin'
import Login from '../Page/Login/Login'
// const Admin = loadable (() => import('../Page/Admin/index.js'))
class Router extends Component{
  render() {
    return (
      <Fragment>
        <HashRouter>
          {/* 导航区 */}
          <Link path='/home'></Link>
          <Link path='/admin'></Link>
          <Link path='/login'></Link>
          {/* 跳转区 */}
          <Redirect exact from ='/' to='/admin'></Redirect>
          <Route path='/login' component = {Login}></Route>
          <Route path='/admin' render={()=>{
            return (
              <Admin>
                <Redirect exact from='/admin' to='/admin/home'></Redirect>
                <Route path='/admin/home' component = {Home}></Route>
                <Route path='/admin/food' component = {()=>{
                  return (
                    <h2>food</h2>
                  )
                }}></Route>
              </Admin>
            )
          }}></Route>
          
        </HashRouter>
      </Fragment>
    )
  }
}
export default Router