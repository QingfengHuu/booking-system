// import React from 'react'
import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { Liquid } from '@ant-design/charts';
// import Test from 'NODE_PATH=./src/components/charts.js';
import { Line } from '@ant-design/charts';
import './index.css';

// import {
//     HomeOutlined,
//     SettingFilled,
//     SmileOutlined,
//     SyncOutlined,
    
//   } from '@ant-design/icons';

const Index = () => {
    
    var data = [
        {
            dates: '1991',
            value: 3,
            },
            {
            dates: '1992',
            value: 4,
            },
            {
            dates: '1993',
            value: 3,
            },
            {
            dates: '1994',
            value: 5,
            },
            {
            dates: '1995',
            value: 9,
            },
            {
            dates: '1996',
            value: 6,
            },
            {
            dates: '1997',
            value: 7,
            },
            {
            dates: '1998',
            value: 9,
            },
            {
            dates: '1999',
            value: 13,
            },
            {
            dates: '1999',
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
    //   waterflow chart config
    return (
        
        
        
        <div className="site-card-wrapper">
        <Row gutter={16}>
        <Col span={8}>
            <Card className = "UsageCard" title="All Equipment usage" bordered={true}
            style={{ border-radius: 10px }}
            bodyStyle={{backgroundColor: '#a0a0a0', border-radius: 10px, border: 0 }}
            >
                <div className = "Usage image">
                {/* <div className="icons-list">
                    <SyncOutlined spin />
                </div> */}
                    <image>
                        <img className={['centered']} src='https://www.ashdowngroup.com/wp-content/uploads/2019/06/Dell_EMC_logo.svg.png' width='140px'/>
                    </image> 
                </div>
        
                <div className = "Usage data">
                    The current usage is
                </div>
                <div className = "data_shown">
                    60
                </div>

            </Card>
        </Col>
        <Col span={8}>
            <Card title="Available Equipments" bordered={true}>
            <div className = "AE image">
                    <image>
                        <img className={['centered']} src='https://www.ashdowngroup.com/wp-content/uploads/2019/06/Dell_EMC_logo.svg.png' width='140px'/>
                    </image> 
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
                    <image>
                        <img className={['centered']} src='https://www.ashdowngroup.com/wp-content/uploads/2019/06/Dell_EMC_logo.svg.png' width='140px'/>
                    </image> 
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
        <Line {...config} />
        <Liquid {...waterFlowconfig} />
        </div>
        
    )
}


export default Index;





