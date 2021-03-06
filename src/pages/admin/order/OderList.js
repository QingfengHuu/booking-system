import React, { useEffect, useState } from 'react'

import { Button, Card, Table, Popconfirm, Space, Divider, message } from 'antd';
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
      key:'b_id',
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
                  if(res.data.code===200){
                    message.info(res.data.msg)
                    loadData()
                  }else{
                    message.info(res.data.msg)
                  }
                })
              }}
              >
                <Button type='primary' size='small' disabled={(record.extend==0)?true:false} > Extend </Button>
              </Popconfirm>
              <Popconfirm title= 'Sure Release?'
              onConfirm={()=>{
                OrderEndApi({b_id : record.b_id}).then(res=>{
                  if(res.data.code===200){
                    console.log(record.b_id+'ended!')
                    message.info(res.data.msg)
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
          <Card title='Order List' style={{marginTop:'1%', borderRadius:'10px'}}>
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
