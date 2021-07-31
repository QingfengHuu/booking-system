import { Layout, Menu, Breadcrumb } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import { withRouter } from 'react-router-dom';

import { bookingRoutes } from '../../routes';
const routes = bookingRoutes.filter(route=>route.isShow);

const { Header, Content, Sider } = Layout;


function index(props) {
    return (
        <Layout>
            <Header className="header">
            <h1 style={{color:'white'}}>DELL EMC</h1>
            {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu> */}
            </Header>
            <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                >
                {routes.map(route=>{
                    return(
                        <MenuItem key={route.path} onClick={p=>props.history.push(p.key)}>
                            {route.title}
                        </MenuItem>
                    )
                })}
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item> */}
                </Breadcrumb>
                <Content
                className="site-layout-background"
                style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default withRouter(index)
