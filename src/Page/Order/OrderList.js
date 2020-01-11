import React, { Component ,Fragment} from 'react'
import {Card ,Table, Button,Pagination,Icon,Modal,Drawer,Popconfirm} from 'antd'
import OrderHead from './OrderHead'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../Store/actionCreator'
import styles from './OrderList.module.less'
import { getOrderList,delOrderList,selectDelOrderList } from "../../Api/order"
import OrderUpdate from './OrderUpdate'
import OrderDetail from './OrderDetail'
class OrderList extends Component{
  constructor(){
    super()
    this.state={  
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      orderList:[],
      drawerShow:false,
      temp:[],
      updateId:'',
      detailData:{},
      visible:false,
      updateData:{},
      nowPage:1,
      pageSize: 3,
      total:50,
      columns:[
        {
          title: '订单号',
          dataIndex: 'orderId',
          key: 'orderId'
        },
        {
          title: '用户名',
          dataIndex: 'userName',
          key: 'userName',
        },
        {
          title: '总额',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: '支付状态',
          key: 'pay',
          dataIndex: 'pay',
        },
        {
          title: '下单时间',
          key: 'time',
          dataIndex:'time'
        },
        {
          title: '操作',
          key: 'action',
          render: (record) => (
            <span style={{display:'flex',justifyContent:'space-around'}}>
             <Button onClick={()=>{
                this.setState({drawerShow:true,detailData:record})
              }}>查看</Button>
             <Popconfirm title="Are you sure？" onConfirm={this.del.bind(this,record._id)} onCancel={()=>{}} >
                <Button >删除</Button>
             </Popconfirm>
             <Button onClick={()=>{
               this.setState({visible:true,updateData:record})
             }}>更新</Button>
            </span>
          )
        }
      ]
    }
  }
  start = () => {
    this.setState({ loading: true })
    let {selectedRowKeys,nowPage,pageSize}=this.state
    selectDelOrderList(selectedRowKeys)
    .then((res) => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      }) 
      this.getTableList(nowPage,pageSize)
    })
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }
  getTableList(nowPage,pageSize){
    this.props.getOrder(nowPage,pageSize)
    this.setState({orderList:this.props.orderList,total:this.props.total})
  }
  componentDidMount(){
    this.getTableList()
  }
  componentWillReceiveProps(props){
    this.setState({orderList:props.orderList,total:props.total,nowPage:props.nowPage,pageSize:props.orderPageSize})
  }
  del(id){
    delOrderList(id)
    .then((res) => {
      let {nowPage,pageSize} = this.state
      this.getTableList(nowPage,pageSize)
    })
  }
  change(){
    this.setState({visible:true})
  }
  handleOk = e => { 
    let {nowPage,pageSize} = this.state
    this.setState({
      visible: false
    }) 
    this.getTableList(nowPage,pageSize)
  }
  handleCancel = e => {
    this.setState({
      visible: false
    })
  }
  closeDrawer=()=>{
    this.setState({drawerShow:false})
  }
  render(){
    let {columns,updateData,detailData,orderList,nowPage,total,pageSize,loading, selectedRowKeys,visible,drawerShow } = this.state 
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    } 
    const hasSelected = selectedRowKeys.length > 0
    return (
      <Fragment>
        <OrderHead></OrderHead>
        <div className={styles.listItem}>
            <Icon type="setting" />
            <span style={{paddingLeft:'5px'}}>数据展示</span>
        </div>
        <div className={styles.listCenter}>
          <Table rowSelection={rowSelection} rowKey={record =>record._id} columns={columns} dataSource={this.props.orderList} pagination={false} bordered={true} 
          style={{textAlign:'center'}}/> 
          <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
              del
          </Button>
          <Pagination  total={total} pageSize={pageSize} 
        onChange={(nextPage,pageSize)=>{
          this.getTableList(nextPage,pageSize)
          this.props.changePage({page:nextPage,pageSize})
        }} />
          </div>
        </div>
        <Drawer
          title="订单详情"
          placement="right"
          closable={false}
          onClose={this.closeDrawer}
          visible={drawerShow}
          width={700}
        >
          <OrderDetail detailData={detailData} closeDrawer={this.closeDrawer} ></OrderDetail>
        </Drawer>
        <Modal
          title="订单编辑"
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <OrderUpdate updateData={updateData} onOk={this.handleOk} onCancel={this.handleCancel} ></OrderUpdate>
      </Modal>
      </Fragment>
    )
   }
}
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionCreator,dispatch)
})(OrderList)