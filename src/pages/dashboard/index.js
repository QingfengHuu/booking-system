// yet another comment for testing git
// lorem ipsum dolore et ...
// import React from 'react'
import React, {useState, useEffect} from 'react';
import {Card, Col, Row} from 'antd';
// import { Liquid } from '@ant-design/charts';
import {Gauge} from '@ant-design/charts';
// import Test from 'NODE_PATH=./src/components/charts.js';
import {Line} from '@ant-design/charts';
import './index.css';
import {Typography} from 'antd';
import {equipmentCountApi, usageListApi} from '../../services/terminal';

import {
    DashboardOutlined,
    SyncOutlined,
    ScheduleOutlined,

} from '@ant-design/icons';
import {getUsername} from "../../utils/auth";

const Index = () => {

    const [dataSource, setDataSource] = useState({ data_list: [], total_usage: [], user_usage: [] });
    const [allEquipmentUsage, setAllEquipmentUsage] = useState();
    const [avaEquipmentUsage, setAvaEquipmentUsage] = useState();
    const [occupiedEquipmentUsage, setOccupiedEquipmentUsage] = useState();


    


    useEffect(() => {
        usageListApi({username: getUsername()}).then(res => {
            console.log(res.data.data)
            setDataSource(res.data.data);
        }, 
        equipmentCountApi().then(res => {
          setAllEquipmentUsage(res.data.ALL_Equipment_usage);
          setAvaEquipmentUsage(res.data.Available_Equipments);
          setOccupiedEquipmentUsage(res.data.Occupied_Equipments);
      })
        )
    }, [])

    const calculatePercentage=(total, occupied)=>{
      occupied = parseFloat(occupied);
      total = parseFloat(total);
      if (isNaN(occupied) || isNaN(total)) {
          return "-";
      }
      return total <= 0 ? "0%" : (Math.round(occupied / total * 10000) / 100.00)+"%";
    }


    const handleData = (data) => {
        var result = [];
        if (data['data_list'].length > 0){
            var dateList = data["data_list"];
            var totalList = data["total_usage"];
            var userUsage = data["user_usage"];
            result = [
                {
                    date: dateList[0],
                    key: 'User usage',
                    value: userUsage[0],
                },
                {
                    date: dateList[0],
                    key: 'Total usage',
                    value: totalList[0],
                },
                {
                    date: dateList[1],
                    key: 'User usage',
                    value: userUsage[1],
                },
                {
                    date: dateList[1],
                    key: 'Total usage',
                    value: totalList[1],
                },
                {
                    date: dateList[2],
                    key: 'User usage',
                    value: userUsage[2],
                },
                {
                    date: dateList[2],
                    key: 'Total usage',
                    value: totalList[2],
                },
                {
                    date: dateList[3],
                    key: 'User usage',
                    value: userUsage[3],
                },
                {
                    date: dateList[3],
                    key: 'Total usage',
                    value: totalList[3],
                },
                {
                    date: dateList[4],
                    key: 'User usage',
                    value: userUsage[4],
                },
                {
                    date: dateList[4],
                    key: 'Total usage',
                    value: totalList[4],
                },
                {
                    date: dateList[5],
                    key: 'User usage',
                    value: userUsage[5],
                },
                {
                    date: dateList[5],
                    key: 'Total usage',
                    value: totalList[5],
                },
                {
                    date: dateList[6],
                    key: 'User usage',
                    value: userUsage[6],
                },
                {
                    date: dateList[6],
                    key: 'Total usage',
                    value: totalList[6],
                },
                {
                    date: dateList[7],
                    key: 'User usage',
                    value: userUsage[7],
                },
                {
                    date: dateList[7],
                    key: 'Total usage',
                    value: totalList[7],
                },
                {
                    date: dateList[8],
                    key: 'User usage',
                    value: userUsage[8],
                },
                {
                    date: dateList[8],
                    key: 'Total usage',
                    value: totalList[8],
                },
                {
                    date: dateList[9],
                    key: 'User usage',
                    value: userUsage[9],
                },
                {
                    date: dateList[9],
                    key: 'Total usage',
                    value: totalList[9],
                },
            ];
        }


        var config = {
            data: result,
            xField: 'date',
            yField: 'value',
            // legend: true,
            seriesField: 'key',
            color: ["#0058FF", '#21D59B'],
            stepType: 'hvh',
            legend: {
                layout: 'horizontal',
                position: 'top'
            }
        };

        return config;
    };



    const gaugeConfig = {
        percent: calculatePercentage(allEquipmentUsage,occupiedEquipmentUsage),
        type: 'meter',
        innerRadius: 0.75,
        range: {
            ticks: [0, 1 / 3, 2 / 3, 1],
            color: ['#301c4d', '#51258f', '#ab7ae0'],
        },
        indicator: {
            pointer: {style: {stroke: '#D0D0D0'}},
            pin: {style: {stroke: '#D0D0D0'}},
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

    const {Title} = Typography;


    return (

        <div className="site-card-wrapper">
            <Title level={1} className="overviewHeader">Overview</Title>
            <Row className="UsageCard" gutter={16}>
                <Col className="cardRow" span={8}>
                    <Card title="All Equipment usage" bordered={true}
                          headStyle={{backgroundColor: '#D7DBEC', borderRadius: 10, fontSize: 26}}
                          style={{borderRadius: 20}}
                    >
                        <div className="Usage_image">
                            <div className="icons-list">
                                <DashboardOutlined style={{fontSize: '400%'}}/>
                            </div>
                        </div>

                        <div className="dataGroupA">
                            <div className="Usage_data">
                                <Title level={3} ellipsis={true}>Current Usage</Title>
                            </div>
                            <div className="data_shown">
                                <Title level={2} ellipsis={true}>{allEquipmentUsage}</Title>
                            </div>
                        </div>


                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Available Equipments" bordered={true}
                          headStyle={{backgroundColor: '#D7DBEC', borderRadius: 10, fontSize: 26}}
                          style={{borderRadius: 20}}
                    >
                        <div className="AE_image">
                            <div className="icons-list">
                                <ScheduleOutlined style={{fontSize: '400%'}}/>
                            </div>
                        </div>
                        <div className="dataGroupB">
                            <div className="AE_data">
                                <Title level={3} ellipsis={true}>Equipments Available </Title>
                            </div>
                            <div className="AE_data_shown">
                                <Title level={2} ellipsis={true}>{avaEquipmentUsage} </Title>
                            </div>
                        </div>


                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Occupied Equipments" bordered={true}
                          headStyle={{backgroundColor: '#D7DBEC', borderRadius: 10, fontSize: 26}}
                          style={{borderRadius: 20}}
                    >
                        <div className="OE_Usage_image">
                            <div className="icons-list">
                                <SyncOutlined spin style={{fontSize: '400%'}}/>
                            </div>
                        </div>

                        <div className="dataGroupC">
                            <div className="OE_Usage_data">
                                <Title level={3} ellipsis={true}>Equipments Occupied </Title>
                            </div>
                            <div className="OE_data_shown">
                                <Title level={2} ellipsis={true}>{occupiedEquipmentUsage}</Title>
                            </div>
                        </div>

                    </Card>
                </Col>
            </Row>

            <div className='chartsBlock'>

                <div className="cardWrapperA" style={{width: '70%'}}>
                    <Card className="line_chart_space" style={{width: '100%', borderRadius: "10px"}}>
                        <Line className="line_chart" {...handleData(dataSource)} />
                    </Card>
                </div>

                <div className="cardWrapperB" style={{width: '30%'}}>
                    <Card className="flow_chart_space"
                        style={{width: '90%', background: "#FFFF", borderRadius: "10px", border: "false"}}>
                        <Gauge {...gaugeConfig} />
                    </Card>
                </div>

            </div>


        </div>

    )
}


export default Index;



