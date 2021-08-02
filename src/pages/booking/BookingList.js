import { Form, Input, DatePicker, Button, Card, Table, Popconfirm, Modal } from 'antd';
import React, { useState, useEffect } from 'react'
import { listApi } from '../../services/terminal';

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
  const [dataSource1, setDataSource1] = useState([]);
  const [total,setTotal] = useState(0);

  useEffect(() => {
    listApi().then(res =>{
      setDataSource1(res.terminal);
      setTotal(res.totalCount);
    })
  }, [])

  const loadData = (page) =>{
    listApi(page).then(res =>{
      setDataSource1(res.terminal);
      setTotal(res.totalCount);
    })
  }

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
    title: 'haha',
    dataIndex: 'haha'
  },{
    title: 'Operation',
    render: (txt,record,index) => {
      return(<div>
        <Button type='primary' size='small' onClick={showModal}>Reserve</Button>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
              <RangePicker />
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
      <Table 
        rowKey='index' 
        pagination={{total,defaultPageSize:10, onChange: loadData}} 
        columns={colomns} 
        bordered 
        dataSource={dataSource}
      />
    </Card>
  )
}

export default BookingList

