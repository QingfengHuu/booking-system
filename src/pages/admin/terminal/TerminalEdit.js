import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, message, Upload, Icon } from "antd";
import { TerminalGetOneById } from "../../../services/terminal";


function TerminalEdit(props) {

    const [currentData, setCurrentData] = useState({});

    useEffect(() => {
        if (props.match.params.id) {
          TerminalGetOneById(props.match.params.id).then(res => {
            setCurrentData(res);
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
        <Form >
        <Form.Item
                    label="Title"
                    name="e_title"
                    rules={[{ required: true, message: "Can't be null!" }]}
                    initialValue={currentData.e_title}
                  >
                    <Input disabled='disabled'/>
                  </Form.Item>
                  <Form.Item
                    label="Status"
                    name="e_status"
                    rules={[{ required: true, message: "Can't be null!" }]}
                    initialValue={currentData.e_status}
                  >
                    <Input disabled='disabled'/>
                  </Form.Item>
                  <Form.Item
                    label="Tag"
                    name="e_tag"
                    rules={[{ required: true, message: "Can't be null!" }]}
                    initialValue={currentData.e_tag}
                  >
                    <Input disabled='disabled'/>
                  </Form.Item>
                  <Form.Item
                    label="Server Group"
                    name="e_servergroup"
                    rules={[{ required: true, message: "Can't be null!" }]}
                    initialValue={currentData.e_servergroup}
                  >
                    <Input disabled='disabled'/>
                  </Form.Item>
                  <Form.Item
                    label="Cluster"
                    name="e_cluster"
                    rules={[{ required: true, message: "Can't be null!" }]}
                    initialValue={currentData.e_cluster}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Location"
                    name="e_location"
                    rules={[{ required: true, message: "Can't be null!" }]}
                    initialValue={currentData.e_location}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="iDrac_Ip"
                    name="e_iDrac_ip"
                    rules={[{ required: true, message: "Can't be null!" }]}
                    initialValue={currentData.e_iDrac_ip}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="GeoLocation"
                    name="e_geolocation"
                    rules={[{ required: true, message: "Can't be null!" }]}
                    initialValue={currentData.e_geolocation}
                  >
                    <Input />
                  </Form.Item>
            
            <Form.Item>
            <Button htmlType="submit" type="primary">
                保存
            </Button>
            </Form.Item>
        </Form>
    </Card>
    );
}

export default TerminalEdit