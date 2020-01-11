import React,{Component,Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import Styles from './css/list.module.less'
import {delFood,getFoodsByType,getFoodsAll,getFoodsBykw} from '../../Api/Shop'
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
          render : (record)=>{
            return (
              <Fragment>
                <Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked 
                  onChange = {(props) => {
                     record['state']=props?1:2
                      console.log('record',props, record.state)
                   
                  }}
                />
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
      loading: false,
      selectedRowKeys: [],
      searchByType:[]
    }
  }
  getShopData = (v1,v2) => {
    let {dataList} = this.state
    let {page,pageSize} = this.props
    page = v1||page
    pageSize = v2||pageSize
    let params = {page,pageSize}
    this.props.GET_SHOPS_LIST(params)
    let allCounts = dataList.length
    this.setState({dataList:this.props.shopsList,page,pageSize,allCount:allCounts})
    console.log('this.props', page,pageSize)
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
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys,selectedRows });
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name
      })
    }
    const hasSelected = this.state.selectedRowKeys.length > 0;
    return (
      <Fragment>
        <Icon type='search'></Icon><span>筛选搜索</span><br/>
        <Button style={{float:'right'}}>重置</Button>
        <Button style={{float:'right'}} type='danger'  className = {Styles.button} onClick = {()=>{
           this.setState({drawerBool: true})
          }}>搜索</Button>
          {this.state.drawerBool?<DrawerCom></DrawerCom>:<span>''</span>}
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
                name.map((item,index)=>{
                  let a = new RegExp(e.target.value)
                  if(a,item.match(a)){
                    tem.push(this.state.shopsList[index])
                  }
                })
                if(tem.length>0){
                  tem = tem.map((item)=>{item['state']=1
                  return item}
                  ) 
                 }
                console.log('tem', tem)
                this.setState({tem})
              }}></Input>
            </Col>
            <Col span={10} style={{display:'flex'}}>
              <div style={{width:'90px'}}>商品类型:</div><Cascader className = {Styles.cascader}
                width={300}
                defaultValue={['服装', 'T恤']}
                options={options}
                onChange={(value) => {
                  this.setState({findByType:value})
                  getFoodsAll().then((res) =>{
                    let allList = res.list.foods.map((item) => {
                      item.foodType = item.foodType.join('')
                      return item
                    })
                    let tem2 = []
                    console.log(value.join(''))
                    allList.filter((item)=>{
                      if(item.foodType == value.join('')){
                        tem2.push(item)
                      }
                    })
                    console.log(tem2)
                })
                  console.log('value', value.join(''))
                  console.log(data)
                }}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col> 商品状态：
              <select defaultValue='0' onChange = {(e)=>{
                this.setState({findByState:e.target.value},()=>{
                  let name = this.state.shopsList.map((item)=>{
                    item.state = this.state.findByState
                    return item
                  })
                  console.log('name',name)
                  
                })
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
            <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.tem.length>0?this.state.tem:data} pagination={false}/>
            <Button type="primary" onClick={() => {
             this.state.selectedRows.map((item) => {
                this.setState({ loading: true })
                
                delFood({foodId:item._id})
                .then((res)=>{
                  console.log('del', res)
                  this.getShopData()
                })
                .catch((err) => {
                  console.log('delerr', err)
                })
                setTimeout(() => {
                  this.setState({
                    selectedRowKeys: [],
                    loading: false,
                  });
                }, 1000)
              })
              
            }}
              
              disabled={!hasSelected} loading={this.state.loading}>
              Reload
            </Button>
            
            <Pagination style={{float:'right'}} total = {allCount} pageSize = {5} onChange={(nextPage,pageSize) => {
              console.log(nextPage,pageSize)
              this.props.GET_SHOPS_LIST({page:nextPage,pageSize}) 
              this.props.CHANGE_SHOPS_PAGE({page:nextPage,pageSize}) 
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