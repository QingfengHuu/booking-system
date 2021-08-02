// import React from 'react'
import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { Liquid } from '@ant-design/charts';
// import Test from 'NODE_PATH=./src/components/charts.js';
import { Line } from '@ant-design/charts';
import './index.css';
import { Typography } from 'antd';

import {
    DashboardOutlined,
    SyncOutlined,
    ScheduleOutlined,
    
    } from '@ant-design/icons';

const Index = () => {
    
    // var data = [
    //     {
    //         dates: '1991',
    //         value: 3,
    //         },
    //         {
    //         dates: '1992',
    //         value: 4,
    //         },
    //         {
    //         dates: '1993',
    //         value: 3,
    //         },
    //         {
    //         dates: '1994',
    //         value: 5,
    //         },
    //         {
    //         dates: '1995',
    //         value: 9,
    //         },
    //         {
    //         dates: '1996',
    //         value: 6,
    //         },
    //         {
    //         dates: '1997',
    //         value: 7,
    //         },
    //         {
    //         dates: '1998',
    //         value: 9,
    //         },
    //         {
    //         dates: '1999',
    //         value: 13,
    //         },
    //         {
    //         dates: '1999',
    //         value: 8,
    //     },
    //   ];
    //   var config = {
    //     data: data,
    //     xField: 'year',
    //     yField: 'value',
    //     stepType: 'vh',
    //   };

      const waterFlowconfig = {
        title: {
          visible: true,
          text: '水波图',
        },
        min: 0,
        max: 10000,
        value: 5639,
      };
    //   waterflow chart config
    return (
        
        
        
        <div className="site-card-wrapper">
        <Row className = "UsageCard" gutter={16}>
        <Col span={8}>
            <Card  title="All Equipment usage" bordered={true}
            bodyStyle={{backgroundColor: '#a0a0a0', border: 0 }}
            >
                <div className = "Usage_image">
                    <div className="icons-list">
                        <DashboardOutlined style={{ fontSize: '300%'}}/>
                    </div>
                </div>
        
                <div className = "Usage_data">
                    <Title level={3}>The current usage is: </Titile>
                </div>
                <div className = "data_shown">
                    60
                </div>

            </Card>
        </Col>
        <Col span={8}>
            <Card title="Available Equipments" bordered={true}>
            <div className = "AE image">
                    <div className="icons-list">
                        <ScheduleOutlined style={{ fontSize: '300%'}}/>
                    </div>
                </div>
        
                <div className = "AE_data">
                    The current usage is
                </div>
                <div className = "AE_data_shown">
                    60
                </div>
            </Card>
        </Col>
        <Col span={8}>
            <Card title="Occupied Equipments" bordered={true}>
            <div className = "OE_Usage image">
                    <div className="icons-list">
                        <SyncOutlined spin style={{ fontSize: '300%'}}/>
                    </div>
                </div>
        
                <div className = "OE_Usage data">
                    The current usage is
                </div>
                <div className = "OE_data_shown">
                    60
                </div>
            </Card>
        </Col>
        </Row>
        {/* <Line className = "line_chart" {...config} /> */}
        <Liquid {...waterFlowconfig} />
        </div>
        
    )
}


export default Index;





