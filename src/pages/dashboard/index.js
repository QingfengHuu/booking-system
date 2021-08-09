// yet another comment for testing git
// lorem ipsum dolore et ...
// import React from 'react'
import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
// import { Liquid } from '@ant-design/charts';
import { Gauge } from '@ant-design/charts';
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

    // var a, b, c, d, e, f, g, h;
    // var varibleList = [a, b, c, d, e, f, g, h];
    var datelist = ['21/07/21', '21/07/22', '21/07/23', '21/07/24', '21/07/25', '21/07/26', '21/07/27', '21/07/28', '21/07/29', '21/07/30'];
    
    var data = [
        {
          date: datelist[0],
          key: 'User usage',
          value: 125,
        },
        {
            date: datelist[0],
          key: 'Total usage',
          value: 51,
        },
        {
            date: datelist[1],
          key: 'User usage',
          value: 132,
        },
        {
            date: datelist[1],
          key: 'Total usage',
          value: 91,
        },
        {
            date: datelist[2],
          key: 'User usage',
          value: 141,
        },
        {
            date: datelist[2],
          key: 'Total usage',
          value: 34,
        },
        {
            date: datelist[3],
          key: 'User usage',
          value: 158,
        },
        {
            date: datelist[3],
          key: 'Total usage',
          value: 47,
        },
        {
            date: datelist[4],
          key: 'User usage',
          value: 133,
        },
        {
            date: datelist[4],
          key: 'Total usage',
          value: 63,
        },
        {
            date: datelist[5],
          key: 'User usage',
          value: 143,
        },
        {
            date: datelist[5],
          key: 'Total usage',
          value: 58,
        },
        {
            date: datelist[6],
          key: 'User usage',
          value: 176,
        },
        {
            date: datelist[6],
          key: 'Total usage',
          value: 56,
        },
        {
            date: datelist[7],
          key: 'User usage',
          value: 194,
        },
        {
            date: datelist[7],
          key: 'Total usage',
          value: 77,
        },
        {
            date: datelist[8],
          key: 'User usage',
          value: 115,
        },
        {
            date: datelist[8],
          key: 'Total usage',
          value: 99,
        },
        {
            date: datelist[9],
          key: 'User usage',
          value: 134,
        },
        {
            date: datelist[9],
          key: 'Total usage',
          value: 106,
        },
      ];
      var config = {
        data: data,
        xField: 'date',
        yField: 'value',
        legend: true,
        seriesField: 'key',
        color: ["#0058FF", '#21D59B'],
        stepType: 'hvh',
        legend: {
            layout: 'horizontal',
            position: 'top'
          }
      };

    //   const waterFlowconfig = {
    //     title: {
    //       visible: true,
    //       //text: '水波图',
    //     },
    //     description: {
    //       visible: true,
    //       //text: '水波图 - 百分比显示',
    //     },
    //     min: 0,
    //     max: 10000,
    //     value: 5639,
    //     statistic: { formatter: (value) => ((100 * value) / 10000).toFixed(1) + '%' },
    //   };
        const gaugeConfig = {
            percent: 0.75,
            type: 'meter',
            innerRadius: 0.75,
            range: {
              ticks: [0, 1 / 3, 2 / 3, 1],
              color: ['#1a1325', '#51258f', '#ab7ae0'],
            },
            indicator: {
              pointer: { style: { stroke: '#D0D0D0' } },
              pin: { style: { stroke: '#D0D0D0' } },
            },
            statistic: {
              content: {
                style: {
                  fontSize: '36px',
                  lineHeight: '36px',
                },
              },
            },
          };

      const { Title } = Typography;
    //   waterflow chart config
    return (
        
        <div className="site-card-wrapper">
            <Title level={1} className="overviewHeader">Overview</Title>
        <Row className = "UsageCard" gutter={16}>
        <Col className = "cardRow" span={8}>
            <Card  title="All Equipment usage" bordered={true}
            headStyle={{backgroundColor: '#D7DBEC', borderRadius: 10, fontSize: 26}}
            style={{borderRadius: 20}}
            >
                <div className = "Usage_image">
                    <div className="icons-list">
                        <DashboardOutlined  style={{ fontSize: '400%'}}/>
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
            headStyle={{backgroundColor: '#D7DBEC', borderRadius: 10, fontSize: 26 }}
            style={{borderRadius: 20}}
            >
                <div className = "AE_image">
                    <div className="icons-list">
                        <ScheduleOutlined  style={{ fontSize: '400%'}}/>
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
            headStyle={{backgroundColor: '#D7DBEC',borderRadius: 10,  fontSize: 26 }}
            style={{borderRadius: 20}}
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
            <Card className = "line_chart_space" style={{ width: 1100, borderRadius: "10px" }}>
                <Line className = "line_chart" {...config} />
            </Card>
        </div>
        
        <div className = "cardWrapperB">
            <Card className = "flow_chart_space" style={{ width: 560, background: "#FFFF", borderRadius: "10px", border:"false" }}>
                {/* <Liquid {...waterFlowconfig} /> */}
                <Gauge {...gaugeConfig} />
            </Card>
        </div>
        
        </div>
        
    )
}


export default Index;





