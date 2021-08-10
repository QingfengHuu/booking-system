import React, { useEffect, useState } from 'react'

import { Drawer, Form, Button, Col, Row, Input, Select, Card, Table, Popconfirm, Modal, Space, Divider, Descriptions, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { OrderEndApi, OrderExtendApi, OrderListApi } from '../../../services/order';


// Account DataSource: due to the disconnection with the backend

const OrderList=(props) => {
    // Table Trigger Setting
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataSource, setDataSource]= useState([]);

    useEffect(()=>{
      OrderListApi().then(res=>{
        setDataSource(res.data.data)
      })
    },[])

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
      title: 'Order ID',
      dataIndex: 'b_id',
      key:'index'
    },{
      title: 'Booker ID',
      dataIndex: 'u_id'
    },{
        title: 'Terminal ID',
        dataIndex: 'e_id'
    },{
      title: 'Subscribe Date',
      dataIndex: 'subscribe_time',
    },{
      title: 'Expire Date',
      dataIndex: 'expire_time'
    },{
      title: 'End Date',
      dataIndex: 'end_time'
    },{
      title: 'Extend Times',
      dataIndex: 'extend'
    },{
      title: 'Status',
      dataIndex: 'b_status'
    },{
      title: 'Operation',
      render: (txt,record,index) => {
        return(
          <div>
            <Space split={<Divider type="vertical" />}>
              <Popconfirm title= 'Extend for 3 days?'>
                <Button type='primary' size='small' onClick={()=>{
                  OrderExtendApi({b_id : record.b_id}).then(res=>{
                    if(res.data.code==='200'){
                      console.log(record.b_id+'extended!')
                      message.info(res.data.message)
                      props.history.push('/admin/order')
                    }else{
                      message.info(res.message)
                    }
                  })
                }}> Extend </Button>
              </Popconfirm>
              <Popconfirm title= 'Sure Release?'>
                <Button type='primary' danger size='small' onClick={()=>{
                  OrderEndApi({b_id : record.b_id}).then(res=>{
                    if(res.data.code===200){
                      console.log(record.b_id+'ended!')
                      message.info(res.message)
                      props.history.push('/admin/order')
                    }
                    })
                }}> Release </Button>
              </Popconfirm>
            </Space>

          </div>
          
        )
      }
    }
  ]

    return (
        <div>
          <Card title='Order List'>
            <Table rowKey='index' columns={colomns} bordered dataSource={dataSource}/>
          </Card>
        </div>
    )
}

export default OrderList
