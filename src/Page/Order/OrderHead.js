import React, { Component, Fragment } from 'react' 
import { Form, Row, Col, Input, Button, Icon,Select,DatePicker,Typography } from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import actionCreator from '../../Store/actionCreator'
import styles from './OrderHead.module.less'
import { findOrder,findOneOrder} from '../../Api/order'
const {Option} =Select
class OrderReact extends Component{
  constructor(){
    super()
    this.state={
      date:''
    }
  }  
  handleSearch = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
      let {date} = this.state 
      for(const item in values){
          if(item =='time'){
               values[item] = date
          }
          if(item =='getFood'){
             if(!isNaN(values[item])){
                values.iphone=values[item]
             }else{
                values.person=values[item]
             }
          }
      }
      let obj={}
      for(const item in values){
        if(values[item]){
          obj[item]=values[item]
        }
      }
      if(Object.keys(obj).length==0){
        this.props.getOrder()
      }else if(Object.keys(obj).length==1){
        this.oneOrder(obj)
      }else{
        this.order(obj)
      }    
    })
  }
  oneOrder(obj){
    findOneOrder(obj)
    .then((res) =>{
      this.props.changeOrder(res)
    })
  }
  order(obj){
    findOrder(obj) 
    .then((res) => {
      this.props.changeOrder(res)
    })
  }
  handleReset = () => {
    this.props.form.resetFields()
    this.props.getOrder()
  }
  dateChange=(date,dateString)=>{
    this.setState({date:dateString})
  }
  render() {
    let {obj} = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className={styles['ant-advanced-search-form']}>
        <Row>
          <Col style={{float:'left'}}>
            <Icon type="setting" />
            <span style={{paddingLeft:"5px"}}>筛选搜索</span>
          </Col>
          <Col style={{float:'right'}}>
          <Button  onClick={this.handleReset}>
            Clear
          </Button>
          <Button type="primary" onClick={this.handleSearch} style={{ marginLeft: '8px' }}>
            Search
          </Button>
        </Col>
      </Row>
      <Row gutter={24} className={styles['ant-search-form']}>
          <Form.Item label="输入搜索" className={styles['ant-form-item']}>
            {getFieldDecorator('orderId', {
            })(<Input placeholder="订单编号" />)}
          </Form.Item>
          <Form.Item label="收货人" className={styles['ant-form-item']}>
          {getFieldDecorator('getFood')(<Input placeholder="收货人姓名/手机号码" />)}
          </Form.Item>
          <Form.Item label="下单时间" className={styles['ant-form-item']}>
          {getFieldDecorator('time')(<DatePicker onChange={this.dateChange}></DatePicker>)}
          </Form.Item>
          <Form.Item label="订单状态" className={styles['ant-form-item']}>
          {getFieldDecorator('pay')(<Select  style={{ width: 120 }} placeholder='全部'>
              <Option value='未付款'>未付款</Option>
              <Option value='已付款'>已付款</Option>
            </Select>)}
          </Form.Item>
      </Row>
    
    </Form>
    )
  }
}


export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionCreator,dispatch)
})(withRouter((Form.create({})(OrderReact))))