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

    var a, b, c, d, e, f, g, h;
    var datelist = ['21/07/21', '21/07/22', '21/07/23', '21/07/24', '21/07/22'];
    
    var data = [
        {
          year: '1991',
          value: 3,
        },
        {
          year: '1992',
          value: 4,
        },
        {
          year: '1993',
          value: 3.5,
        },
        {
          year: '1994',
          value: 5,
        },
        {
          year: '1995',
          value: 4.9,
        },
        {
          year: '1996',
          value: 6,
        },
        {
          year: '1997',
          value: 7,
        },
        {
          year: '1998',
          value: 9,
        },
        {
          year: '1999',
          value: 90,
        },
        {
          year: '1999',
          value: 8,
        },
      ];
      var config = {
        data: data,
        xField: 'year',
        yField: 'value',
        stepType: 'vh',
      };

      const waterFlowconfig = {
        title: {
          visible: true,
          text: '水波图',
        },
        min: 0,
        max: 10000,
        value: 5639,
      };

      const { Title } = Typography;
    //   waterflow chart config
    return (
        
        
        
        <div className="site-card-wrapper">
        <Row className = "UsageCard" gutter={16}>
        <Col span={8}>
            <Card  title="All Equipment usage" bordered={true}
            headStyle={{backgroundColor: '#a0a0a0', border: 0 }}
            >
                <div className = "Usage_image">
                    <div className="icons-list">
                        <DashboardOutlined style={{ fontSize: '400%'}}/>
                    </div>
                </div>
        
                <div className = "dataGroupA">
                    <div className = "Usage_data">
                        <Title level={3}>Current Usage </Title>
                    </div>
                    <div className = "data_shown">
                        <Title level={2}>120 </Title>
                    </div>
                </div>
                

            </Card>
        </Col>
        <Col span={8}>
            <Card title="Available Equipments" bordered={true}
            headStyle={{backgroundColor: '#a0a0a0', border: 0 }}
            >
                <div className = "AE_image">
                    <div className="icons-list">
                        <ScheduleOutlined style={{ fontSize: '400%'}}/>
                    </div>
                </div>
                <div className = "dataGroupB">
                    <div className = "AE_data">
                        <Title level={3}>Equipments Available </Title>
                    </div>
                    <div className = "AE_data_shown">
                        <Title level={2}>60 </Title>
                    </div>
                </div>
                
                
            </Card>
        </Col>
        <Col span={8}>
            <Card title="Occupied Equipments" bordered={true}
            headStyle={{backgroundColor: '#a0a0a0', border: 0 }}
            >
            <div className = "OE_Usage_image">
                    <div className="icons-list">
                        <SyncOutlined spin style={{ fontSize: '400%'}}/>
                    </div>
                </div>

                <div className="dataGroupC">
                    <div className = "OE_Usage_data">
                        <Title level={3}>Equipments Occupied: </Title>
                    </div>
                    <div className = "OE_data_shown">
                        <Title level={2}>60 </Title>
                    </div>
                </div>
                
            </Card>
        </Col>
        </Row>
        <div className = "cardWrapperA">
            <Card className = "line_chart_space" style={{ width: 1100 }}>
                <Line className = "line_chart" {...config} />
            </Card>
        </div>
        
        <div className = "cardWrapperB">
            <Card className = "flow_chart_space" style={{ width: 560 }}>
                <Liquid {...waterFlowconfig} />
            </Card>
        </div>
        
        </div>
        
    )
}


export default Index;





