
    import { Modal, Form, Col, Input, Row, Typography } from 'antd';
    import axios from 'axios';
    import { InfoCircleOutlined } from '@ant-design/icons';
    import { Select, Space } from 'antd';
    
    import React, { useState } from 'react';
    const FunctionalTestRun = ({ open, setOpen, item }) => {
      const options = [];
      const[scenariotag,setscenariotag]=useState()
      console.log("FunctionalTestRunitem", item)
      const tagarray = item?.tags?.split(",") ?? []
      console.log("tagarray", tagarray)
      const [tag, setTag] = useState([])
      tagarray.map((elm) => { options.push({ label: elm, value: elm }) })
     
      const handleChange = (value) => {
        console.log(`selected ${value}`);
    
        setTag(value)
      };
      const [confirmLoading, setConfirmLoading] = useState(false);
      const intdata = {
        host: item.host,
        testplatformurl: item?.testplatformurl ?? process.env.REACT_APP_ORCHESTRATOR_URL,
        tags: item.tags,
        testprojectpath: item.testprojectpath,
        testprojectversion: item.testprojectversion,
        apipath: item.apipath,
        inifile: item.inifile?.url,
      }
      const [formdata, setFormdata] = useState(intdata)
      console.log("Formdata", formdata)
      const { Text } = Typography;
      formdata['tags'] = tag
      const handleOk = async () => {
        //TODO: Need to create a array of tags and pass it. 
        formdata['tags'] = scenariotag
        const mydata = { data: formdata }

        await axios.post(`${formdata.testplatformurl}/functional`, mydata)
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
                  label="Orchestrator"
                  tooltip={{ title: 'Orchestrator', icon: <InfoCircleOutlined /> }}
                >
                  <Input value={formdata.testplatformurl} onChange={(event) => { setFormdata({ ...formdata, testplatformurl: event.target.value }) }} />
                </Form.Item>
              </Col>
    
              <Col span={2}>  </Col>
              <Col span={10}>
                <Form.Item
                  label="AutomationDockerImageName"
                  tooltip={{ title: 'Credent ProjectPath', icon: <InfoCircleOutlined /> }}
                >
                  <Input value={formdata.testprojectpath} onChange={(event) => { setFormdata({ ...formdata, testprojectpath: event.target.value }) }} />
                </Form.Item>
              </Col>
              <Col span={2}>  </Col>
    
              <Col span={10}>
                <Form.Item
                  label="AutomationDockerImageTag"
                  tooltip={{ title: 'Testproject version', icon: <InfoCircleOutlined /> }}
                >
                  <Input value={formdata.testprojectversion} onChange={(event) => { setFormdata({ ...formdata, testprojectversion: event.target.value }) }} />
                </Form.Item>
              </Col>
              <Col span={2}>  </Col>
              <Col span={10}>
                <Form.Item
                  label="API PATH"
                  tooltip={{ title: 'API PATH of AUT', icon: <InfoCircleOutlined /> }}
                >
                  <Input value={formdata.apipath} onChange={(event) => { setFormdata({ ...formdata, apipath: event.target.value }) }} />
                </Form.Item>
              </Col>
    
            </Row>
    
            <Row>
              <Col span={20}>
                <Form.Item
                  label="Scenario Tags"
                  tooltip={{ title: 'Provide Scenario Tag and you can provide comma separated', icon: <InfoCircleOutlined /> }}
                >
    
                  <Input  value={scenariotag} onChange={(event) => {setscenariotag(event.target.value)} } />
                        
                  {/* <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Please select"
                    defaultValue={tag}
                    onChange={handleChange}
                    options={options}
                  /> */}
                </Form.Item>
              </Col>
    
            </Row>
    
          </div>
        </Modal>
      );
    };
export default FunctionalTestRun;