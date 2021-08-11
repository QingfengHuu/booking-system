import {Form, Input, DatePicker, Button, Card, Table, Popconfirm, Modal, Radio, Space} from 'antd';
import React, {useState, useEffect} from 'react'
import {NodeBookingListApi, NodeBookingListReserveApi} from '../../services/booking';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import moment from 'moment';
import 'moment-timezone';
import {getUsername} from '../../utils/auth';


moment.tz.setDefault("Asia/Shanghai");
// moment().format('YYYY-MM-DD HH:mm:ss')


const {RangePicker} = DatePicker;


const NodeBookingList = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [e_idValue, setE_idValue] = useState();
    const [dataSource, setDataSource] = useState([]);
    const [total, setTotal] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);
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

    const [form] = Form.useForm()
    const showModal = (record) => {
        form.setFieldsValue(record)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const InputShown = (value) => {
        if (value != null && value === '') {
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
    },
        {
            title: 'E_ID',
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
                        <Button type='primary' size='small' onClick={() => {
                            showModal(record)
                        }}>Reserve</Button>


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
            <Modal title="Reserve an equipment" visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={(values) => {
                        NodeBookingListReserveApi({
                            e_id: values.e_id,
                            u_id: getUsername(),
                            subscribe_date: moment(values.date[0]).format('YYYY-MM-DD HH:mm:ss'),
                            expire_date: moment(values.date[1]).format('YYYY-MM-DD HH:mm:ss')
                        }).then(res => {
                            console.log(1 + 'reserved!')
                        })
                        console.log('Success:', values);
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