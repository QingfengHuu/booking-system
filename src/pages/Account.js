import { Form, Input, Button, DatePicker, Card, Table, Popconfirm, Modal, Space, Divider, message} from 'antd'
import React, { useState, useEffect } from 'react'
// import { listApi } from '../../services/terminal';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import { OrderEndApi, OrderExtendApi, OrderHistoryListApi, OrderListApi, OrderNowListApi } from '../services/order';

import { getUsername } from '../utils/auth';

const dataSource1 = [{
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

const dataSourceBeta1 = [{
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
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceHis, setDataSourceHis]= useState([])
  const [total,setTotal] = useState(0);
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //states for range picker
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [value, setValue] = useState();
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchText, setSearchText] = useState('');

  let searchInput ='';

  useEffect(() => {
    OrderNowListApi({u_id: getUsername()}).then(res =>{
      setDataSource(res.data.data);
    },
    OrderHistoryListApi({u_id: getUsername()}).then(res=>{
      setDataSourceHis(res.data.data)
    })
    )
  }, [])

  const loadData = () =>{
    OrderNowListApi({u_id: getUsername()}).then(res =>{
      setDataSource(res.data.data);
    },
    OrderHistoryListApi({u_id: getUsername()}).then(res=>{
      setDataSourceHis(res.data.data)
    })
    )
  }

  const showModal = () => {
    setIsModalVisible(true);
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
    title: 'ID',
    key:'index',
    render: (txt, record, index) => index + 1,
  },{
    title: 'Order ID',
    dataIndex: 'b_id',
    className:'tableHidden'
  },{
    title: 'Titile',
    dataIndex: 'e_title'
  },{
    title: 'Dell Server Number',
    dataIndex: 'e_location'
  },{
    title: 'Server Tag',
    dataIndex: 'e_tag'
  },{
    title: 'iDrac_ip',
    dataIndex: 'e_idrac_ip'
  },{
    title: 'Cluster',
    dataIndex: 'e_cluster'
  },{
    title: 'Booker',
    dataIndex: 'u_id'
  },{
    title: 'Subscribe Date',
    dataIndex: 'subscribe_date',
  },{
    title: 'End Date',
    dataIndex: 'end_date'
  },{
    title: 'Extend Time',
    dataIndex: 'extend'
  },{
    title: 'Operation',
    render: (txt,record,index) => {
      return(<div>
        <Space split={<Divider type="vertical" />}>
          <Popconfirm title= 'Extend for 3 days?'
          onConfirm={()=>{
            OrderExtendApi({b_id : record.b_id}).then(res=>{
              if(res.data.code==='200'){
                console.log(record.b_id+'extended!')
                message.info(res.data.msg)
                loadData()
              }else{
                message.info(res.data.msg)
              }
            }) 
          }}>
            <Button type='primary' size='small' onClick={showModal}> Extend </Button>
          </Popconfirm>
          <Popconfirm title= 'Sure release?'
          onConfirm={()=>{
            OrderEndApi({b_id : record.b_id}).then(res=>{
              if(res.data.code===200){
                console.log(record.b_id+'ended!')
                message.info(res.data.msg)
                loadData()
              }
              })
            }
          }>
            <Button type='primary' danger size='small'>Release</Button>
          </Popconfirm>
        </Space>
      </div>
      )
    }
  }
]

  const histColums= [{
    title: 'ID',
    key:'index',
    render: (txt, record, index) => index + 1,
  },{
    title: 'Order ID',
    dataIndex: 'b_id',
    className:'tableHidden'
  },{
    title: 'Titile',
    dataIndex: 'e_title'
  },{
    title: 'Dell Server Number',
    dataIndex: 'e_location'
  },{
    title: 'Server Tag',
    dataIndex: 'e_tag'
  },{
    title: 'iDrac_ip',
    dataIndex: 'e_idrac_ip'
  },{
    title: 'Cluster',
    dataIndex: 'e_cluster'
  },{
    title: 'Booker',
    dataIndex: 'u_id'
  },{
    title: 'Subscribe Date',
    dataIndex: 'subscribe_date',
  },{
    title: 'End Date',
    dataIndex: 'end_date'
  }

]

  return (
    <Card title='Account' >
        <Card type='inner' title='Reserving' >
            <Table rowKey='index' columns={currColumns} bordered 
            pagination={{
              onchange: ()=>{
                loadData()
              }
            }}
            dataSource={dataSource}/>
        </Card>
        <Card type='inner' title='History' >
            <Table rowKey='index' columns={histColums} bordered 
            pagination={{
              onchange: ()=>{
                loadData()
              }
            }}
            dataSource={dataSourceHis}/>
        </Card>
    </Card>
  )
}

export default Account

