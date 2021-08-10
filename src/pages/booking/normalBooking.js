import { Form, Input, DatePicker, Button, Card, Table, Popconfirm, Modal, Radio, Space } from 'antd';
import React, { useState, useEffect } from 'react'
import { bookListApi } from '../../services/booking';
import { NormalBookingListApi, NormalBookingListReserveApi} from '../../services/terminal';
import TerminalList from '../admin/terminal/TerminalList';
import { listApi } from '../../services/terminal';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment-timezone';
import  {getUsername}  from '../../utils/auth';


moment.tz.setDefault("Asia/Shanghai");
// moment(val).format('YYYY-MM-DD HH:mm:ss')



const {RangePicker} = DatePicker;


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

const NormalBookingList= (props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [total,setTotal] = useState(0);
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //states for range picker
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [value, setValue] = useState();
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchText, setSearchText] = useState('');

  const dateFormat = 'YYYY-MM-DD';

  let searchInput ='';

  // let state = {
  //   searchText: '',
  //   searchedColumn: '',
  // };




  useEffect(() => {
    NormalBookingListApi().then(res =>{
      setDataSource(res.data.data);
    })
  }, [])

  // const loadData = (page) =>{
  //   TerminalListApi(page).then(res =>{
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

  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  const InputShown = (value) => {
    if (value != null && value === ''){
      return 'LOL'; 
    }
  };

  

  //This is where u call api/method for username


  //states for range picker
  const disabledDate = current => {
    dates[0] = moment();
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 6;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 6;
    
    // const limitEarly = current && current < moment().startOf('day');
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

  const colomns = [{
    title: 'ID',
    dataIndex: 'e_id',
    sorter: (a, b) => a.e_id - b.e_id,
        sortDirections: ['descend', 'ascend'],
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
    dataIndex: 'u_id',
    sorter: (a, b) => a.booker.length - b.booker.length,
        sortDirections: ['descend', 'ascend'],
  },{
    title: 'Start Date',
    dataIndex: 'subscribe_date'
  },{
    title: 'End Date',
    dataIndex: 'end_time'
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
            onFinish={()=>{
              NormalBookingListReserveApi({e_id : record.e_id, u_id : getUsername(), subscribe_date: record.start_date, expire_date: record.end_date}).then(res=>{
                console.log(record.e_id+'reserved!')
              })
            }}
            // onFinishFailed={onFinishFailed}
            
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
                    onCalendarChange={val => setDates(val)}
                    onChange={val => setValue(val)}
                    onOpenChange={onOpenChange}
                    defaultValue={moment()} 
                    format={dateFormat}
                    disabled={[true, false]}
                    disabledDate={disabledDate}
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
              <Button type="primary" htmlType="submit" onClick={{}}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        
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
        // pagination={{total,defaultPageSize:10, onChange: loadData}} 
        columns={colomns} 
        bordered 
        dataSource={dataSource}
      />
    </Card>
  )
}

export default NormalBookingList


