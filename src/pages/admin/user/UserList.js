import React, { useState,useEffect } from 'react'

import { Drawer, Form, Button, Col, Row, Input, Select, Card, Table, Popconfirm, Modal, Space, Divider, Descriptions, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UserListApi,UserCreateApi, UserDelApi, UserResetApi } from '../../../services/user';

// Account DataSource: due to the disconnection with the backend
// const dataSource = [{
//   id:'1',
//   password:'********',
//   last_login:'2021/07/30',
//   is_superuser:'false',
//   username:'Javis',
//   first_name:'Javis',
//   last_name:'Huang',
//   email:'javis_huang@dell.com',
//   is_staff:'false',
//   is_active:'true',
//   date_joined:'2021/07/01',
//   group_name: 'VxRail Day0 Team',
//   location: 'Wu Jiao Chang',

//   approver: 'Tom Liu'
// }]

const UserList=(props) => {
    // Drawer Trigger Setting
    const [isFormVisible, setIsFormVisble] = useState(false);
    const [dataSource1, setDataSource1] = useState([]);

    useEffect(() => {
      UserListApi().then(res =>{
        setDataSource1(res.data.data);
      })
    }, [])
    
    const onClose = () => {
      setIsFormVisble(false)
    };

    const showDrawer = () => {
      setIsFormVisble(true)
    };

    // Table Trigger Setting
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    // Table Collection Data
    const colomns = [{
      title: 'ID',
      key:'index',
      render: (txt, record, index) => index + 1,
    },{
      title: 'User Name',
      key: 'username',
      dataIndex: 'username'
    },{
      title: 'Email',
      dataIndex: 'email',
    },{
      title: 'Group',
      dataIndex: 'group_name'
    },{
      title: 'Operation',
      render: (txt,record,index) => {
          console.log(record)
        return(
          <div>
            <Space split={<Divider type="vertical" />}>
              <Popconfirm title= 'Sure Reset?'
              onConfirm={()=>{
                UserResetApi(record.username).then(res=>{
                  if(res.data.code===200){
                    console.log(record.username+' modified!')
                    message.info('Success!')
                    props.history.push('/admin/user')
                  }else{
                    console.log("Reset failed!")
                    message.info('Failed!')
                  }
                })
              }}>
              <Button type='primary' size='small' >Reset</Button>
              </Popconfirm>
              <Popconfirm title= 'Sure Delete?'
              onConfirm={()=>{
                UserDelApi(record.username).then(res=>{
                  if(res.data.code===200){
                    console.log(record.username+' deleted!')
                    message.info('Success!')
                    props.history.push('/admin/user')
                  }else{
                    console.log("You dont't have permission")
                    message.info('Failed!')
                  }    
                })
              }}>
                <Button type='primary' danger size='small' > Delete </Button>
              </Popconfirm>
            </Space>
          </div>
          
        )
      }
    }
  ]
  

    return (
        <div>
        <Card title='Account List' 
          extra={
            <Button type="primary" onClick={showDrawer}>
              <PlusOutlined /> New Account
            </Button>
          }
        >
          <Table rowKey='index' columns={colomns} bordered dataSource={dataSource1}/>
        </Card>

        <Drawer
          title="Create a new user account"
          width={720}
          onClose={onClose}
          visible={isFormVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              
            </div>
          }
        >
          <Form layout="vertical"  hideRequiredMark onFinish={(values) => {
            UserCreateApi(values).then(res=>{
              console.log(values)
              if(res.data.code===200){
                console.log('Add successful!')
                message.info(res.data.message)
                props.history.push('/admin/user')
              }else if(res.data.code===400){
                message.info(res.data.message)
              }
            })
    }} >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="username"
                  label="User Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="group_name"
                  label="Group"
                  rules={[{ required: true, message: 'Please choose the group' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Please enter group name"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item>
                    {/* <Popconfirm title= 'Sure add?'> */}
                      <Button htmlType='submit'  type="primary" >
                        Submit
                      </Button>
                    {/* </Popconfirm> */}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
        </div>
    )
        }

export default UserList
