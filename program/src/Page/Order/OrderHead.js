import React, { Component, Fragment } from 'react' 
import { Form, Row, Col, Input, Button, Icon,Select,DatePicker,Typography } from 'antd'
import styles from './OrderHead.module.less'
import { findOrder,findOneOrder} from '../../Api/order'
const {Option} =Select
class OrderReact extends Component{
  constructor(){
    super()
    this.state={
      date:'',
      obj:{}
    }
  }  
  handleSearch = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
      let {obj,date} = this.state
      for(const item in values){  
        if(values[item]){ 
          if(item =='time'){
            obj[item] = date
          }
          if(item =='getFood'){
             if(!isNaN(values[item])){
                obj.iphone=values[item]
             }else{
                obj.person=values[item]
             }
          }
          if(item == 'orderId'){
             obj[item]=values[item]
          }
        }
      }
      console.log('obj',obj)
      if(Object.keys(obj).length==1){
        this.oneOrder(obj)
      }else{
        this.order(obj)
      }    
    })
  }

  oneOrder(obj){
    findOneOrder(obj)
    .then((res) =>{
      console.log('1',res)
    })
  }
  order(obj){
    console.log('aaaaaaaaaa',obj)
    findOrder(obj) 
    .then((res) => {
      console.log(res)
    })
  }
  handleReset = () => {
    this.props.form.resetFields()
  }
  stateChange=()=>{

  }
  dateChange=(date,dateString)=>{
    // console.log(date,dateString)
    this.setState({date:dateString})
    console.log('1',this.state.dateString)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className={styles['ant-advanced-search-form']} onSubmit={this.handleSearch}>
        <Row>
          <Col style={{float:'left'}}>
            <Icon type="setting" />
            <span style={{paddingLeft:"5px"}}>筛选搜索</span>
          </Col>
          <Col style={{float:'right'}}>
          <Button  onClick={this.handleReset}>
            Clear
          </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: '8px' }}>
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
            <Select  defaultValue="全部" style={{ width: 120 }} onChange={this.atateChange}>
              <Option value='未付款'>未付款</Option>
              <Option value='已付款'>已付款</Option>
            </Select>
          </Form.Item>
      </Row>
    
    </Form>
    )
  }
}


  // <div>
  //   <WrappedAdvancedSearchForm />
  //   <div className="search-result-list">Search Result List</div>
  // </div>,

export default Form.create({})(OrderReact)