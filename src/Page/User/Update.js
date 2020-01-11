import React,{Component, Fragment} from 'react';
import {Button,Table,Card,Pagination,Popconfirm,message,Spin} from 'antd'
import {UpdateUser} from  '../../Api/User'

class UserUpdate extends Component{
 constructor(props){
   console.log('props',props)
  super()
  //接受到默认的props值付给state
  this.state=props.updateData
 }
 componentWillReceiveProps(props,state){
   console.log('props 改变')
  let  {_id,userName,passWord}=props.updateData 
  this.setState({_id,userName,passWord})
 }
 upload=()=>{
   let file=this.refs.file.files[0]
   let reader =new FileReader() 
    reader.onload=()=>{
      this.setState({img:reader.result})
    }
   reader.readAsDataURL(file)
 }
 submit=()=>{
  UpdateUser(this.state)
  .then((res)=>{
    console.log(res)
    message.success('修改ok',0.5,()=>{
      this.props.closeDrawer()
      
    })
  })
 }
 render() {
    let {_id,userName,passWord}=this.state
    console.log(this)

    return(
      <Fragment>
        <div>
          id:{_id}<br/>
          账号:<input type='text' 
            value={userName} onChange={(e)=>{
            let value =e.target.value
            this.setState({userName:value})
            console.log(_id)
          }}></input>
          <br/>
          密码:<input type='text' 
            
            value={passWord} onChange={(e)=>{
            let value =e.target.value
            this.setState({passWord:value})
          }}></input>
          <br/>
          <Button type='primary' onClick={this.submit}>修改</Button>
        </div>
      </Fragment>
    ) 
 }
}

export default UserUpdate;
