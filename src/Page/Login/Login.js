import React from 'react'
import {setItem} from '../../Utils/webStorage'
import Styles from './login.module.less'
import {userLogin} from '../../Api/User'
import {Form,Input,Button,Icon,Card,message} from 'antd'

class Login extends React.Component{
  login = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        userLogin(values)
        .then((res)=>{
          console.log('log ok',res)
            setItem('rootId', ['0','1','2','3','4'])
            setItem('token', res.token)
            message.success('登录成功3S后跳转首页',1,()=>{
              this.props.history.replace('/admin/home')
            })
        })
        .catch((err)=>{
          console.log('log not ok', err)
          message.error('log is not ok')
        })
      }
      else{
        message.error('用户输入有误，请重试')
      }
    });
  }
  render () {
    // antd的表单验证
    let {getFieldDecorator} = this.props.form
    return (
      <Card className={Styles.login}>
        <div className="login-form">
            <Form.Item>
           { getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' },
            { max:9, message: '最大长度为9' },
            { min:3, message: '最小长度为3' }
          ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('passWord', {})(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="PassWord"
                />
              )}
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" onClick={this.login} className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </div>
      </Card>
    )
  }
}
export default Form.create({})(Login)