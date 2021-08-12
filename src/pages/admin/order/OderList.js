import React, { useEffect, useState } from 'react'

import { Drawer, Form, Button, Col, Row, Input, Select, Card, Table, Popconfirm, Modal, Space, Divider, Descriptions, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { OrderEndApi, OrderExtendApi, OrderListApi } from '../../../services/order';
import './Order.css'


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

    const loadData=()=>{
      OrderListApi().then(res=>{
        setDataSource(res.data.data)
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

    // Table Collection Data
    const colomns = [{
      title: 'ID',
      key:'index',
      render: (txt, record, index) => index + 1,
    },{
      title: 'Order ID',
      dataIndex: 'b_id',
      className:'tableHidden'
    },{
      title: 'Booker ID',
      dataIndex: 'u_id'
    },{
        title: 'Terminal ID',
        dataIndex: 'e_id'
    },{
      title: 'Subscribe Date',
      dataIndex: 'subscribe_date',
    },{
      title: 'Expire Date',
      dataIndex: 'expire_date'
    },{
      title: 'Extend Time',
      dataIndex: 'extend'
    },{
      title: 'Operation',
      render: (txt,record,index) => {
        return(
          <div>
            <Space split={<Divider type="vertical" />}>
              <Popconfirm title= 'Extend for 3 days?' 
              onConfirm={()=>{
                OrderExtendApi({b_id : record.b_id}).then(res=>{
                  if(res.data.code==='200'){
                    console.log(record.b_id+'extended!')
                    message.info(res.message)
                    loadData()
                  }else{
                    message.info(res.message)
                  }
                })
              }}
              >
                <Button type='primary' size='small' > Extend </Button>
              </Popconfirm>
              <Popconfirm title= 'Sure Release?'
              onConfirm={()=>{
                OrderEndApi({b_id : record.b_id}).then(res=>{
                  if(res.data.code===200){
                    console.log(record.b_id+'ended!')
                    message.info(res.message)
                    loadData()
                  }
                  })
              }}
              >
                <Button type='primary' danger size='small' > Release </Button>
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
            <Table rowKey='index' columns={colomns} bordered 
            pagination={{
              onchange: ()=>{
                loadData()
              }
            }}
            dataSource={dataSource}/>
          </Card>
        </div>
    )
}

export default OrderList
