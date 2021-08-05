import { Button, Card, Table, Popconfirm, Modal } from 'antd'
import React, { useState } from 'react'

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
  end_date: '7/29',
  extend:1
}]

const Account= (props) => {

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

  const currColumns = [{
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
    title: 'Start Date',
    dataIndex: 'start_date'
  },{
    title: 'End Date',
    dataIndex: 'end_date'
  },{
    title:'Extend Time',
    dataIndex:'extend'
  },{
    title: 'Operation',
    render: (txt,record,index) => {
      return(<div>
        <Button type='primary' size='small' onClick={showModal}>Reserve</Button>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Popconfirm title= 'Sure release?'>
        <Button type='primary' danger size='small'>Release</Button>
        </Popconfirm>
      </div>
      )
    }
  }
]

  const histColums = [{
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
    title: 'Start Date',
    dataIndex: 'start_date'
  },{
    title: 'End Date',
    dataIndex: 'end_date'
  },{
    title:'Extend Time',
    dataIndex:'extend'
  }
]

  return (
    <Card title='Account' 
      extra={
        <Button type='primary'>
          Change password
        </Button>
      }
    >
        <Card type='inner' title='Reserving terminal'extra={
            <Button type='primary'>
            Additional Operation
            </Button>
        }>
            <Table rowKey='index' columns={currColumns} bordered dataSource={dataSource}/>
        </Card>
        <Card type='inner' title='Reservation history'extra={
            <Button type='primary'>
            Additional Operation
            </Button>
        }>
            <Table rowKey='index' columns={histColums} bordered dataSource={dataSource}/>
        </Card>
    </Card>
  )
}

export default Account

