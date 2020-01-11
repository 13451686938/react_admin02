import React, { Component, Fragment, version } from 'react'
import { Table,Descriptions } from "antd";
import styles from './OrderDetail.module.less'
class OrderDetail extends Component{
  constructor(props){
    super()
    this.state = {
      detailInfo:props.detailData,
    }
  }
    render() {
      let {orderId,userName,pay,note,person,address,iphone,product} = this.state.detailInfo
      console.log(product)
      let result = {}
      product.map((item,index) => {
        result = item
      })
      console.log(result)
      let {productName,productPic,productPrice,productNum,productAllPrice}= result
      return (
        <div className={styles.drawer}>
          <Descriptions title="基本信息" column={2} >
            <Descriptions.Item label="订单号">{orderId}</Descriptions.Item>
            <Descriptions.Item label="订单用户" >{userName}</Descriptions.Item>
            <Descriptions.Item label="状态" >{pay}</Descriptions.Item>
            <Descriptions.Item label="订单备注" >{note}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="收货信息" column={2} >
            <Descriptions.Item label="收货人" >{person}</Descriptions.Item>
            <Descriptions.Item label="联系电话" >{iphone}</Descriptions.Item>
            <Descriptions.Item label="收货地址" >{address}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="订单明细" layout="vertical" bordered={true} column={5}>
            <Descriptions.Item label="商品名称">{productName}</Descriptions.Item>
            <Descriptions.Item label="商品图片">
              <img src={productPic} style={{width:'20px',height:'20px'}}/>
              </Descriptions.Item>
            <Descriptions.Item label="商品单价">{productPrice}</Descriptions.Item>
            <Descriptions.Item label="商品数量">{productNum}</Descriptions.Item>
            <Descriptions.Item label="总价">{productAllPrice}</Descriptions.Item>
          </Descriptions>
        </div>  
      )
    }
  }
export default OrderDetail