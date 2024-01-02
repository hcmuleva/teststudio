import { Modal,Form,Col, Input,Row, Typography } from 'antd';
import axios from 'axios';
import { InfoCircleOutlined } from '@ant-design/icons';

import React, { useState } from 'react';

const UnitTestRun = ({open,setOpen,item}) => {
    console.log("ITEM",item)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const intdata = {
        host: item.host,
        orchestratorpath: item?.testplatformurl?? process.env.REACT_APP_ORCHESTRATOR_URL,
        project: item.project,
        projectlocation: "",
    }
    const [formdata, setFormdata] = useState(intdata)
    const { Text } = Typography;
    const handleOk =async()=>{
        formdata.item = item
        const mydata = { data: formdata }
        console.log('Clicked OK with:', formdata);
        await axios.post(`${formdata.orchestratorpath}/unit`, mydata)
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
    return (
        <Modal
        title="Run Test"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Run"
        cancelText="Cancel"
      >
        <div>
            <Row>
               
                <Col span={12}>
                <Form.Item
                       label="TestStudio URL"
                        tooltip={{ title: 'Orchestrator', icon: <InfoCircleOutlined /> }}
                    >
                      <Input  value={formdata.orchestratorpath} onChange={(event) => { setFormdata({ ...formdata, orchestratorpath: event.target.value }) }} />
                
                    </Form.Item>
                </Col>
                </Row><Row>
                <Col span={12}>
              
                <Form.Item
                        label="Unit Testsuite  Absolute Path"
                        tooltip={{ title: 'Project Location', icon: <InfoCircleOutlined /> }}
                    >
                      <Input  value={formdata.projectlocation} onChange={(event) => { setFormdata({ ...formdata, projectlocation: event.target.value }) }} />
                
                    </Form.Item>
                </Col>
                </Row>
           

        </div>
        </Modal>
    );
};


export default UnitTestRun;