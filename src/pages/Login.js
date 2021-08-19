import React from 'react'
import {Form, Input, Button, Checkbox, Card, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {setToken} from '../utils/auth';
import './login.css';
import {loginApi} from "../services/auth"

const validateMessages = {
    types: {
      email: '${label} is not a valid email!',
    },
  };


const Login = (props) => {
    const onFinish = (values) => {
        // DEBUGGING
        // setToken(values.username,values.username)
        // props.history.push('/dashboard')
        // DEBUGGING

        loginApi({
            username: values.username,
            password: values.password
        })
            .then(res => {
                if (res.data.code === 200) {
                    message.success("Login successfully!")
                    setToken(res.data.token, res.data.username, res.data.userRole)
                    props.history.push('/dashboard')
                } else {
                    message.info(res.data.message)
                }
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                message.info("Account doesn't exit!");
            })

    }

    return (
        <Card className='login_card' title='DELL EMC'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="username"
                    // label="Email" 
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            // message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/> }  placeholder="Username"/>
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
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item style={{textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Login
