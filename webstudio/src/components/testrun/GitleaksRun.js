
import { Modal, Form, Col, Input, Row, Typography, Upload, Divider } from 'antd';
import axios from 'axios';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Select, Space } from 'antd';

import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
import React, { useState } from 'react';
import { setInitialFilters } from '@refinedev/core';
const conffiles = Array.from([
    {
        key: "do-not-display-secret-in-plain-text",
        title: "Do not display secrets in plain text",
        description: "do-not-display-secret-in-plain-text"
    },
    {
        key: "store-secrets-securely",
        title: "Store secrets securely",
        description: "store-secrets-securely"
    }

]);
const GitleaksRun = ({ open, setOpen, item }) => {
    console.log(" ZAPSDLRun item", item)
    const options = [];
    const openAPIOptions=[]
    const [authToken, setAuthToken]=useState("")
    console.log("Default ZAP SDL Run")
    // item.openapifiles.map((elm) => { openAPIOptions.push({ label: elm.name, value: elm.url }) })
    conffiles.map((elm) => { options.push({ label: elm.title, value: elm.key }) })
    const [configfile, setConfigfile] = useState([])
    // const [openAPIfile, setOpenAPIfile] = useState([])
    // const [apipath,setApipath]=useState(item?.apipath??"")
    const handleChange = (value) => {
        console.log(`selected ${value}`)
        setConfigfile(value)
    };
    /* const handleOpenAPIChange = (value) => {
        console.log(`selected ${value}`)
        setOpenAPIfile(value)
    }; */
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [mountpath,setMountpath]=useState(item.mountpath)
    const intdata = {
        host: item.host,
        testplatformurl: item?.testplatformurl ?? process.env.REACT_APP_ORCHESTRATOR_URL,
        formdata:mountpath,
        testprojectpath: item.testprojectpath,
        testprojectversion: item.testprojectversion,
        apipath: item.apipath,
        configfiles: [],
        inifile: item.inifile?.url,
    }
    const [formdata, setFormdata] = useState(intdata)
   
    

    const [jsonFile, setJsonFile] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setJsonFile(file);
      };
    
    const handleOk = async (values) => {
        const userobj = localStorage.getItem('user')
        const user = JSON.parse(userobj)
        // formdata['openAPIfile'] = openAPIfile
        formdata['configid'] = item.id
        formdata['framework'] = item.framework
        formdata['users_permissions_user'] = user.id
        //values.preventDefault();
        formdata['mountpath'] = mountpath
        formdata['configfile'] = configfile
        // formdata['apipath'] =apipath
        formdata['authToken'] = authToken
        console.log("values",values)
        const mydata = { data: formdata }

        const myformData = new FormData();
        myformData.append('data', JSON.stringify(formdata)); // Replace with your JSON data
        myformData.append('file', jsonFile);
    
        console.log("mydata", mydata)
        try {
            const response = await fetch(`${formdata.testplatformurl}/sdl`, {
              method: 'POST',
              body: myformData,
            });
      
            if (response.ok) {
              // Handle success
              console.log('File uploaded successfully');
            } else {
              // Handle errors
              console.error('File upload failed');
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
        // await axios.post(`${formdata.testplatformurl}/sdl`, mydata)
        //   .then(response => {
        //     console.log('Response:', response);
        //     setOpen(false);

        //   })
        //   .catch(error => {
        //     console.error('Error:', error);

        //   });
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
                            label="Codebase Path"
                            tooltip={{ title: 'Path to codebase', icon: <InfoCircleOutlined /> }}
                        >
                            <Input value={formdata.host} onChange={(event) => { setFormdata({ ...formdata, host: event.target.value }) }} />

                        </Form.Item>
                    </Col>
                    <Col span={2}>  </Col>
                    <Col span={10}>
                        <Form.Item
                            label="Orchestrator"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            tooltip={{ title: 'Orchestrator', icon: <InfoCircleOutlined /> }}
                        >
                            <Input value={formdata.testplatformurl} onChange={(event) => { setFormdata({ ...formdata, testplatformurl: event.target.value }) }} />
                        </Form.Item>
                    </Col>

                    <Col span={2}>  </Col>

                    <Col span={2}>  </Col>
                   

                </Row>
                {/* <Row>
                    <Col span={20}>
                        <Form.Item
                            label="Select OpenAPI"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            tooltip={{ title: 'ZAP require config to run it', icon: <InfoCircleOutlined /> }}
                        >
                            <Select
                                mode="single"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                defaultValue={openAPIfile}
                                onChange={handleOpenAPIChange}
                                options={openAPIOptions}
                            />
                        </Form.Item>
                    </Col>

                </Row> */}
                <Row>
                    <Col span={20}>
                        <Form.Item
                            label="Select Config"
                            tooltip={{ title: 'ZAP require config to run it', icon: <InfoCircleOutlined /> }}
                        >

                           
                            <Select
                                mode="single"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                defaultValue={configfile}
                                onChange={handleChange}
                                options={options}
                            />
                        </Form.Item>
                    </Col>

                </Row>
                
                <Row>
                    <Col span={20}>
                        <Form.Item
                            label="Mount path"
                            tooltip={{ title: 'Mount path', icon: <InfoCircleOutlined /> }}
                        >

                           
                            <Input value={mountpath} onChange={(event) => {setMountpath(event.target.value)}} />
                        </Form.Item>
                    </Col>

                </Row>
            </div>
            <div>
        
      </div>
      <Divider/>
            
        </Modal>
    );
};

export default GitleaksRun;