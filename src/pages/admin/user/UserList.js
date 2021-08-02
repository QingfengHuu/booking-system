import React, { useState } from 'react'

import { Drawer, Form, Button, Col, Row, Input, Select, Card, Table, Popconfirm, Modal, Space, Divider, Descriptions } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

// Account DataSource: due to the disconnection with the backend
const dataSource = [{
  index: 1,
  name: 'Javis Huang',
  email:'javis_huang@dell.com',
  group: 'VxRail Day0 Team',
  location: 'Wu Jiao Chang',
  role: 'User',
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

    // Description List Setting



    // Table Collection Data
    const colomns = [{
      title: 'Index',
      key: 'index',
      align: 'center',
      render: (txt,record,index) => index+1
    },{
      title: 'Name',
      dataIndex: 'name'
    },{
      title: 'Email Address',
      dataIndex: 'email',
    },{
      title: 'Group',
      dataIndex: 'group'
    },{
      title: 'Location',
      dataIndex: 'location'
    },{
      title: 'Role',
      dataIndex: 'role'
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

            <Modal title="User Detail" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Descriptions
                bordered
                extra={<Button type="primary">Edit</Button>}
              >
                <Descriptions.Item label="Name"> Javis Huang </Descriptions.Item>
                <Descriptions.Item label="Email Address"> javis_huang@dell.com </Descriptions.Item>
                <Descriptions.Item label="Group"> VxRail Day0 Team </Descriptions.Item>
                <Descriptions.Item label="Location"> Wu Jiao Chang </Descriptions.Item>
                <Descriptions.Item label="Role"> User </Descriptions.Item>
                <Descriptions.Item label="Approver"> Tom Liu </Descriptions.Item>
                <Descriptions.Item label="Comment">
                  None
                </Descriptions.Item>
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
                  name="name"
                  label="Name"
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
                  name="location"
                  label="Location"
                  rules={[{ required: true, message: 'Please select the location' }]}
                >
                  <Select placeholder="Please select the loation">
                    <Option value="wujiaochang"> Wu Jiao Chang </Option>
                    <Option value="zizhu"> Zi Zhu </Option>
                  </Select>
                </Form.Item>
              </Col>

            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true, message: 'Please choose the role type' }]}
                >
                  <Select placeholder="Please choose the role type">
                    <Option value="admin"> Admin </Option>
                    <Option value="user"> User </Option>
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
              <Col span={24}>
                <Form.Item
                  name="comment"
                  label="Comment"
                  rules={[
                    {
                      required: true,
                      message: 'please enter comment about this user',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter comment about this user" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
        </div>
    )
}

export default UserList
