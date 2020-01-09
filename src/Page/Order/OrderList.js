import React, { Component ,Fragment} from 'react'
import {Card ,Table, Button,Pagination,Drawer, Checkbox, Menu, Dropdown, Icon, Form } from 'antd'
import OrderDetail from './OrderDetail'
import OrderHead from './OrderHead'
import { getOrderList,delOrderList,selectDelOrderList } from "../../Api/order"
class OrderList extends Component{
  constructor(){
    super()
    this.state={  
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      data:[],
      drawerShow:false,
      detailData:{},
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
          // dataIndex: 'time',
          render:(record)=>{
            return (record.time)
          }
        },
        {
          title: '操作',
          key: 'action',
          render: (record) => (
            <span>
             <Button onClick={()=>{
                this.setState({detailData:record,drawerShow:true})
              }}>查看</Button>
             <Button onClick={this.del.bind(this,record._id)}>删除</Button>
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
      this.getTableList(nowPage,pageSize)
      this.setState({
        selectedRowKeys: [],
        loading: false,
      })
    })
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }
  getTableList(nowPage,pageSize){
    getOrderList(nowPage,pageSize)
    .then((res) => {
      console.log(res)
      this.setState({data:res.list,total:res.tolcount})
    })
  }
  componentDidMount(){
    this.getTableList()
  }
  del(id){
    delOrderList(id)
    .then((res) => {
      let {nowPage,pageSize} = this.state
      this.getTableList(nowPage,pageSize)
    })
  }
  onClose=()=>{
    this.setState({drawerShow:false})
  }
  render(){
    let {columns,data,detailData,nowPage,total,pageSize,loading, selectedRowKeys } = this.state 
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    } 
    const hasSelected = selectedRowKeys.length > 0
    return (
      <Fragment>
        <OrderHead></OrderHead>
        <div style={{marginTop:'10px',marginBottom:'10px',padding:' 10px',border:'1px solid #e8e8e8',fontSize:'16px'}}>
            <Icon type="setting" />
            <span style={{paddingLeft:'5px'}}>数据展示</span>
        </div>
        <div>
          <Table rowSelection={rowSelection} rowKey={record =>record._id} columns={columns} dataSource={data} pagination={false} bordered={true}
          style={{textAlign:'center'}}/> 
          <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
              del
          </Button>
          <Pagination  total={total} pageSize={pageSize} 
        onChange={(nextPage,pageSize)=>{
          console.log(nextPage,pageSize)
          this.getTableList(nextPage,pageSize)
          this.setState({nowPage:nextPage,pageSize})
        }} />
          </div>
        </div>
        <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.drawerShow}
          >
            <OrderDetail detailData={detailData}></OrderDetail>
          </Drawer>
      </Fragment>
    )
   }
}
export default OrderList