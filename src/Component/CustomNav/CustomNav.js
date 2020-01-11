import React from 'react'
import {Link} from 'react-router-dom'
import {getRootList} from './GetRootList'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu;
// 侧边栏，利用Menu组件
class CustomNav extends React.Component{
  constructor() {
    super() 
    this.state = {
      list:[]
    }
  }
  componentDidMount() {
    let List = getRootList()
    this.setState({
      list: List
    })
  //  console.log('list',this.state.list)
  }
  renderMenuItem(item) {
    if(item.children){
      return (
        <SubMenu
          key={item.id}
          title={
            <span>
              <Icon type={item.icon||"mail"} />
              <span>{item.name}</span>
            </span>
          }
        >
          {item.children.map((childItem,index)=>{
           return this.renderMenuItem(childItem)
          })}
        </SubMenu>
      )
    }
    else{
      return (
        <Menu.Item key={item.id}>
          <Link to={"/admin"+item.path}>
            <Icon type={item.icon||'setting'} />
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      )
    }
  }
  render () {
    return (
      <Menu  mode="inline"
        theme = 'dark'
      >
        {this.state.list.map((item,index)=>{
          return this.renderMenuItem(item)
        })}
        
      </Menu>
    )
  }
}

export default CustomNav