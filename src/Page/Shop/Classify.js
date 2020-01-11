import React,{Component,Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import Styles from './css/classify.module.less'
// import {getFoods,delFood} from '../../Api/Shop'
import {connect} from 'react-redux'
import actionCreator from '../../Store/actionCreator'
import {bindActionCreators} from 'redux'
import ClassifyAdd from './ClassifyAdd'
import ClassifyUpdate from './ClassifyUpdate'
import { Layout,Table,Icon,Button,message,Drawer} from 'antd';

const { Header,  Content } = Layout;

class Classify extends Component{
  constructor() {
    super()
    this.state = {
      classToggle: false,
      name:'xiaohong',
      visible: false,
      toUpdate: {},
      updateInd: 0,
      data: [
        {num:1,one:"服装",two:"T恤",key:'1-1'},
        {num:2,one:"服装",two:"裤装",key:'1-2'},
        {num:3,one:"手机数码",two:"手机",key:'2-1'},
        {num:4,one:"手机数码",two:"配件",key:'2-2'},
        {num:5,one:"食品",two:"巧克力",key:'3-1'},
        {num:6,one:"食品",two:"糖果",key:'3-2'}
      ],
      columns : [
        {
          title: "编号",
          dataIndex: 'num',
          key: 'num',
          fixed:'left'
        },
        {
          title: "一级分类",
          dataIndex: 'one',
          key: 'one',
          fixed:'left'
        },
        {
          title: "二级分类",
          dataIndex: 'two',
          key: 'two'
        },
        {
          title: "代号",
          dataIndex: 'key',
          key: 'key'
        },
        {
          title: "操作",
          key: 'item',
          render:(record)=>{
            let {data} = this.state
            return(
              <Fragment>
                <Button onClick = {()=> {
                  console.log('record', record)
                  this.setState({toUpdate: record})
                  let ind = 0
                  data.map((item,index) => {
                    this.setState({visible: true})
                    if(item.key===record.key){
                      ind =  index
                    }
                  })
                  this.setState({updateInd:ind})
                }}>编辑</Button>
                <Button type="danger" onClick={() => {
                  let ind = 0
                  data.map((item,index) => {
                    if(item.key===record.key){
                      ind = index
                    }
                  })
                  console.log('ind', ind)
                  data.splice(ind, 1)
                  this.setState({data})
                  message.success('删除成功')
                }}>删除</Button>
              </Fragment>
            )
          }
        }
      ]
    }
  }
  classifyAddFn = (msg,bool) => {
    console.log('msg', msg)
    let {data} = this.state
    if(msg.num&&msg.one&&msg.two&&msg.key){
      data.push(msg)
      this.setState({data})
    }else{
    message.error('您已取消添加')
    }
    this.setState({classToggle:bool})
  }
  returnData = (val) => {
    console.log('returnData', val)
    let {data,updateInd} = this.state
    this.setState({visible:false})
    data.splice(updateInd,1,val)
  }
  render () {
    return (
      
        <Fragment>
        {this.state.classToggle?
        <ClassifyAdd toFa={(msg,bool)=> this.classifyAddFn(msg,bool)} toSon={this.state.data}></ClassifyAdd>:
        <Fragment>
          <Header className={Styles.classify}>
            <Icon type='setting'></Icon>
            <span>商品类型</span>
            <Button type="primary" onClick = {() => {
              this.setState({classToggle: true})
            }}>添加</Button>
          </Header>
          <Content>
            <Table columns={this.state.columns} dataSource={this.state.data} pagination={false}/>
          </Content>
        </Fragment>}
        <Drawer
          title="商品分类更新"
          placement="right"
          closable={false}
          width={840}
          onClose={()=>{
            this.setState({visible: false})
          }}
          visible={this.state.visible} returnData = {this.props.data} t
        >
          <ClassifyUpdate toUpdate = {this.state.toUpdate}  returnData = {(val) => this.returnData(val)}></ClassifyUpdate>
        </Drawer>
      </Fragment>
    )
  }
}
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionCreator,dispatch)
})(withRouter(Classify))