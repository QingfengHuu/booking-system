import { Layout, Menu, Breadcrumb, Dropdown, message, Drawer, Button } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import { withRouter } from 'react-router-dom';
import { clearToken } from '../../utils/auth';
import './frame.css';
import React, { useState } from 'react'
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { adminRoutes, bookingRoutes, DashboardRoutes,userRoutes } from '../../routes';


const routes = bookingRoutes.filter(route=>route.isShow);
const routesAdmin =adminRoutes.filter(routes=>routes.isShow);
const routesDashboard =DashboardRoutes.filter(routes=>routes.isShow);
const routesUserAccount =userRoutes.filter(routes=>routes.isShow);

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;




function Frame(props) {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
      };
    
    const onClose = () => {
        setVisible(false);
      };
    const onClick = ({ key }) => {
        if(key==='logout'){
            clearToken();
            props.history.push('/login');
        }else if(key==='account'){
            showDrawer();
            // props.history.push('/user/account');
        }
      };
      
    const menu = (
        <Menu onClick={onClick}>
        <Menu.Item key="account">Account Detail</Menu.Item>
        {/* <Menu.Item key="2">2nd menu item</Menu.Item> */}
        <Menu.Item key="logout">Log out</Menu.Item>
        </Menu>
    );
    return (
        <Layout>
            <Header className="header" style={{background:"white", paddingLeft:"25px"}}>
            {/* <h1 style={{color:'white'}}>DELL EMC</h1> */}
            <div className="white p2 flex a-center" >
                <img className={['centered']} src='https://www.ashdowngroup.com/wp-content/uploads/2019/06/Dell_EMC_logo.svg.png' width='140px' />
            </div>
            {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu> */}
            <Dropdown overlay={menu} trigger={['click']} >
                <span className="avatar place">
                <Avatar className= "avatarIcon" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}  size= 'large'  onClick={e => e.preventDefault()}>U</Avatar>
                {/* <a style={{color:'black'}} onClick={e => e.preventDefault()}>
                    User
                </a> */}
                </span>
            </Dropdown>
            <Drawer
                title="Profile Drawer"
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
            </Header>
            <Layout>
            <Sider width={200} className="site-layout-background" >
                <Menu
                mode="inline"
                defaultSelectedKeys={[{}]}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', color: "rgb(0 0 0)", background: '#ffffff', borderRight: 0 }}
                >
                {routesDashboard.map(routesDashboard=>{
                    return(
                        <MenuItem key={routesDashboard.path} onClick={p=>props.history.push(p.key)}>
                            {routesDashboard.title}
                        </MenuItem>
                    )
                })}
                <SubMenu key="Booking" title="Booking">
                        {bookingRoutes.map(route=>{
                            return(
                                <MenuItem key={route.path} onClick={p=>props.history.push(p.key)}>
                                    {route.title}
                                </MenuItem>
                            )
                        })}
                    </SubMenu>

                    {routesUserAccount.map(routesUserAccount=>{
                    return(
                        <MenuItem key={routesUserAccount.path} onClick={p=>props.history.push(p.key)}>
                            {routesUserAccount.title}
                        </MenuItem>
                    )
                })}

                    <SubMenu key="admin" title="Admin">
                        {routesAdmin.map(route=>{
                            return(
                                <MenuItem key={route.path} onClick={p=>props.history.push(p.key)}>
                                    {route.title}
                                </MenuItem>
                            )
                        })}
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout >
                {/* <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <Content
                className="site-layout-background"
                style={{
                    paddingLeft: '1%',
                    paddingRight:"1%",
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
