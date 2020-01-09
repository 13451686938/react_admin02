import React,{Component} from 'react'
import {Dropdown,Menu,Icon} from 'antd'
import {withRouter} from 'react-router-dom'
import {clear,getItem} from '../../Utils/webStorage'
import {userLogout} from '../../Api/User'

// 导航栏，多组件复用
let arr = [{name:'个人中心',icon:'setting',id:1},
           {name:'个人管理',icon:'setting',id:2},
           {name:'退出登录',icon:'setting',id:3}]
class HeaderNav extends Component {
  jump(id){
    switch(id){
      case 1: 
        this.props.history.push('/admin/user/center')
        break
      case 2:
        this.props.history.push('/admin/user/setting')
        break
      default:
        let uid = getItem('uid')|| ''
        userLogout(uid)
        .then(()=>{
          clear()
          this.props.history.replace('/login')
        })
        
        break;
    }
  }
  renderMenu() {
    return (
      <Menu>
        {arr.map((item,index)=>{
          return (
            <Menu.Item onClick= {this.jump.bind(this,item.id)}>
              <span>
                <Icon type={item.icon}></Icon>
                {item.name}
              </span>
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
  render () {
    return (
      <Dropdown overlay={()=>{
        return (
          this.renderMenu()
        )
      }}>
        <div className="ant-dropdown-link" >
          用户<Icon type="down" />
        </div>
      </Dropdown>
    )
  }
}

export default withRouter(HeaderNav)