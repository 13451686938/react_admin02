import React,{Component} from 'react';
import {Button,Table,Card,Pagination,Popconfirm,message,Spin} from 'antd'
import Styles from './add.module.less'
import {AddUser} from '../../Api/User'

class UserAdd extends Component{
  constructor(){
    super()
    this.state={
      userName:'',passWord:''
    }
  }
   
   submit=()=>{
     
    AddUser(this.state).then((res)=>{
      console.log(res)
    })
    
    // 发起aja请求
   }
   render() {
     let {userName,passWord}=this.state
    return (
      <Card title='用户添加'  className={Styles.add}> 
          账号:<input type="text"  style={{ color: 'rgba(0,0,0,.25'}}
                value={userName} onChange={(e)=>{
                let value=e.target.value
                this.setState({userName:value})
              }}/>
          <br/>
          密码:<input type="password" 
            style={{ color: 'rgba(0,0,0,.25'}}
            value={passWord} onChange={(e)=>{
            let value=e.target.value
            this.setState({passWord:value})
          }}/>
          <br/>
          <Button type='primary' onClick={this.submit}>添加</Button>
      </Card>
    );
  }
}
export default UserAdd;
