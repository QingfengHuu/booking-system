import React, { useState,useEffect } from 'react'

import { Drawer, Form, Button, Col, Row, Input, Select, Card, Table, Popconfirm, Modal, Space, Divider, Descriptions } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UserListApi,UserCreateApi, UserDelApi, UserResetApi } from '../../../services/user';

const { Option } = Select;

// Account DataSource: due to the disconnection with the backend
const dataSource = [{
  id:'1',
  password:'********',
  last_login:'2021/07/30',
  is_superuser:'false',
  username:'Javis',
  first_name:'Javis',
  last_name:'Huang',
  email:'javis_huang@dell.com',
  is_staff:'false',
  is_active:'true',
  date_joined:'2021/07/01',
  group_name: 'VxRail Day0 Team',
  location: 'Wu Jiao Chang',

  approver: 'Tom Liu'
}]

const UserList=() => {
    // Drawer Trigger Setting
    const [isFormVisible, setIsFormVisble] = useState(false);
    const [dataSource1, setDataSource1] = useState([]);

    useEffect(() => {
      UserListApi().then(res =>{
        setDataSource1(res.data);
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

    const onFinish = (values) => {
      UserCreateApi(values).then(res=>{
        console.log(values)
      })

    };

    // Table Collection Data
    const colomns = [{
      title: 'ID',
      dataIndex: 'id'
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
        return(
          <div>
            <Space split={<Divider type="vertical" />}>
              <Popconfirm title= 'Sure Reset?'>
              <Button type='primary' size='small' onClick={()=>{
                UserResetApi(record.username).then(res=>{
                  console.log(record.username+' modified!')
                })
              }}>Reset</Button>
              </Popconfirm>
              <Popconfirm title= 'Sure Delete?'>
                <Button type='primary' danger size='small' onClick={()=>{
                UserDelApi(record.username).then(res=>{
                  console.log(record.username+' deleted!')
                })
              }}> Delete </Button>
              </Popconfirm>
            </Space>

            {/* <Modal title="User Detail" width={800} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Descriptions
                bordered
                extra={<Button type="primary">Edit</Button>}
              >
                <Descriptions.Item label="ID"> 1 </Descriptions.Item>
                <Descriptions.Item label="User Name"> Javis </Descriptions.Item>
                <Descriptions.Item label="First Name"> Javis </Descriptions.Item>
                <Descriptions.Item label="Last Name"> Huang </Descriptions.Item>
                <Descriptions.Item label="Email Address"> javis_huang@dell.com </Descriptions.Item>
                <Descriptions.Item label="Group"> VxRail Day0 Team </Descriptions.Item>
                <Descriptions.Item label="Is Active"> True </Descriptions.Item>
                <Descriptions.Item label="Is Staff"> false </Descriptions.Item>
                <Descriptions.Item label="Is Superuser"> false </Descriptions.Item>
                <Descriptions.Item label="Last Login"> 2021/07/30 </Descriptions.Item>
                <Descriptions.Item label="Approver"> Tom Liu </Descriptions.Item>
                <Descriptions.Item label="Password"> ******** </Descriptions.Item>
              </Descriptions>
            </Modal> */}
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
          <Table rowKey='username' columns={colomns} bordered dataSource={dataSource1}/>
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
          <Form layout="vertical"  hideRequiredMark onFinish={onFinish} >
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
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please enter email address' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="Please enter email address"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="group"
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
                  <Button htmlType='submit'  type="primary" >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
        </div>
    )
        }

export default UserList
