import React, { Component, Fragment, version } from 'react'
import { Table,Descriptions,Button } from "antd";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../Store/actionCreator'
import styles from './OrderDetail.module.less'
class OrderDetail extends Component{
  constructor(props){
    super()
    this.state={
      detailInfo:props.detailData 
    }
  }
    render() {
      let {orderId,userName,pay,note,person,address,iphone,product} = this.state.detailInfo
      let result = {}
      let arr = product||[]
      arr.map((item) => {
        result = item
      })
      let {productId,productName,productPic,productPrice,productNum,productAllPrice}= result
      return (
        <div className={styles.drawer}>
          <Button onClick={()=>{
            this.props.closeDrawer()
          }} icon='close' style={{float:'right'}}></Button>
          <Descriptions title="基本信息" column={2} className={styles.drawerItem}>
            <Descriptions.Item label="订单号" >{orderId}</Descriptions.Item>
            <Descriptions.Item label="订单用户" >{userName}</Descriptions.Item>
            <Descriptions.Item label="状态" >{pay}</Descriptions.Item>
            <Descriptions.Item label="订单备注" >{note}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="收货信息" column={2} >
            <Descriptions.Item label="收货人" >{person}</Descriptions.Item>
            <Descriptions.Item label="联系电话" >{iphone}</Descriptions.Item>
            <Descriptions.Item label="收货地址" >{address}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="订单明细" layout="vertical" bordered={true} column={6}>
          <Descriptions.Item label="ID">{productId}</Descriptions.Item>
            <Descriptions.Item label="商品名称">{productName}</Descriptions.Item>
            <Descriptions.Item label="商品图片">
              {productPic?<img src={productPic} style={{width:'20px',height:'20px'}}/>:''}
              </Descriptions.Item>
            <Descriptions.Item label="商品单价">{productPrice}</Descriptions.Item>
            <Descriptions.Item label="商品数量">{productNum}</Descriptions.Item>
            <Descriptions.Item label="总价">{productAllPrice}</Descriptions.Item>
          </Descriptions>
        </div>  
      )
    }
  }
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionCreator,dispatch)
})(withRouter(OrderDetail))