import {
    Layout,
    Menu,
    Dropdown,
    message,
    Drawer,
    Button,
    Input,
    Tooltip,
    Form,
    Space,
    Divider,
    Typography
} from 'antd';

import MenuItem from 'antd/lib/menu/MenuItem';
import {withRouter} from 'react-router-dom';
import {clearToken} from '../../utils/auth';
import './frame.css';
import React, {useLayoutEffect, useState} from 'react'
import {Avatar} from 'antd';
import {InfoCircleOutlined, EditOutlined} from '@ant-design/icons';

import {adminRoutes, bookingRoutes, DashboardRoutes, userRoutes} from '../../routes';
import {getUsername, getUserRole} from '../../utils/auth';
import {PwdResetApi} from '../../services/terminal';

const routesAdmin = adminRoutes.filter(routes => routes.isShow);
const routesDashboard = DashboardRoutes.filter(routes => routes.isShow);
const routesUserAccount = userRoutes.filter(routes => routes.isShow);

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


function Frame(props) {
    const [visible, setVisible] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [buttonRevealed, setButtonRevealed] = useState(true);
    const [menuRevealed, setMenuRevealed] = useState(1);


    useLayoutEffect(()=>{
       checkUserRole();
    },[])

    const showDrawer = () => {
        setVisible(true);
    };

    const revealInput = () => {
        setInputDisabled(false);
        setButtonRevealed(false);
    }

    const hideInput = () => {
        setInputDisabled(true);
        setButtonRevealed(true);
    }


    const onClose = () => {
        setVisible(false);
    };
    const onClick = ({key}) => {
        if (key === 'logout') {
            clearToken();
            props.history.push('/login');
        } else if (key === 'account') {
            showDrawer();
            // props.history.push('/user/account');
        }
    };

    const checkUserRole = () => {
        console.log("判断用户角色")
        console.log(getUserRole())
        if (getUserRole() === 'false') {
            console.log("不是管理员")
            setMenuRevealed(0)

        }
    }
    const display=()=>{
        const subStyle = {
            opacity: menuRevealed ? 1 : 0
        }
        return subStyle

    }
    // checkUserRole();
    // const checkEmpty = (str) =>{
    //     hideButton();
    //     if(str !== ""){
    //         revealButton();
    //     }
    // }

    // const checkPwd= (str) =>{
    //     // Connect API
    //     if(str !== ""){
    //         console.log('result is '+ newPwdReveal)
    //         return newPwdReveal;
    //     }
    // }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="account">Account Detail</Menu.Item>
            {/* <Menu.Item key="2">2nd menu item</Menu.Item> */}
            <Menu.Item key="logout">Log out</Menu.Item>
        </Menu>
    );

    const {Title} = Typography;

    return (
        <Layout>
            <Header className="header" style={{background: "white", paddingLeft: "25px"}}>
                {/* <h1 style={{color:'white'}}>DELL EMC</h1> */}
                <div className="white p2 flex a-center">
                    <a href='/dashboard'>
                        <Space split={<Divider type="vertical"/>}>
                            <img className={['centered']}
                                 src='https://www.coolgenerator.com/Data/Textdesign/202108/cc484ee7cb7ce3452df8b906c79231ab.png'
                                 width='140px'/>
                             {/* <Title level={1} ellipsis={true}>Ferrule</Title>     */}
                        </Space>
                    </a>
                </div>

                <Dropdown overlay={menu} trigger={['click']}>
                <span className="avatar place">
                <Avatar className="avatarIcon" style={{color: '#f56a00', backgroundColor: '#fde3cf'}} size='large'
                        onClick={e => e.preventDefault()}>U</Avatar>
                    {/* <a style={{color:'black'}} onClick={e => e.preventDefault()}>
                    User
                </a> */}
                </span>
                </Dropdown>
                <Drawer
                    title="Profile Drawer"
                    width={'20%'}
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    destroyOnClose={true}
                    visible={visible}
                >

                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        initialValues={{remember: true}}
                        onFinish={(values) => {
                            PwdResetApi({
                                username: values.username,
                                oldPassword: values.password,
                                newPassword: values.newPassword,
                            }).then(res => {
                                if (res.data.code === 200) {
                                    message.success("changed successfully!");
                                    clearToken();
                                    props.history.push('/login')
                                } else {
                                    message.info(res.data.msg)
                                }
                                console.log(res)
                            })
                            console.log('Success:', values);
                        }}
                        // onFinishFailed={onFinishFailed}
                    >

                        <Tooltip title="Edit">
                            <Button shape="circle" icon={<EditOutlined/>} style={{float: 'right'}}
                                    onClick={revealInput}/>
                        </Tooltip>
                        <br/>
                        <br/>
                        <Form.Item
                            // label="Username"
                            style={{width:"150%"}}
                            name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                            initialValue={getUsername()}
                        >
                            <Input
                                suffix={
                                    <Tooltip title="Click the button to change your username">
                                        <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                                    </Tooltip>
                                }
                                
                                disabled={true}/>
                        </Form.Item>

                        <Form.Item
                            // label="Password"
                            style={{width:"150%"}}
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password  placeholder='Type in old password here!'
                                            disabled={inputDisabled}/>
                        </Form.Item>


                        <Form.Item
                            // label=" New Password"
                            name="newPassword"
                            style={{width:"150%"}}
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password
                                placeholder='Type in new password here!'
                                disabled={inputDisabled}/>
                        </Form.Item>

                        <div style={{paddingRight:'25%'}}>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit" style={{width: '100%', borderRadius:"10px"}} onClick={hideInput}
                                    disabled={buttonRevealed}>
                                Submit
                            </Button>
                        </Form.Item>
                        </div>
                        
                        
                    </Form>


                </Drawer>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[{}]}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', color: "rgb(0 0 0)", background: '#ffffff', borderRight: 0}}
                    >
                        {routesDashboard.map(routesDashboard => {
                            return (
                                <MenuItem key={routesDashboard.path} onClick={p => props.history.push(p.key)}>
                                    {routesDashboard.title}
                                </MenuItem>
                            )
                        })}
                        <SubMenu key="Booking" title="Booking">
                            {bookingRoutes.map(route => {
                                return (
                                    <MenuItem key={route.path} onClick={p => props.history.push(p.key)}>
                                        {route.title}
                                    </MenuItem>
                                )
                            })}
                        </SubMenu>

                        {routesUserAccount.map(routesUserAccount => {
                            return (
                                <MenuItem key={routesUserAccount.path} onClick={p => props.history.push(p.key)}>
                                    {routesUserAccount.title}
                                </MenuItem>
                            )
                        })}

                        <SubMenu key="admin" title="Admin" style={{opacity:menuRevealed}}>
                        {routesAdmin.map(route => {
                            return (
                                <MenuItem key={route.path} onClick={p => props.history.push(p.key)}>
                                    {route.title}
                                </MenuItem>
                            )
                        })}
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout>
                {/* <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <Content
                    className="site-layout-background"
                    style={{
                        paddingLeft: '1%',
                        paddingRight: "1%",
                        background: '#F4F7FC',
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
</Layout>
)
}



export default withRouter(Frame)