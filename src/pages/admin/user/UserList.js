import React, { useState } from 'react'

import { Drawer, Form, Button, Col, Row, Input, Select, Card, Table, Popconfirm, Modal, Space, Divider, Descriptions } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
    const [isFormVisible, setIsFromVisble] = useState(false);
    
    const onClose = () => {
      setIsFromVisble(false)
    };

    const showDrawer = () => {
      setIsFromVisble(true)
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
      dataIndex: 'id'
    },{
      title: 'User Name',
      dataIndex: 'username'
    },{
      title: 'Email',
      dataIndex: 'email',
    },{
      title: 'Group',
      dataIndex: 'group_name'
    },{
      title: 'Staff Access',
      dataIndex: 'is_staff'
    },{
      title: 'Superuser Access',
      dataIndex: 'is_superuser'
    },{
      title: 'Approver',
      dataIndex: 'approver'
    },{
      title: 'Operation',
      render: (txt,record,index) => {
        return(
          <div>
            <Space split={<Divider type="vertical" />}>
              <Button type='primary' size='small' onClick={showModal}>Edit</Button>
              <Popconfirm title= 'Sure Delete?'>
                <Button type='primary' danger size='small'> Delete </Button>
              </Popconfirm>
            </Space>

            <Modal title="User Detail" width={1000} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Descriptions
                bordered
                extra={<Button type="primary"> Reset Password </Button>}
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
            </Modal>
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
          <Table columns={colomns} bordered dataSource={dataSource}/>
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
              <Button onClick={onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
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
                  <Select placeholder="Please choose the group">
                    <Option value="vxRail_day0_team"> VxRail Day0 Team </Option>
                    <Option value="vxRail_day1_team"> VxRail Day1 Team </Option>
                    <Option value="vxRail_day2_team"> VxRail Day2 Team </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="approver"
                  label="Approver"
                  rules={[{ required: true, message: 'Please choose the approver' }]}
                >
                  <Select placeholder="Please choose the approver">
                    <Option value="jack"> Jack Ma </Option>
                    <Option value="tom"> Tom Liu </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="is_staff"
                  label="Is Staff"
                  rules={[{ required: true, message: 'Please select the staff access' }]}
                >
                  <Select placeholder="Please select the staff access">
                    <Option value="ture"> Ture </Option>
                    <Option value="false"> False </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="is_superuser"
                  label="Is Superuser"
                  rules={[{ required: true, message: 'Please select the superuser access' }]}
                >
                  <Select placeholder="Please select the superuser access">
                    <Option value="ture"> Ture </Option>
                    <Option value="false"> False </Option>
                  </Select>
                </Form.Item>
              </Col>


            </Row>
          </Form>
        </Drawer>
        </div>
    )
}

export default UserList
