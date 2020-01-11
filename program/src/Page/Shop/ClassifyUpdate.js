import React,{Component,Fragment} from 'react'
import Styles from './css/add.module.less'

import {connect} from 'react-redux'
import actionCreator from '../../Store/actionCreator'
import {bindActionCreators} from 'redux'
import {Card, message,Button } from 'antd';

class List extends Component{
  constructor(props) {
    let {num,one,two,key} = props.toUpdate
    super()
    this.state = {
      num,one,two,key,
      data: [
        {num:1,one:"服装",two:"T恤",key:'1-1'},
        {num:2,one:"服装",two:"裤装",key:'1-2'},
        {num:3,one:"手机数码",two:"手机",key:'2-1'},
        {num:4,one:"手机数码",two:"配件",key:'2-2'},
        {num:5,one:"食品",two:"巧克力",key:'3-1'},
        {num:5,one:"食品",two:"糖果",key:'3-2'}
      ],
      // 控制数据添加无误
      addState: false
    }
  }
  componentWillReceiveProps(props) {
    let {num,one,two,key} = props.toUpdate
    this.setState({num,one,two,key})
  }
  submit = ()=> {
    let {num,one,two,key,addState} = this.state
    let obj = {num,one,two,key}
    if(addState==true)
    {
      message.success('商品类型更新成功')
      
      return this.props.returnData(obj)
    }message.error('商品类型更新有误')
  }
  hasOrNot= (e,msg,val) => {
    let {data,addState} = this.state
    let list = []
    data.map((item) => {
      list.push(item[val])
    })
    if(val == 'num'){
      if(list.indexOf(e.target.value/1)!=-1){
        
        this.setState({addState:false})
        console.log('存在',addState)
        return message.error(`${msg}已存在，请重新输入`)
      }
      else{
        message.success(`${msg}可以使用`)
        this.setState({addState:true})
        console.log('not 存在',addState)
      }
    }else{
        if(list.indexOf(e.target.value)!=-1){
          console.log('存在')
          this.setState({addState:false})
          return message.error(`${msg}已存在，请重新输入`)
        }
        else{
          message.success(`${msg}可以使用`)
          this.setState({addState:true})
        }
      }
    
  }
  render () {
    let {num,one,two,key,data} = this.state
    return (
      <Fragment>
       
        <Card className = {Styles.add}>
        <Button style={{float:'right'}} onClick = {()=> {
           this.props.returnData({})
          }}>关闭</Button>
          商品编号：<input type='text' value={num} onChange = {(e)=>{
            this.hasOrNot(e,'商品编号',"num")
            this.setState({num:e.target.value})
          }}></input><br/>
          一级分类：<input type='text' value={one} onChange = {(e)=>{
             this.hasOrNot(e,'一级分类',"one")
            
            this.setState({one:e.target.value})
          }}></input><br/>
          二级分类：<input type='text' value={two} onChange = {(e)=>{
            this.hasOrNot(e,'二级分类',"two")
            this.setState({two:e.target.value})
          }}></input><br/>
          商品代号：<input type='text' value={key} onChange = {(e)=>{
            this.hasOrNot(e,'商品代号',"key")
            this.setState({key:e.target.value})
          }}></input><br/>
          <Button onClick = {this.submit}>商品分类更新</Button>
        </Card>
        
      </Fragment>
    )
  }
}
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionCreator,dispatch)
})(List)