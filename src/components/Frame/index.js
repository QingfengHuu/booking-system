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
    Typography,
    Popconfirm
} from 'antd';

import MenuItem from 'antd/lib/menu/MenuItem';
import {withRouter} from 'react-router-dom';
import {clearToken, isLogined} from '../../utils/auth';
import './frame.css';

import React,{useEffect, useLayoutEffect, useState}from 'react'
import {Avatar,Title, Image} from 'antd';
import {InfoCircleOutlined, UserOutlined, EditOutlined, SearchOutlined, CheckOutlined} from '@ant-design/icons';


import {adminRoutes, bookingRoutes, DashboardRoutes, userRoutes} from '../../routes';
import {getUsername, getUserRole} from '../../utils/auth';
import {PwdResetApi} from '../../services/terminal';

const routesAdmin = adminRoutes.filter(routes => routes.isShow);
const routesDashboard = DashboardRoutes.filter(routes => routes.isShow);
const routesUserAccount = userRoutes.filter(routes => routes.isShow);
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']; 

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


function Frame(props) {
    const [visible, setVisible] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [buttonRevealed, setButtonRevealed] = useState(true);
    const [menuRevealed, setMenuRevealed] = useState(1);
    const [menuRevealed1, setMenuRevealed1] =useState('');
    const [avatarAccount, setAvatarAccount] =useState('');
    const [loginVisible, setLoginVisible] =useState('');
    const [logoutVisible, setLogoutVisible] =useState(''); 
    const [profileEditVisible, setProfileEditVisible] = useState('none')


    useLayoutEffect(()=>{
        if(!isLogined()){
            setAvatarAccount('none')
            setLogoutVisible('none')
        }else{
            setLoginVisible('none')
        }
       checkUserRole();
    },[])

    const showDrawer = () => {
        setVisible(true);
    };

    const revealInput = () => {
        setProfileEditVisible('');
        setInputDisabled(false);
        setButtonRevealed(false);
    }

    const hideInput = () => {
        setInputDisabled(true);
        setButtonRevealed(true);
    }


    const onClose = () => {
        setVisible(false);
        setProfileEditVisible('none');
    };
    const onClick = ({key}) => {
        if (key === 'logout') {
            clearToken();
            props.history.push('/login');
        } else if (key === 'account') {
            showDrawer();
            // props.history.push('/user/account');
        } else if (key === 'login'){
            props.history.push('/login');
        }
    };

    const checkUserRole = () => {
        console.log("判断用户角色")
        if (!isLogined()){
            setMenuRevealed1('none')
            console.log("Need login in")
        }
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

    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
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
            <Menu.Item key="account" style={{display:avatarAccount}}>Account Detail</Menu.Item>
            <Menu.Item key="login" style={{display:loginVisible}}>Login</Menu.Item>
            <Menu.Item key="logout" style={{display:logoutVisible}} >Logout</Menu.Item>
        </Menu>
    );

    const {Title} = Typography;

    const avatarIcon=(username)=>{
        return username[0]
    }
    
    function invertHex(hex) {
        return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
      }

    return (
        <Layout>
            <Header className="header" style={{background: "white", paddingLeft: "0"}}>
                {/* <h1 style={{color:'white'}}>DELL EMC</h1> */}
                <div className="white p2 flex a-center">
                    <a href='/dashboard'>
                        <Space split={<Divider type="vertical"/>}>
                            <img className={['centered']}
                                 src={'../Ferrule-logos.png'}
                                 width='200px'/>
                             {/* <Title level={1} ellipsis={true}>Ferrule</Title>     */}
                        </Space>
                    </a>
                </div>
                <Dropdown overlay={menu} trigger={['click']}>
                <span className="avatar place">
                <Avatar className="avatarIcon" style={{color: invertHex(randomColor), backgroundColor: randomColor}} size='large'
                        onClick={e => e.preventDefault()}>{isLogined()?(avatarIcon(getUsername())):'Guest'}</Avatar>
                    {/* <a style={{color:'black'}} onClick={e => e.preventDefault()}>
                    User
                </a> */}
                </span>
                </Dropdown>
                <Drawer
                    title="Profile"
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
                        <Popconfirm title="Edit the passwords?" onConfirm={revealInput}>
                            <Tooltip title="Edit">
                                <Button shape="circle" icon={<EditOutlined/>} style={{float: 'right'}}
                                        />
                            </Tooltip>
                        </Popconfirm>
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
                            style={{width:"150%", display:profileEditVisible}}
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password  placeholder='Type in old password here!'
                                            disabled={inputDisabled}/>
                        </Form.Item>


                        <Form.Item
                            // label=" New Password"
                            name="newPassword"
                            style={{width:"150%", display:profileEditVisible}}
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password
                                placeholder='Type in new password here!'
                                disabled={inputDisabled}/>
                        </Form.Item>

                        <div style={{paddingRight:'25%'}}>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit" style={{width: '100%', borderRadius:"10px", display:profileEditVisible}} onClick={hideInput}
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
                                <MenuItem key={routesUserAccount.path} onClick={p => props.history.push(p.key)} style={{display:menuRevealed1}} >
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


















































































//########ALALALALALALa########
//YOU FOUND US HERE
//#############################
//QINGFENG_HU:)
//PENGYUE_YANG:}
//RUILIN_MA:>
//#############################
//OH YEAH DON'T DELETED US OR ... PLEASE