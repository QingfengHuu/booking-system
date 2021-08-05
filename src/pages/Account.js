import { Form, Input, Button, DatePicker, Card, Table, Popconfirm, Modal, Space, Divider} from 'antd'
import React, { useState } from 'react'
// import { listApi } from '../../services/terminal';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

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
  end_date: '7/29',
  extend:1
}, {
  index: 2,
  team: 'HWSS',
  group: 'DELL 13G',
  title: '23G R630',
  location: 'DELL Server10',
  idrac_ip: '40.12.131.24',
  server_tag: 'HBMNBD2',
  booker: 'Cathy',
  start_date: '7/26',
  end_date: '7/30',
  extend:2
}]

const dataSourceBeta = [{
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
}, {
  index: 2,
  team: 'HWSS',
  group: 'DELL 13G',
  title: '23G R630',
  location: 'DELL Server10',
  idrac_ip: '40.12.131.24',
  server_tag: 'HBMNBD2',
  booker: 'Cathy',
  start_date: '7/16',
  end_date: '7/30',
  extend:2
}]

const Account= (props) => {

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

  // useEffect(() => {
  //   listApi().then(res =>{
  //     setDataSource1(res.terminal);
  //     setTotal(res.totalCount);
  //   })
  // }, [])

  // const loadData = (page) =>{
  //   listApi(page).then(res =>{
  //     setDataSource1(res.terminal);
  //     setTotal(res.totalCount);
  //   })
  // }

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
    dataIndex: 'title',
    ...getColumnSearchProps('title'),
  },{
    title: 'Location',
    dataIndex: 'location',
    ...getColumnSearchProps('location'),
  },{
    title: 'iDrac_ip',
    dataIndex: 'idrac_ip'
  },{
    title: 'Server Tag',
    dataIndex: 'server_tag',
    ...getColumnSearchProps('server_tag'),
  },{
    title: 'Start Date',
    dataIndex: 'start_date',
  },{
    title: 'End Date',
    dataIndex: 'end_date',
  },{
    title:'Extend Time',
    dataIndex:'extend'
  },{
    title: 'Operation',
    render: (txt,record,index) => {
      return(<div>
        <Space split={<Divider type="vertical" />}>
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
        </Space>
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
    dataIndex: 'title',
    ...getColumnSearchProps('title'),
  },{
    title: 'Location',
    dataIndex: 'location',
    ...getColumnSearchProps('location'),
  },{
    title: 'iDrac_ip',
    dataIndex: 'idrac_ip'
  },{
    title: 'Server Tag',
    dataIndex: 'server_tag',
    ...getColumnSearchProps('server_tag'),
  },{
    title: 'Start Date',
    dataIndex: 'start_date',
  },{
    title: 'End Date',
    dataIndex: 'end_date',
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
            <Table rowKey='index' columns={histColums} bordered dataSource={dataSourceBeta}/>
        </Card>
    </Card>
  )
}

export default Account

