import React from 'react'
import Styles from './admin.module.less'
import {withRouter} from 'react-router-dom'
import HeaderNav from '../../Component/HeaderNav/HeaderNav'
import CustomNav from '../../Component/CustomNav/CustomNav'
import {connect} from 'react-redux'
import actionCreator from '../../Store/actionCreator'
import {bindActionCreators} from 'redux'
import { Layout, Icon, Modal } from 'antd'
const { Header, Sider, Content } = Layout

class Admin extends React.Component {
  state = {
    collapsed: false,
    visible: true
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    let {tokenModal,setTokenModal} = this.props
    return (
      <Layout className = {Styles.layout}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={Styles['layout-logo']}>
            <img src='./img/logo512.png' alt='图片丢失'></img>
          </div>
          <CustomNav></CustomNav>
        </Sider>
        <Layout>
          <Header className={Styles.adminHeader}>
            {/* 控制侧边栏显示隐藏按钮 */}
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            {/* 导航栏 */}
            <HeaderNav></HeaderNav>
          </Header>
          {/* 内容区 */}
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {/* 接收内容 */}
            {this.props.children}
          </Content>
        </Layout>
        {/* 全局状态（token）模态框 */}
        <Modal
          title="请重新登录"
          visible={tokenModal}
          onOk={()=>{
            setTokenModal(false)
            this.props.history.replace('/login')
          }}
          onCancel={()=>{
            setTokenModal(false)
          }}
        >
          <p>可能原因：token失效</p>
          <p>可能原因：token非法</p>
        </Modal>
      </Layout>
    );
  }
}
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionCreator,dispatch)
})(withRouter(Admin))