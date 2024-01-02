import { Modal, Form, Col, Input, Row, Typography } from 'antd';
import axios from 'axios';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Select, Space } from 'antd';

import React, { useState } from 'react';
const SupportAssistRun = ({ open, setOpen, item }) => {
  const options = [];
  
  const [confirmLoading, setConfirmLoading] = useState(false);
  const userobj = localStorage.getItem('user')
  const user = JSON.parse(userobj)

  const intdata = {
    host: item.host,
    
    testplatformurl: process.env.REACT_APP_SUPPORTASSIST_SERVER,
    total_request:1,
    threads:1,
    duration:1,
    challenge_api_path:"devicesvc/api/v1/challenge",
    register_api_path:"devicesvc/api/v2/register",
    service_tag_length:7

  }
  const [formdata, setFormdata] = useState(intdata)
  const { Text } = Typography;
  formdata['users_permissions_user'] = user.id
  formdata['config'] = item.id
  
  const handleOk = async () => {
    const mydata = { data: formdata }
    console.log("mydata", mydata)
    console.log("mydata", mydata)
    await axios.post(`${formdata.testplatformurl}`, mydata)
      .then(response => {
        console.log('Response:', response);
        setOpen(false);
      })
      .catch(error => {
        console.error('Error:', error);

      });
    setOpen(false);


  }
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const parseInteger = (value) => {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? 0 : parsedValue;
  };
  return (
    <Modal
      title="SupportAssist Run Test"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Run"
      cancelText="Cancel"
    >
      <div>
        <Row>

          <Col span={10}>
            <Form.Item
              label="AUT"
              tooltip={{ title: 'AUT', icon: <InfoCircleOutlined /> }}
            >
              <Input value={formdata.host} onChange={(event) => { setFormdata({ ...formdata, host: event.target.value }) }} />

            </Form.Item>
          </Col>
          <Col span={2}>  </Col>
          <Col span={10}>
            <Form.Item
              label="Total Request"
              tooltip={{ title: 'Total Request', icon: <InfoCircleOutlined /> }}
            >
              <Input value={formdata.total_request} onChange={(event) => { setFormdata({ ...formdata, total_request: parseInteger(event.target.value) }) }} />
            </Form.Item>
          </Col>

          <Col span={2}>  </Col>
          <Col span={10}>
            <Form.Item
              label="Parallel Requests"
              tooltip={{ title: 'Total Parallel Request', icon: <InfoCircleOutlined /> }}
            >
              <Input value={formdata.threads} onChange={(event) => { setFormdata({ ...formdata, threads: parseInteger(event.target.value) }) }} />
            </Form.Item>
          </Col>
          <Col span={2}>  </Col>

          <Col span={10}>
            <Form.Item
              label="Duration (in seconds)"
              tooltip={{ title: 'Duration at which you require to run test', icon: <InfoCircleOutlined /> }}
            >
              <Input value={formdata.duration} onChange={(event) => { setFormdata({ ...formdata, duration: parseInteger(event.target.value)  }) }} />
            </Form.Item>
          </Col>
          <Col span={2}>  </Col>
          <Col span={10}>
            <Form.Item
              label="Challenge Api Path"
              tooltip={{ title: 'Challenge Api Path', icon: <InfoCircleOutlined /> }}
            >
              <Input value={formdata.challenge_api_path} onChange={(event) => { setFormdata({ ...formdata, challenge_api_path: event.target.value }) }} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Register Api Path"
              tooltip={{ title: 'Register Api Path', icon: <InfoCircleOutlined /> }}
            >
              <Input value={formdata.register_api_path} onChange={(event) => { setFormdata({ ...formdata, register_api_path: event.target.value }) }} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="ServiceTag Length"
              tooltip={{ title: 'ServiceTag Length', icon: <InfoCircleOutlined /> }}
            >
              <Input value={formdata.service_tag_length} onChange={(event) => { setFormdata({ ...formdata, service_tag_length: parseInteger(event.target.value )}) }} />
            </Form.Item>
          </Col>

        </Row>

       

      </div>
    </Modal>
  );
};

export default SupportAssistRun;