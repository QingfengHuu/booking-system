import React, { useState, useEffect } from 'react'

import { Drawer, Form, Button, Input, Select, Card, Table, Popconfirm,Space, Divider, Checkbox, message  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TerminalCreateApi, TerminalDelApi, TerminalListApi } from '../../../services/terminal';
import "./terminal.css"

const { Option } = Select;

// Terminal DataSource: due to the disconnection with the backend
const dataSource1 = [{
    e_id: 1,
    e_team: 'HWSS',
    e_group:'DELL 13G',
    e_cluster:'cluster',
    e_servergroup: 'DELL 13G',
    e_title: '13G R630',
    e_location: 'DELL Server10',
    e_iDrac_ip: '20.12.131.24',
    e_tag: 'HBMNBD2'
}]



// Check Box Data
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Cluster', 'Team', 'Title', 'Location', 'iDrac IP', 'Server Tag', 'Tag', 'Configuration'];
const defaultCheckedList = ['Cluster', 'Title', 'OrangLocatione', 'iDrac IP', 'Server Tag'];


const TerminalList=(props) => {
  // Check Box Setting
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    TerminalListApi().then(res =>{
      setDataSource(res.data.data);
    })
  }, [])

  const loadData=()=>{
    TerminalListApi().then(res =>{
      setDataSource(res.data.data);
    })
  }

  const [checkStrictly, setCheckStrictly] = React.useState(false);

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };


  
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
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };



    // columnSelection objects indicates the need for row selection
    const columnSelection = {
      onChange: (selectedColumnKeys, selectedColumns) => {
        console.log(`selectedColumnKeys: ${selectedColumnKeys}`, 'selectedColumns: ', selectedColumns);
      },
      onSelect: (record, selected, selectedColumns) => {
        console.log(record, selected, selectedColumns);
      },
      onSelectAll: (selected, selectedColumns, changeColumns) => {
        console.log(selected, selectedColumns, changeColumns);
      },
    };


    // Table Collection Data
    const colomns = [{
      title: 'ID',
      key:'e_id',
      render: (txt, record, index) => index + 1,
    },{
      title: 'E_ID',
      className:'tableHidden',
      dataIndex: 'e_id'
    },{
      title: 'Server Group',
      dataIndex: 'e_servergroup',
    },{
      title: 'Title',
      dataIndex: 'e_title',
    },{
      title: 'Server Tag',
      dataIndex: 'e_tag',
    },{
      title: 'Cluster',
      dataIndex: 'e_cluster',
    },{
      title: 'iDrac Ip',
      dataIndex: 'e_iDrac_ip',
    },{
      title: 'Location',
      dataIndex: 'e_location',
    },{
      title: 'Operation',
      render: (txt,record,index) => {
        return(
          <div>
            <Space split={<Divider type="vertical"/>}>
              <Button type='primary' size='small' onClick={()=>{
                  console.log(record)
                props.history.push(`/admin/terminal/edit/${record.e_id}`)
              }} > Edit </Button>
              <Popconfirm title= 'Sure Delete?'
              onConfirm={()=>{
                TerminalDelApi(record.e_id).then(res=>{
                  if(res.data.code===200){
                    console.log(record.e_title+'deleted!')
                    message.info(res.data.msg)
                    loadData()
                  }else if(res.data.code===400){
                    message.info(res.data.msg)
                  }
                })
              }}
              >
                <Button type='primary' danger size='small' > Delete </Button>
              </Popconfirm>
            </Space>
          </div>
          
        )
      }
    }
  ]


    return (
      <div>
        <Card title='Terminal List' style={{marginTop:'1%', borderRadius:'10px'}}
          extra={
            <Button type="primary" onClick={showDrawer} style={{borderRadius:'10px'}}>
              <PlusOutlined /> New Terminal
            </Button>
          }
        >
          <Table columns={colomns} 
            rowKey= "e_id"
            columnSelection={{ ...columnSelection, checkStrictly }}
            //checkstrictly cancellation
            bordered 
            pagination={{
              onchange: ()=>{
                loadData()
              }
            }}
            dataSource={dataSource} />
        </Card>



        <Drawer
          title="Create a new user terminal"
          width={'20%'}
          onClose={onClose}
          destroyOnClose={true}
          visible={isFormVisible}
          bodyStyle={{ paddingBottom: 80 }}
          
        >
          <Form layout="vertical" hideRequiredMark onFinish={(value)=>{
            TerminalCreateApi(value).then(res=>{
              console.log(res)
              if(res.data.code===200){
                message.info(res.data.msg)
                console.log('Success!')
              }
            }
            )
          }}>
              <Form.Item
                  name="e_title"
                  label="Title"
                  rules={[{ required: true, message: 'Please enter the title' }]}
              >
                  <Input placeholder="Please enter the title" />
              </Form.Item>
              <Form.Item
                  name="e_location"
                  label="Location"
                  rules={[{ required: true, message: 'Please enter the location' }]}
              >
                  <Input placeholder="Please enter the location" />
              </Form.Item>
              <Form.Item
                  name="e_iDrac_ip"
                  label="iDrac_ip"
                  rules={[{ required: true, message: 'Please enter the iDrac_ip' }]}
              >
                  <Input placeholder="Please enter the iDrac_ip" />
              </Form.Item>
              <Form.Item
                  name="e_tag"
                  label="Server Tag"
                  rules={[{ required: true, message: 'Please enter the Server Tag' }]}
              >
                  <Input placeholder="Please enter the Server Tag" />
              </Form.Item>
              <Form.Item
                  name="e_servergroup"
                  label="Server Group"
                  rules={[{ required: true, message: 'Please enter the Server Group' }]}
              >
                  <Input placeholder="Please enter the Server Group" />
              </Form.Item>
              <Form.Item
                  name="e_geolocation"
                  label="Geo Location"
                  rules={[{ required: true, message: 'Please enter the Geo Location' }]}
              >
                  <Input placeholder="Please enter the Geo Location" />
              </Form.Item>
              <Form.Item
                  name="e_cluster"
                  label="Cluster"
                  rules={[{ required: true, message: 'Please enter the Cluster' }]}
              >
                  <Input placeholder="Please enter the Cluster" />
              </Form.Item>

              <Form.Item
                  name="e_configuration"
                  label="Config"
                  rules={[{ required: false, message: 'Please enter the Config' }]}
              >
                  <Input.TextArea rows={3}/>
              </Form.Item>

              <div style={{textAlign:'center'}}>
              <Form.Item>
                    <Button htmlType='submit' style={{width: '100%', borderRadius:"10px"}} type="primary" >
                      Submit
                    </Button>
              </Form.Item>   
              </div>         
          </Form>
        </Drawer>
      </div>
    )
}

export default TerminalList