import React,{Component,Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import Styles from './css/list.module.less'
import {delFood,getFoodsByType} from '../../Api/Shop'
import {connect} from 'react-redux'
import actionCreator from '../../Store/actionCreator'
import {bindActionCreators} from 'redux'
import Update from './Update'
import {options} from './tableData/options'
import DrawerCom from '../../Component/Drawer/Drawer'
import {  Form, Row, Col,Layout,Table,Icon,Button,Input,Pagination,Popconfirm, message,Drawer,Checkbox,Cascader,Switch} from 'antd';

const { Footer, Content } = Layout;

class List extends Component{
  constructor() {
    super()
    this.state = {
      dataList: [],
      shopsList: [],
      allCount : 0,
      page: 1,
      pageSize: 5,
      visible: false,
      updateData: [],
      findByName: '',
      findByState: '',
      findByType: '',
      drawerBool: false,
      tem:[],
      columns : [
        {
          title: <Checkbox></Checkbox>,
          dataIndex: 'check',
          key: 'check',
          fixed:'left',
          width:100,
          render () {
            return (
              <Checkbox></Checkbox>
            )
          }
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          fixed:'left',
          width:100
        },
        {
          title: '类型',
          dataIndex: 'foodType',
          key: 'foodType',
          width:100,
          fixed:'left'
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          width:100
        },
        {
          title: '图片',
          key: 'img',
          dataIndex: 'img',
          render(data) {
            return (<img width='100' height='60' src={data} alt='图片不见了'/>)
          }
        },
        {
          title: '描述',
          dataIndex: 'desc',
          key: 'desc',
          width:100
        },
        {
          title: '商品状态',
          key: 'state',
          width:100,
          render : ()=>{
            return (
              <Fragment>
                <Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked />
               
              </Fragment>
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          render:  (record) => {
            // console.log('record', record)
            return (
              <Fragment>
                <Popconfirm
                  title="Are you sure delete this task?"
                  onConfirm={()=>{
                    delFood({foodId:record._id})
                      .then((res)=>{
                        console.log('del', res)
                        this.getShopData()
                      })
                      .catch((err) => {
                        console.log('delerr', err)
                      })
                    message.success('删除成功')
                  }}
                  onCancel={()=>{
                    message.success('取消删除')
                  }}
                  okText="删除"
                  cancelText="取消"
                >
                  <Button type='danger'>删除</Button>
                </Popconfirm>
                {/* 更新 */}
                <Button onClick={() => {
                  let val = JSON.parse(JSON.stringify(record))
                  val.foodType = val.foodType.split('/')
                  // record.foodType = record.foodType.split('/')
                  console.log('要修改的数据', val)
                    this.setState({visible:true,updateData:val})
                  }}>修改
                </Button>
              </Fragment>
            )
          },
        },
      ],
      
      searchByType:[]
    }
  }
  getShopData = (v1,v2) => {
    let {page,pageSize,dataList} = this.state
    page = v1||page
    pageSize = v2||pageSize
    let params = {page,pageSize}
    this.props.GET_SHOPS_LIST(params)
    let allCounts = dataList.length
    this.setState({dataList:this.props.shopsList,page,pageSize,allCount:allCounts})
  }
  // 更新完毕操作
  closeDrawer = () => {
    this.setState({visible:false})
    this.getShopData(this.state.Page,this.state.pageSize)
  }
  componentWillReceiveProps(props){
    this.setState({shopsList:props.shopsList})
  }
  componentDidMount() {
    this.getShopData()
  }
  render () {
    let {updateData,searchByType} = this.state
    let {allCount} = this.props
    let data = this.state.shopsList
    return (
      <Fragment>
        <Icon type='search'></Icon><span>筛选搜索</span><br/>
        <Button style={{float:'right'}}>重置</Button>
        <Button style={{float:'right'}} type='danger'  className = {Styles.button} onClick = {()=>{
           this.setState({drawerBool: true})
          }}>搜索</Button>
          {this.state.drawerBool?<DrawerCom></DrawerCom>:<span>wu</span>}
        <Form>
          <Row gutter={24}>
            <Col span={10} style={{display:'flex'}}>
              <span style={{width:'90px'}}>商品名称：</span>
              <Input type='text' width={300} value={this.state.findByName} onChange = {(e)=>{
                this.setState({findByName:e.target.value})
                let name = []
                this.state.shopsList.map((item)=>{
                  name.push(item.name)
                })
                let tem=[]
                let tem2 = JSON.parse(JSON.stringify(this.state.shopsList))
                name.map((item,index)=>{
                  let a = new RegExp(e.target.value)
                  if(a,item.match(a)){
                    console.log(index)
                    tem.push(tem2[index])
                  }
                })
                this.setState({tem})
                console.log('this', tem)
              }}></Input>
            </Col>
            <Col span={10} style={{display:'flex'}}>
              <div style={{width:'90px'}}>商品类型:</div><Cascader className = {Styles.cascader}
                width={300}
                defaultValue={['服装', 'T恤']}
                options={options}
                onChange={(value) => {
                  console.log('val', value)
                  this.setState({findByType:value})
                }}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col> 商品状态：
              <select defaultValue='0' onChange = {(e)=>{
                this.setState({findByState:e.target.value})
                console.log('state',this.state.findByState)
              }}> 
                <option value='0'>全部</option>
                <option value='1'>上架</option>
                <option value='2'>下架</option>
              </select>
            </Col>
          </Row>
        </Form>
        <Layout>
        
          <Content>
            <Icon type='database'></Icon>
            <span>数据列表 总条数为{allCount}</span>
            <Table columns={this.state.columns} dataSource={this.state.tem?this.state.tem:data} pagination={false}/>
            <Pagination total = {allCount} pageSize = {5} onChange={(nextPage,pageSize) => {
              console.log(nextPage,pageSize)
              this.props.GET_SHOPS_LIST({page:nextPage,pageSize}) 
            }}></Pagination>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
        <Drawer
            width={840}
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={()=>{
              this.setState({visible:false})
            }}
            visible={this.state.visible}
          >
            <Update updateData={updateData} closeDrawer={this.closeDrawer}></Update>
          </Drawer>
      </Fragment>
    )
  }
}
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionCreator,dispatch)
})(withRouter(List))