import React,{Component} from 'react'
import {updateFood} from '../../Api/Shop'
import Styles from './css/update.module.less'
import {options} from './tableData/options'
import {Card, message,Cascader} from 'antd'

class FoodUpdate  extends Component{
  constructor(props) {
    super()
    this.state = props.updateData
  }
  componentWillReceiveProps(props){
    console.log(('prop', props))
    let {_id,name,price,foodType,img,desc} = props.updateData
    this.setState({_id,name,price,foodType,img,desc})
  }
  upload = () => {
   
    let file = this.refs.file.files[0]
    let readerObj = new FileReader()
    readerObj.onload = ()=>{
      this.setState({img:readerObj.result})
    }
    readerObj.readAsDataURL(file)
  }
  submit = () => {
    if(!this.state.img) return message.info('请先上传图片', 1)
    let msg = JSON.parse(JSON.stringify(this.state))
    msg.foodId = msg._id
    updateFood(msg)
    .then((res) => {
      message.success('菜品更新成功',0.5, () => {
        this.props.closeDrawer()
      })
    })
    .catch((err) => {
      message.error('菜品更新失败请重试')
    })
  }
  render () {
    let {name, price, img, foodType, desc,arr} = this.state
    console.log('foodType', foodType)
    return (
      <Card title='食品添加' className = {Styles.update}>
        名字： <input type='text' value={name} onChange = {(e)=> {
          name = e.target.value
          this.setState({name: name})
        }}></input><br/>
        价格： <input type='text' value={price} onChange = {(e)=> {
          price = e.target.value
          this.setState({price: price})
        }}></input><br/>
        类型： {true?<Cascader className = {Styles.cascader}
              // value = {foodType}
            defaultValue={foodType}
            options={options}
            onChange = {(value)=>{
              this.setState({foodType:value.join('/')})
            }
            }/>:<input type='text' value={foodType} onChange = {(e)=> {
              price = e.target.value
              this.setState({price: price})
            }}></input>
            }<br/>
        描述： <input type='text' value={desc} onChange = {(e)=> {
          desc = e.target.value
          this.setState({desc: desc})
        }}></input><br/>
        图片： <input type='file' ref='file'></input>
        缩略图： <img width='80' height='60' src={img} alt=''/>
        <button onClick={this.upload}>上传</button>
        <button onClick={this.submit}>submit</button>
      </Card>
    )
  }
}
export default FoodUpdate