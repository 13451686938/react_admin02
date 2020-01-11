import React, {Component} from 'react'
import { Card, Button,Popconfirm, Table, Modal,message} from 'antd'
import {PAGE_SIZE} from '../../Utils/constants'
import {getRoles,reqAddRole,reqUpdateRole, DelRole} from '../../Api/Role'
import AddForm from './Add-form'
import AuthForm from './Auth-form'
import {formateDate} from '../../Utils/dateUtils'
class Role extends Component {
  constructor(){
    super()
    this.state = {
      roles: [
        // {
        //   "_id": "3",
        //   "mensu": [
        //       "/home",
        //       "/role"
        //   ],
        //   "name": "经理",
        //   "auth_name": "admin",
        //   "create_time": 1578493853038
        // },
        // {
        //     "menus": [],
        //     "_id": "4",
        //     "name": "经理",
        //     "auth_name": "admin",
        //     "create_time": 1578493853038
        // },
        // {
        //   "menus": [],
        //   "_id": "513",
        //   "mensu": [
        //       "/home",
        //       "/role"
        //   ],
        //   "name": "经理",
        //   "auth_name": "admin",
        //   "create_time": 1578493853038
        // },
        // {
        //     "menus": [],
        //     "_id": "14",
        //     "name": "经理",
        //     "auth_name": "admin",
        //     "create_time": 1578493853038
        // }
      ], // 所有角色的列表
      columns : [
        {
          title: '角色名称',
          dataIndex: 'name'
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          render: (create_time) => formateDate(create_time)
        },
        {
          title: '授权时间',
          dataIndex: 'auth_time',
          render: formateDate
        },
        {
          title: '操作',
          key: 'action',
          // dataIndex:'_id',
          render:(record)=> {
            return(
              <div>
                <Popconfirm
                title='你确定要删除嘛?'
                onConfirm={()=>{
                  this.Del(record._id)
                }}
                onCancel={()=>{
                  message.info('取消删除')
                }}
  
                okText='删除'
                cancelText="取消"
  
                >
                  <Button type='danger' size='small'>删除</Button>
                </Popconfirm>
              </div>
            )
          }
        },
      ],
      role: {}, // 选中的role
      isShowAdd: false, // 是否显示添加界面
      isShowAuth: false, // 是否显示设置权限界面
    }
    this.auth = React.createRef()
  }
 
  onRow = (role)=>{
    return{
      onClick:event =>{
        this.setState({role})
      }
    }
  }

   /*
  添加角色
   */
  addRole = () => {
    // 进行表单验证, 只能通过了才向下处理
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 隐藏确认框
        this.setState({
          isShowAdd: false
        })
        // 收集输入数据
        const {roleName} = values
        this.form.resetFields() // 
        // 请求添加
        const result = await reqAddRole(roleName)
        // 根据结果提示/更新列表显示
        if (result.status===0) {
          message.success('添加角色成功')
        } else {
          message.success('添加角色失败')
        }
        this.init()
      }
    })
  }

  /*
  更新角色
   */
  updateRole = async () => {

    // 隐藏确认框
    this.setState({
      isShowAuth: false
    })

    const role = this.state.role
    // 得到最新的menus
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = this.props.name

    // 请求更新
    const result = await reqUpdateRole(role)
    if (result.status==0) {
      
      // 如果当前更新的是自己角色的权限, 强制退出
      if (role._id === this.props.role_id) {
        this.props.logout()
        message.success('当前用户角色权限成功')
      } else {
        message.success('设置角色权限成功')
        this.setState({
          roles: [...this.state.roles]
        })
      }
      this.init()
    }else{
      message.success('更新角色异常, 请重新尝试')
    }
  }

  Del(roles_id){

    DelRole(roles_id).then(()=>{
     
      // console.log(roles_id)
    })
    this.init()

    // console.log('删除id',id)
   
  }
  componentDidMount(){
    this.init()
  }
  init(){
    getRoles()
    .then((res) => {
      // console.log(res)
      this.setState({roles:res.data})
    })
  }
    
  render(record){
    const {roles, role, isShowAdd, isShowAuth,columns} = this.state
    const title = (
      <span>
        <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>创建角色</Button> &nbsp;&nbsp;
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShowAuth: true})}>设置角色权限</Button>
      </span>
    )
    return(
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={columns}
          pagination={{defaultPageSize: PAGE_SIZE}}
          rowSelection={{
            type: 'radio', selectedRowKeys: [role._id],
          }}
          onRow={this.onRow}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({isShowAdd: false})
            this.form.resetFields()
          }}
        >
          <AddForm
            setForm={(form) => this.form = form}
          />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({isShowAuth: false})
          }}
        >
          <AuthForm ref={this.auth} role={role}/>
        </Modal>
      </Card>

    )
  }
}
export default Role