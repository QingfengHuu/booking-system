import React, { useState } from 'react'

import { Drawer, Form, Button, Col, Row, Input, Select, Card, Table, Popconfirm, Modal, Space, Divider, Descriptions } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

// Terminal DataSource: due to the disconnection with the backend
const dataSource = [{
  e_id: 1,
  e_team: 'HWSS',
  e_servergroup: 'DELL 13G',
  e_title: '13G R630',
  e_location: 'DELL Server10',
  e_iDrac_ip: '20.12.131.24',
  e_tag: 'HBMNBD2',
  booker: 'Cathy',
  start_date: '7/15',
  end_date: '7/20'
}]

const TerminalList=() => {
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
      dataIndex: 'e_id',
    },{
      title: 'Team',
      dataIndex: 'e_team',
    },{
      title: 'Title',
      dataIndex: 'e_title',
    },{
      title: 'Location',
      dataIndex: 'e_location',
    },{
      title: 'iDrac_Ip',
      dataIndex: 'e_iDrac_ip',
    },{
      title: 'Server Tag',
      dataIndex: 'e_tag',
    },{
      title: 'Operation',
      render: (txt,record,index) => {
        return(
          <div>
            <Space split={<Divider type="vertical"/>}>
              <Button type='primary' size='small' onClick={showModal}> View </Button>
              <Popconfirm title= 'Sure Delete?'>
                <Button type='primary' danger size='small'> Delete </Button>
              </Popconfirm>
            </Space>

            <Modal title="User Detail" width={800} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Descriptions
                bordered
                extra={
                <Space split={<Divider type="vertical" />}>
                  <Button type="primary"> Edit </Button>
                  <Button type="primary"> Extend </Button>
                </Space>
              }
              
              >
                <Descriptions.Item label="Team"> HWSS </Descriptions.Item>
                <Descriptions.Item label="Group"> DELL 13G </Descriptions.Item>
                <Descriptions.Item label="Title"> 13G R630 </Descriptions.Item>
                <Descriptions.Item label="Location"> DELL Server10 </Descriptions.Item>
                <Descriptions.Item label="idrac Ip"> 20.12.131.24 </Descriptions.Item>
                <Descriptions.Item label="Server Tag"> HBMNBD2 </Descriptions.Item>
                <Descriptions.Item label="Booker"> DELL Server10 </Descriptions.Item>
                <Descriptions.Item label="Start Date"> 7/15 </Descriptions.Item>
                <Descriptions.Item label="End Date"> 7/20 </Descriptions.Item>
                <Descriptions.Item label="Comment">
                  This terminal has some issue on the uploading function, need IT assistant to check the functionality.
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
        <Card title='Terminal List' 
          extra={
            <Button type="primary" onClick={showDrawer}>
              <PlusOutlined /> New Terminal
            </Button>
          }
        >
          <Table columns={colomns} bordered dataSource={dataSource} />
        </Card>



        <Drawer
          title="Create a new user terminal"
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
                  name="team"
                  label="Team"
                  rules={[{ required: true, message: 'Please choose terminal team' }]}
                >
                  <Select placeholder="Please choose terminal team">
                    <Option value="HWSS"> HWSS </Option>
                    <Option value="HWSA"> HWSA </Option>
                    <Option value="HWSN"> HWSN </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="group"
                  label="Group"
                  rules={[{ required: true, message: 'Please choose the group' }]}
                >
                  <Select placeholder="Please choose the group">
                    <Option value="DELL 11G"> DELL 11G </Option>
                    <Option value="DELL 12G"> DELL 12G </Option>
                    <Option value="DELL 13G"> DELL 13G </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please enter terminal title' }]}
                >
                  <Input placeholder="Please enter terminal title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="location"
                  label="Location"
                  rules={[{ required: true, message: 'Please enter terminal location' }]}
                >
                  <Input placeholder="Please enter terminal location" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="idrac Ip"
                  label="idrac Ip"
                  rules={[{ required: true, message: 'Please enter terminal idrac ip' }]}
                >
                  <Input placeholder="Please enter terminal idrac ip" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="server_tag"
                  label="Server Tag"
                  rules={[{ required: true, message: 'Please choose the server tag' }]}
                >
                  <Select placeholder="Please choose the server tag">
                    <Option value="HBMNBD1"> HBMNBD1 </Option>
                    <Option value="HBMNBD2"> HBMNBD2 </Option>
                    <Option value="HBMNBD3"> HBMNBD3 </Option>
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
                      message: 'please enter comment about this terminal',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter comment about this terminal" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    )
}

export default TerminalList
