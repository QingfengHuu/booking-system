import { Form, Input, DatePicker, Button, Card, Table, Popconfirm, Modal, Radio } from 'antd';
import React, { useState } from 'react'

const {RangePicker} = DatePicker;

const dataSource = [{
  index: 1,
  team: 'HWSS',
  group: 'DELL 13G',
  title: '13G R630',
  location: 'DELL Server10',
  idrac_ip: '20.12.131.24',
  server_tag: 'HBMNBD2',
  booker: 'Cathy',
  start_date: '7/15',
  end_date: '7/20'
}]

const BookingList= (props) => {

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
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const rangeConfig = {
    rules: [
      {
        type: 'array',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

  const colomns = [{
    title: 'index',
    key: 'index',
    align: 'center',
    render: (txt,record,index) => index+1
  },{
    title: 'Team',
    dataIndex: 'team'
  },{
    title: 'Server Group',
    dataIndex: 'group',
  },{
    title: 'Title',
    dataIndex: 'title'
  },{
    title: 'Location',
    dataIndex: 'location'
  },{
    title: 'iDrac_ip',
    dataIndex: 'idrac_ip'
  },{
    title: 'Server Tag',
    dataIndex: 'server_tag'
  },{
    title: 'Booker',
    dataIndex: 'booker'
  },{
    title: 'Start Date',
    dataIndex: 'start_date'
  },{
    title: 'End Date',
    dataIndex: 'end_date'
  },{
    title: 'Operation',
    render: (txt,record,index) => {
      return(<div>
        <Button type='primary' size='small' onClick={showModal}>Reserve</Button>
        <Modal title="Reserve an equipment" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label=" Renter"
              name="Renter"
              // placeholder="Select a option and change input text above"
              rules={[{ required: true, message: 'Please input your Renter!' }]}
            >
              <Input />
            </Form.Item>
//test
            <Form.Item
              name="radio-button"
              label="Renter"
              rules={[{ required: true, message: 'Please pick an item!' }]}
            >
              <Radio.Group>
                <Radio.Button value="a">Username</Radio.Button>
                <Radio.Button value="b">Book for other?</Radio.Button>
              </Radio.Group>
            </Form.Item>

            
            <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
              <RangePicker />
            </Form.Item>

            <Form.Item
              label="Comments"
              name="Comments"
              rules={[{ required: false, message: 'Please input your comments!' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Popconfirm title= 'Sure delay?'>
        <Button type='primary' size='small' style={{margin:"0 1rem"}}>Delay</Button>
        </Popconfirm>
        <Popconfirm title= 'Sure release?'>
        <Button type='primary' danger size='small'>Release</Button>
        </Popconfirm>
      </div>
      )
    }
  }
]

  return (
    <Card title='BookingList' 
      extra={
        <Button type='primary'>
          Additional Operation
        </Button>
      }
    >
      <Table rowKey='index' columns={colomns} bordered dataSource={dataSource}/>
    </Card>
  )
}

export default BookingList

