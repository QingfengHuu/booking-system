import React from 'react'
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setToken,isLogined } from '../utils/auth';
import './login.css';
import { Redirect } from 'react-router-dom';

import { loginApi } from '../services/auth';


const Login = (props) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setToken(values.username);
    console.log(values.username);
    props.history.push('/booking');
  }
    // loginApi({
    //     username=values.username,
    //     password=values.password
    // })
    // .then(res=>{
    //     if(res.code==='success'){
    //         message.success("Login successfully!")
    //         setToken(res.token)
    //         props.history.push('/dashboard')
    //     }else{
    //         message.info(res.message)
    //     }
    //     console.log(res)
    // })
    // .catch(err=>{
    //     console.log(err)
    //     message.info("Account doesn't exit!");
    // })
//   };

  return isLogined()?(
    <Redirect to='/booking' />
  ):(
      <Card className='login_card' title='DELL EMC'>
        <Form 
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            >
            <Form.Item
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your Username!',
                },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
                ]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item style={{textAlign:'center'}}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
                </Button>
            </Form.Item>
        </Form>
    </Card>
  )
}

export default Login
