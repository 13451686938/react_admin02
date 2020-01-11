import React,{Component,Fragment} from 'react'
import {foodAdd} from '../../Api/Shop'
import Styles from './css/add.module.less'

import cityOptions from './tableData/cityOptions'
import {connect} from 'react-redux'
import actionCreator from '../../Store/actionCreator'
import {bindActionCreators} from 'redux'
// import img1 from '../../../public/img/0.jpg';
import {Card, message,Button,Cascader } from 'antd';

class List extends Component{
  constructor() {
    super()
    this.state = {
      name: '', price: '', img: null, foodType: '服装T恤', desc: '',
      options : [
        {
          value: '服装',
          label: '服装',
          children: [
            {
              value: 'T恤',
              label: 'T恤',
            },
            {
              value: '裤装',
              label: '裤装',
            },
          ],
        },
        {
          value: '手机数码',
          label: '手机数码',
          children: [
            {
              value: '手机',
              label: '手机',
            },
            {
              value: '配件',
              label: '配件',
            },
          ],
        },
        {
          value: '食品',
          label: '食品',
          children: [
            {
              value: '巧克力',
              label: '巧克力',
            },
            {
              value: '糖果',
              label: '糖果',
            },
          ],
        }]
    }
  }
 
  upload = ()=>{
    let file = this.refs.file.files[0]
    let fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = ()=> {
      message.success('图片上传ok')
      this.setState({img:fileReader.result})
      //  console.log('result', fileReader.result)
    }
   
  }
  submit = ()=> {
    let obj = this.state
    foodAdd(obj)
    .then((res) => {
      console.log('res', res)
      message.success('商品添加成功')
      // this.props.history.push('/admin/food/list')
    })
    .catch(()=>{
      message.error('商品添加失败')
    })
  }
  render () {
    let {name,price,img,foodType,desc} = this.state
    return (
      <Fragment>商品添加
        <Card className = {Styles.add}>
          名字：<input type='text' value={name} onChange = {(e)=>{
            this.setState({name:e.target.value})
          }}></input><br/>
          价格：<input type='text' value={price} onChange = {(e)=>{
            this.setState({price:e.target.value})
          }}></input><br/>
          所在地: <Cascader className = {Styles.cascader}
            defaultValue={['河南省', '南阳市','邓州市']}
            options={cityOptions}
            onChange = {(value)=>{
              console.log('e',value,value.join('/'))
              
            }
            }/><br/>
          类型：<Cascader className = {Styles.cascader}
            defaultValue={['服装', 'T恤']}
            options={this.state.options}
            onChange = {(value)=>{
              console.log('e',value,value.join('/'))
              this.setState({foodType:value.join('/')})
            }
            }/><br/>
          描述：<input type='text' value={desc} onChange = {(e)=>{
            this.setState({desc:e.target.value})
          }}></input><br/>
          图片：<input type='file' ref='file'></input>
          <Button onClick={this.upload}>上传</Button><br/>
          缩略图： <div >
            {img?<img src={img} width='80' height='60' alt ='null' />:
            <img src='./img/11.jpg'width='80' height='60'></img>}
            </div>
          <Button onClick={this.submit}>提交</Button>
        </Card>
        
      </Fragment>
    )
  }
}
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionCreator,dispatch)
})(List)