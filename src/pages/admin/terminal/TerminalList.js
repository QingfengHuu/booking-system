import React, { useState, useEffect } from 'react'

import { Drawer, Form, Button, Col, Row, Input, Select, Switch, Card, Table, Popconfirm, Modal, Space, Divider, Descriptions, Checkbox, message  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TerminalCreateApi, TerminalDelApi, TerminalListApi } from '../../../services/terminal';

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
    //checkstrictly cancellation

    // function TreeData() {
    //   const [checkStrictly, setCheckStrictly] = React.useState(false);
    //   return (
    //     <>
    //       <Space align="center" style={{ marginBottom: 16 }}>
    //         CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
    //       </Space>
    //       <Table
    //         columns={columns}
    //         columnSelection={{ ...columnSelection, checkStrictly }}
    //         dataSource={dataSource}
    //       />
    //     </>
    //   );
    // }


    // Table Collection Data
    const colomns = [{
      title: 'ID',
      dataIndex: 'e_id',
      key:'index'
    },{
      title: 'Group',
      dataIndex: 'e_group',
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
      title: 'Team',
      dataIndex: 'e_team',
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
                props.history.push(`/admin/terminal/edit/${record.e_id}`)
              }} > Edit </Button>
              <Popconfirm title= 'Sure Delete?'
              onConfirm={()=>{
                TerminalDelApi(record.e_id).then(res=>{
                  if(res.data.code===200){
                    console.log(record.e_title+'deleted!')
                    message.info('Success!')
                    props.history.push("/admin/terminal")
                  }else if(res.data.code===400){
                    console.log("The terminal is in use, can't delete it until it be released!")
                    message.info("The terminal is in use!")
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
        <Card title='Terminal List' 
          extra={
            <Button type="primary" onClick={showDrawer}>
              <PlusOutlined /> New Terminal
            </Button>
          }
        >
          <>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
              Check all
            </Checkbox>
            <Divider />
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
          </>
          <Divider />

          <Space align="center" style={{ marginBottom: 16 }}>
            CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
          </Space>
          <Table columns={colomns} 
            columnSelection={{ ...columnSelection, checkStrictly }}
            //checkstrictly cancellation
            bordered dataSource={dataSource} />
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
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark onFinish={(value)=>{
            TerminalCreateApi(value).then(res=>{
              console.log(res)
            }
            )
          }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="group"
                  label="Group"
                  rules={[{ required: true, message: 'Please enter the group' }]}
                >
                  <Input placeholder="Please enter group" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please enter terminal title' }]}
                >
                  <Input placeholder="Please enter terminal title" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="server_tag"
                  label="Server Tag"
                  rules={[{ required: true, message: 'Please choose the server tag' }]}
                >
                  <Input placeholder="Please enter terminal server tag" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="cluster"
                  label="Cluster"
                  rules={[{ required: true, message: 'Please choose the cluster' }]}
                >
                  <Input placeholder="Please enter terminal cluster" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="idrac Ip"
                  label="iDrac Ip"
                  rules={[{ required: true, message: 'Please enter terminal idrac ip' }]}
                >
                  <Input placeholder="Please enter terminal idrac ip" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="team"
                  label="Team"
                  rules={[{ required: true, message: 'Please choose terminal team' }]}
                >
                  <Input placeholder="Please enter terminal team" />
                </Form.Item>
              </Col>
            </Row>
          
          <Row gutter={16}>
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
                <Form.Item>
                    {/* <Popconfirm title= 'Sure add?'> */}
                      <Button htmlType='submit'  type="primary" >
                        Submit
                      </Button>
                    {/* </Popconfirm> */}
                </Form.Item>
              </Col>
            </Row>
            
          </Form>
        </Drawer>
      </div>
    )
}

export default TerminalList