import React,{Component, Fragment} from 'react';
import {Button,Table,Pagination,Popconfirm,message,Spin,Drawer,Card} from 'antd'
import UserUpate from  './Update'
import { GetUsers, DelUser ,} from '../../Api/User';
class UserList extends Component{
  constructor(){
    super()
    this.state={
      nowPage:1,
      total:0,
      pageSize:5,
      spinning:false,
      drawerShow:false,
      data:[],
      updateData:{},//要修改的数据
      colums:[
      {
        title: '账号',
        dataIndex: 'userName',
        key: 'userName',
        // fixed:'left',
        width:500
      },
      {
        title: '密码',
        dataIndex: 'passWord',
        key: 'passWord',
        width:500,
        // fixed:'left',
      },
      {
        title: '操作',
        key: 'action',
        width:200,
        // dataIndex:'_id',
        fixed:'right',
        render:(record)=> {
          // 可以当前数据条数的相关内容 如果有dataIndex 参数就是dataIndex关联的内容
          // 如果没 有dataIndex显示数据所有的内容
          // console.log('操作数据',record)
          return(
            <div>
              <Popconfirm
              title='你确定要删除嘛?'
              onConfirm={()=>{
                this.del(record._id)
              }}
              onCancel={()=>{
                message.info('取消删除')
              }}

              okText='删除'
              cancelText="取消"

              >
                <Button type='danger' size='small'>删除</Button>
              </Popconfirm>
              <Button size='small' onClick={()=>{
                console.log('要修改的数据',record)
                this.setState({drawerShow:true,updateData:record})
              }}>修改</Button>
            </div>
          )
        },
      }
    ]
  }
  }
  componentDidMount(){
    this.getTableData(1,5)
  }
  getTableData(nowPage,pageSize){
    // 通过网络请求获取数据更新界面
    this.setState({spinning:true})
    GetUsers(nowPage,pageSize).then((res)=>{
      let {users,allCount}=res.list
      this.setState({data:users,spinning:false,total:allCount})
    })
  
  }
  del(id){
    // 1获取要删除的id 
    // 根据要删除的id 发起ajax请求
    //  更新页面
    DelUser(id).then(()=>{
      this.getTableData()
      console.log(id)
    })

    // console.log('删除id',id)
   
  }
  // 更新完毕操作
  closeDrawer=()=>{
  //  1抽屉关闭
   this.setState({drawerShow:false})
  //  刷新页面
   this.getTableData(this.nowPage,this.pageSize)
  }
  render() {
    let {colums,data,spinning,total,pageSize,drawerShow,updateData} = this.state
    return (
        <Fragment>
          <Spin spinning={spinning}>
            <Card title='用户列表' >

            <Table pagination={false} rowKey='_id' columns={colums} dataSource={data}></Table>
            </Card>
            <Pagination total={total} pageSize={pageSize} onChange={(nextPage,pageSize)=>{
                  this.getTableData(nextPage,pageSize)
            }}></Pagination>
          </Spin>
          {/* 修改的抽屉 */}
          <Drawer
            title="账号修改"
            placement="right"
            closable={false}
            onClose={()=>{this.setState({drawerShow:false})}}
            visible={drawerShow}
          >
            <UserUpate updateData={updateData}  closeDrawer={this.closeDrawer}></UserUpate>
          </Drawer>
        </Fragment>

    );
  }
}

export default UserList;
