import { Form, Input, DatePicker, Button, Card, Table, Popconfirm, Modal, Radio, Space } from 'antd';
import React, { useState, useEffect } from 'react'
import { bookListApi } from '../../services/booking';
import { listApi } from '../../services/terminal';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


const {RangePicker} = DatePicker;

const mainDatasource = [{
  name: 'Node1',
}]

const dataSource = [{
  e_id: 1,
  e_team: 'HWSS',
  e_servergroup: 'DELL 13G',
  e_title: '13G R630',
  e_location: 'DELL Server10',
  e_iDrac_ip: '20.12.131.24',
  e_tag: 'HBMNBD2',
  e_status : 1,
  booker: 'Cathy',
  start_date: '7/15',
  end_date: '7/20'
},{
  e_id: 2,
  e_team: 'HWSS',
  e_servergroup: 'DELL 13G',
  e_title: '13G R630',
  e_location: 'DELL Server10ACDSFG',
  e_iDrac_ip: '20.12.131.24',
  e_tag: 'HBMNBD2',
  e_status : 2,
  booker: 'LOL',
  start_date: '7/15',
  end_date: '7/20'
}
]

const BookingList= (props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource1, setDataSource1] = useState([]);
  const [total,setTotal] = useState(0);
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //states for range picker
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [value, setValue] = useState();
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchText, setSearchText] = useState('');

  let searchInput ='';

  // let state = {
  //   searchText: '',
  //   searchedColumn: '',
  // };




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

  const InputShown = (value) => {
    if (value != null && value === ''){
      return 'LOL'; 
    }
  };

  

  //This is where u call api/method for username


  //states for range picker
  const disabledDate = current => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    return tooEarly || tooLate;
  };
  const onOpenChange = open => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };
  //states for range picker

  const rangeConfig = {
    rules: [
      {
        type: 'array',
        required: true,
        message: 'Please select time!',
      },
    ],
  };


  //search modules
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchedColumn(selectedKeys[0]);
              setSearchText(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchedColumn(selectedKeys[0]);
    setSearchText(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  //search modules

  const mainColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
  ];



  const expandedRowRender = () => {
    const colomns = [{
      title: 'ID',
      dataIndex: 'e_id',
      sorter: (a, b) => a.e_id - b.e_id,
          sortDirections: ['descend', 'ascend'],
    },{
      title: 'Team',
      dataIndex: 'e_team',
    },{
      title: 'Title',
      dataIndex: 'e_title',
      ...getColumnSearchProps('e_title'),
    },{
      title: 'Location',
      dataIndex: 'e_location',
      ...getColumnSearchProps('e_location'),
    },{
      title: 'iDrac_Ip',
      dataIndex: 'e_iDrac_ip',
    },{
      title: 'Server Tag',
      dataIndex: 'e_tag',
      ...getColumnSearchProps('e_tag'),
    },{
      title: 'Booker',
      dataIndex: 'booker',
      sorter: (a, b) => a.booker.length - b.booker.length,
          sortDirections: ['descend', 'ascend'],
    },{
      title: 'Start Date',
      dataIndex: 'start_date',
      sorter: (a, b) => a.start_date > b.start_date? 1:-1,
          sortDirections: ['descend', 'ascend'],
    },{
      title: 'End Date',
      dataIndex: 'end_date',
      sorter: (a, b) => a.end_date > b.end_date? 1:-1,
          sortDirections: ['descend', 'ascend'],
    },{
      title: 'Operation',
      render:()=>{return(
        <Button type='primary' size='small' onClick={showModal}>Reserve</Button>
      )
        
      }
    }
    ]

          return(
            <div>
          <Table 
            rowKey='index' 
            // pagination={{total,defaultPageSize:10, onChange: loadData}} 
            columns={colomns} 
            bordered 
            dataSource={dataSource}
            pagination={false}
            />
            
          
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
                  placeholder="Select a option and change input text above"
                  initialValue= {InputShown('')}
                  rules={[{ required: true,   message: 'Please input the name of Renter!' }]}
                >
                  <Input />
                </Form.Item>
  
                
                <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
                <RangePicker
                    value={hackValue || value}
                    disabledDate={disabledDate}
                    onCalendarChange={val => setDates(val)}
                    onChange={val => setValue(val)}
                    onOpenChange={onOpenChange}
                  />
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
          </div>
          
              )
 
};

  return (
    <Card title='BookingList' 
      extra={
        <Button type='primary'>
          Additional Operation
        </Button>
      }
    >
      
      <Table
        className="components-table-demo-nested"
        columns={mainColumns}
        expandable={{ expandedRowRender }}
        dataSource={mainDatasource}
      />
      
    </Card>
  )
}

export default BookingList

