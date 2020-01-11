import React, { Component } from 'react'
import {Form,Input,Button,Table,Cascader,Dropdown,Menu,Icon,Select} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../Store/actionCreator'
import {updateOrder} from '../../Api/order'
import addressData from './Address'
import styles from './OrderUpdate.module.less'
const {Option} = Select
class OrderUpdate extends Component{
  constructor(props){
    super()
    this.state = {
        data:props.updateData,
        columns:[
          {
            title: 'ID',
            dataIndex: 'productId',
            key: 'productId'
          },
          {
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName',
          },
          {
            title: '商品图片',
            // dataIndex: 'productPic',
            key: 'productPic',
            render:(record)=>{
              return(
                <img src={record.productPic} style={{width:'30px',height:'30px'}}/>
              )
            }
          },
          {
            title: '商品单价',
            key: 'productPrice',
            dataIndex: 'productPrice',
          },
          {
            title: '商品数量',
            key: 'productNum',
            dataIndex:'productNum'
          },
          {
            title: '商品总价',
            key: 'productAllPrice',
            dataIndex:'productAllPrice'
          },
          {
            title: '操作',
            key: 'action',
            render: (record) => (
              <Button onClick={()=>{
                 let {product} = this.state.data
                   product.map((item,index) => {
                   product.splice(index,1)
                   this.state.data.product=product
                 })
              }}>删除</Button>
            )
          }
        ]
      }
    }
    handleSearch = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        console.log('Received values of form: ', values)
        if(values.address){
          values.address = values.address.join('')
        }else{
          values.address = this.state.data.address
        }
        this.update(values) 
        
      })
    }
    update(val){
      updateOrder(val)
      .then((res) => {
        this.props.onOk()
      })
    }
   render() {
    const { getFieldDecorator } = this.props.form
    let {columns,data} = this.state
    let {_id,orderId,userName,person,iphone,address,note,pay,product} = data
    return (
      <Form onSubmit={this.handleSearch} className={styles.orderUpdate}>
        {getFieldDecorator('_id',{ initialValue: _id })}
        <Form.Item label="订单号" className={styles.orderUpdateItem}>
        {getFieldDecorator('orderId',{ initialValue: orderId })(<Input disabled/>)}
        </Form.Item>
        <Form.Item label="用户名" className={styles.orderUpdateItem}>
        {getFieldDecorator('userName',{ initialValue: userName })(<Input disabled/>)}
        </Form.Item>
        <Form.Item label="收货人" className={styles.orderUpdateItem}>
        {getFieldDecorator('person',{ initialValue: person })(<Input />)}
        </Form.Item>
        <Form.Item label="手机号" className={styles.orderUpdateItem}>
        {getFieldDecorator('iphone',{ initialValue: iphone })(<Input/>)}
        </Form.Item>
        <Form.Item label="收货地址" className={styles.orderUpdateItem}>
        {getFieldDecorator('address',)(
         <Cascader
         fieldNames={{ label: 'name', value: 'code', children: 'items' }}
         options={addressData}
         placeholder={address}
         />)}
        </Form.Item>
        <Form.Item label="备注" className={styles.orderUpdateItem}>
        {getFieldDecorator('note',{ initialValue: note })(<Input.TextArea/>)}
        </Form.Item>
        <Form.Item label="支付状态" className={styles.orderUpdateItem}>
        {getFieldDecorator('pay',{ initialValue: pay })(<Select  style={{ width: 120 }} onChange={this.stateChange}>
              <Option value='未付款'>未付款</Option>
              <Option value='已付款'>已付款</Option>
            </Select>)}
        </Form.Item>
        <Form.Item label="订单明细">
        {getFieldDecorator('product',{ initialValue: product })(<Table columns={columns} dataSource={product} pagination={false} bordered={true}
        style={{textAlign:'center'}}/>)}
        </Form.Item>
        <Form.Item className={styles.orderUpdateLast}>
        <Button type="primary" htmlType="submit" style={{ marginRight: '80px' }}>
            submit
          </Button>
          <Button  onClick={()=>{
            this.props.onCancel()
        }}>
            return
          </Button>
          
          </Form.Item>
      </Form>
    )
  }
}
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionCreator,dispatch)
})(Form.create({})(OrderUpdate))