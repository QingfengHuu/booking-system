import React, { useState, useEffect, useLayoutEffect } from "react";
import { Form, Card, Input, Button, message, Upload, Icon } from "antd";
import { TerminalGetOneById, TerminalModifyApi } from "../../../services/terminal";


function TerminalEdit(props) {
    // const dataSource1 = [{
    //     e_id: 1,
    //     e_team: 'HWSS',
    //     e_group:'DELL 13G',
    //     e_cluster:'cluster',
    //     e_servergroup: 'DELL 13G',
    //     e_title: '13G R630',
    //     e_location: 'DELL Server10',
    //     e_iDrac_ip: '20.12.131.24',
    //     e_tag: 'HBMNBD2'
    // }]

    const [currentData, setCurrentData] = useState([]);
    const [dataSource, setDataSource]=useState([])
    const [form] = Form.useForm()
    
    useLayoutEffect(()=>{
      if(props.match.params.id){
        TerminalGetOneById(props.match.params.id).then(res=>{
          form.setFieldsValue(res.data.data[0])
        })
      }
    })

    useEffect(() => {
      if (props.match.params.id) {
        TerminalGetOneById(props.match.params.id).then(res => {
          setCurrentData(res.data.data);
        });
      }
    }, []);

      

    return(
        <Card
            title="Terminal Edit"
            extra={
                <Button onClick={() => props.history.push("/admin/terminal")}>
                    返回
                </Button>
            }
        >
        <Form form={form} 
        onFinish={(values)=>{
          TerminalModifyApi(values.e_id,values).then(res=>{
            console.log("dd")
          }
          )
        }
        }
        >
          <Form.Item
            label="ID"
            name="e_id"
            rules={[{ required: true, message: "Can't be null!" }]}
            initialValue={form.e_id}
          >
            <Input disabled='disabled'/>
          </Form.Item>
          <Form.Item
            label="Title"
            name="e_title"
            rules={[{ required: true, message: "Can't be null!" }]}
            initialValue={form.e_titile}
          >
            <Input disabled='disabled'/>
          </Form.Item>
          <Form.Item
            label="Status"
            name="e_status"
            rules={[{ required: true, message: "Can't be null!" }]}
            initialValue={form.e_status}
          >
            <Input disabled='disabled'/>
          </Form.Item>
          <Form.Item
            label="Tag"
            name="e_tag"
            rules={[{ required: true, message: "Can't be null!" }]}
            initialValue={form.e_tag}
          >
            <Input disabled='disabled'/>
          </Form.Item>
          <Form.Item
            label="Server Group"
            name="e_servergroup"
            rules={[{ required: true, message: "Can't be null!" }]}
            initialValue={form.e_servergroup}
          >
            <Input disabled='disabled'/>
          </Form.Item>
          <Form.Item
            label="Cluster"
            name="e_cluster"
            rules={[{ required: true, message: "Can't be null!" }]}
            initialValue={form.e_cluster}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="e_location"
            rules={[{ required: true, message: "Can't be null!" }]}
            initialValue={form.e_location}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="iDrac_Ip"
            name="e_iDrac_ip"
            rules={[{ required: true, message: "Can't be null!" }]}
            initialValue={form.e_iDrac_ip}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="GeoLocation"
            name="e_geolocation"
            rules={[{ required: true, message: "Can't be null!" }]}
            initialValue={form.e_geolocation}
          >
            <Input />
          </Form.Item>
          
          <Form.Item>
          <Button htmlType="submit" type="primary" >
              保存
          </Button>
          </Form.Item>
        </Form>
    </Card>
    );
}

export default TerminalEdit