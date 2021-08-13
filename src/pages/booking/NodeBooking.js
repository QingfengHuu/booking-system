import {
    Form,
    Input,
    DatePicker,
    Button,
    Card,
    Table,
    Descriptions,
    Modal,
    Badge,
    Space,
    Divider,
    Drawer,
    message
} from 'antd';

import React, {useState, useEffect} from 'react'
import {NodeBookingListApi, NodeBookingListReserveApi} from '../../services/booking';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import moment from 'moment';
import 'moment-timezone';
import {getUsername} from '../../utils/auth';
import "./Booking.css"
import {TerminalGetOneById} from '../../services/terminal';


moment.tz.setDefault("Asia/Shanghai");
// moment().format('YYYY-MM-DD HH:mm:ss')


const {RangePicker} = DatePicker;


const NodeBookingList = (props) => {

    const [dataSource, setDataSource] = useState([]);
    const [detailedSource, setDetailedSource] = useState([{}])

    const [isDetailedModalVisible, setIsDetailedModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    //states for range picker
    const [dates, setDates] = useState([]);
    const [hackValue, setHackValue] = useState();
    const [value, setValue] = useState();
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchText, setSearchText] = useState('');

    const dateFormat = 'YYYY-MM-DD';

    let searchInput = '';


    useEffect(() => {
        NodeBookingListApi().then(res => {
            setDataSource(res.data.data);
        })
    }, [])

    const loadData = (() => {
        NodeBookingListApi().then(res => {
            var newData = dataSource.concat()
            newData=res.data.data
            setDataSource(newData);
        })
    })

    const [form] = Form.useForm()

    //Detail
    const showModalDetail = (record) => {
        TerminalGetOneById(record.e_id).then(res => {
            console.log(res.data.data)
            setDetailedSource(res.data.data)
        })
        console.log(detailedSource)
        setIsDetailedModalVisible(true);
    }

    //Reserve
    const showModal = (record) => {
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDetOk = () => {
        setIsDetailedModalVisible(false);
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleDetCancel = () => {
        setIsDetailedModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            setSearchedColumn(selectedKeys[0]);
                            setSearchText(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
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
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
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
        key: 'index',
        render: (txt, record, index) => index + 1,
    }, {
        title: 'E_ID',
        className: 'tableHidden',
        dataIndex: 'e_id',
        sorter: (a, b) => a.e_id - b.e_id,
        sortDirections: ['descend', 'ascend'],
    }, {
        title: 'Title',
        dataIndex: 'e_title',
        ...getColumnSearchProps('e_title'),
    }, {
        title: 'Location',
        dataIndex: 'e_location',
        ...getColumnSearchProps('e_location'),
    }, {
        title: 'iDrac_Ip',
        dataIndex: 'e_iDrac_ip',
    }, {
        title: 'Server Tag',
        dataIndex: 'e_tag',
        ...getColumnSearchProps('e_tag'),
    }, {
        title: 'Cluster',
        dataIndex: 'e_cluster',
        ...getColumnSearchProps('e_tag'),
    }, {
        title: 'Booker',
        dataIndex: 'u_id',
        sorter: (a, b) => a.booker.length - b.booker.length,
        sortDirections: ['descend', 'ascend'],
    }, {
        title: 'Start Date',
        dataIndex: 'subscribe_date'
    }, {
        title: 'Expire Date',
        dataIndex: 'expire_date'
    }, {
        title: 'Operation',

        render: (txt, record, index) => {

            return (<div>
                    <Space split={<Divider type="vertical"/>}>
                        <Button type='primary' size='small' onClick={() => {
                            showModalDetail(record)
                        }}>Detail</Button>
                        <Button type='primary' size='small' disabled={(record.e_status==1)?true:false} onClick={() => {
                            showModal(record)
                        }}>Reserve</Button>
                    </Space>
                </div>
            )
        }
    }
    ]

    return (
        <Card title='BookingList' style={{marginTop:'1%', borderRadius:'10px'}}>
            <Table
                rowKey='index'
                // pagination={{total,defaultPageSize:10, onChange: loadData}}
                columns={colomns}
                bordered
                pagination={{
                    onchange: () => {
                        loadData()
                    }
                }}
                dataSource={dataSource}
            />

            <Modal title="Terminal Detailed Information"
                   visible={isDetailedModalVisible}
                   onOk={handleDetOk}
                   onCancel={handleDetCancel}
                   width="50%"
            >
                <Descriptions title="Terminal Info" bordered layout="horizontal">
                <Descriptions.Item label="Title" span={3}>{detailedSource[0].e_title}</Descriptions.Item>
                    <Descriptions.Item label="Location" span={3}>{detailedSource[0].e_location}</Descriptions.Item>
                    <Descriptions.Item label="iDrac_ip" span={3}>{detailedSource[0].e_iDrac_ip}</Descriptions.Item>
                    <Descriptions.Item label="Server Tag" span={3}>{detailedSource[0].e_tag}</Descriptions.Item>
                    <Descriptions.Item label="Server Group" span={3}>{detailedSource[0].e_servergroup}</Descriptions.Item>
                    <Descriptions.Item label="Cluster" span={3}>{detailedSource[0].e_cluster}</Descriptions.Item>
                    <Descriptions.Item label="GeoLocation" span={3}>{detailedSource[0].e_geolocation}</Descriptions.Item>
                    <Descriptions.Item label="Configuration" span={3}>
                        {detailedSource[0].e_configuration}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>

            <Modal title="Reserve an equipment"
                   visible={isModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   destroyOnClose={true}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    preserve={false}
                    onFinish={(values) => {
                        NodeBookingListReserveApi({
                            e_id: values.e_id,
                            u_id: getUsername(),
                            subscribe_date: moment(values.date[0]).format('YYYY-MM-DD HH:mm:ss'),
                            expire_date: moment(values.date[1]).format('YYYY-MM-DD HH:mm:ss')
                        }).then(res => {
                            if (res.data.msg == 200) {
                                console.log(values.e_id + 'has been reserved!')
                                message.info(values.e_id + 'has been reserved!')
                                loadData()
                            } else {
                                message.info(res.data.msg)
                            }
                        })
                    }}
                    onFinishFailed={onFinishFailed}

                >
                    <Form.Item
                        label=" e_id"
                        name="e_id"
                        rules={[{required: true, message: 'Please input the name of Renter!'}]}
                    >
                        <Input disabled='disabled'/>
                    </Form.Item>
                    <Form.Item
                        label=" Renter"
                        name="Renter"
                        placeholder="Select a option and change input text above"
                        initialValue={getUsername()}
                        rules={[{required: true, message: 'Please input the name of Renter!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item name="date" label="RangePicker" {...rangeConfig}>
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
                        rules={[{required: false, message: 'Please input your comments!'}]}
                    >
                        <Input.TextArea/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}

export default NodeBookingList