import React, { useState } from 'react';
import { useSelect } from "@refinedev/antd";
import { useList, useShow } from "@refinedev/core";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { Button, Form, Input, Space, Upload, Row, Col, Radio, Divider } from 'antd';
import { Select } from 'antd';

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const FunctionalConfigForm = ({ formdata, setFormdata }) => {
    const [auttype, setAuttype] = useState("KARATE");
    const [responses, setResponses] = useState([]);
    const [selections, setSelections] = useState([]);
    const [openAPIFileList, setOpenAPIFileList] = useState([])
    const handleSelectionChange = (index, value) => {
        const updatedSelections = [...selections];
        updatedSelections[index] = value;
        setSelections(updatedSelections);
    };
    
    const { selectProps } = useSelect({
        resource: "projects",
        optionLabel: "name",
        optionValue: "id",
    });

    const { data, isLoading, isError } = useList({
        resource: "projects",
    });

    const options = data?.data ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    
    console.log("openAPIFileList", openAPIFileList)
    const handleFileUpload = (info) => {
        if (info.file.status === 'done') {
            setResponses([...responses, info.file.response]);
        }
    };

    const handleChange = (value) => {
        // filter value from options where id = value
        const selectedOption = options.filter((elm) => elm.id === value);
        setAuttype(selectedOption[0].auttype);
    };

    

    return (
        <div style={{ width: '100%', padding: '20px' }}>
           

            <Row style={{ width: '100%' }}>
                <Col span={10}>
                    <Form.Item
                        label="ConfigName"
                        name="name"
                        rules={[{ required: true, message: 'Missing Config Name' }]}
                    >
                        <Input placeholder="Enter Config Name" />
                    </Form.Item>
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <Form.Item
                        label="ProjectName"
                        name="project"
                        rules={[{ required: true, message: 'Missing Project Name' }]}
                    >
                        <Select options={options.map((elm) => ({
                            label: elm.name,
                            value: elm.id,
                        }))} onChange={handleChange} />
                    </Form.Item>
                </Col>

                <Col span={10}>
                    <Form.Item
                        label="AUT HostURL(e.g https://perf.dmf.dell.com)"
                        name="host"
                        rules={[{ required: true, message: 'Missing AUT HostURL' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <Form.Item
                        label="TestPlarform (e.g. http://IP:5000)"
                        name="testplatformurl"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
               
            </Row>
            
           

            <Row style={{ width: '100%' }}>
                    <Col span={10}>
                        <Form.Item
                            label="API_PATH"
                            name="apipath"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={2}>   </Col>

                    <Col span={10}>
                        <Form.Item
                            label="SCENARIO TAGS"
                            name="tags"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={2}>   </Col>

                    <Col span={10}>
                        <Form.Item
                            label="TestProjectPath"
                            name="testprojectpath"

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={2}>   </Col>

                    <Col span={10}>
                        <Form.Item
                            label="TestProjectVersion"
                            name="testprojectversion"

                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={20}>
                    <Form.Item
  name="inifile"
  valuePropName="fileList"
  getValueProps={(data) => getValueProps(data, API_URL)}
  noStyle
>
  <div style={{ marginBottom: '16px' }}>
    <Upload.Dragger
      name="files"
      action={`${API_URL}/api/upload`}
      headers={{
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      }}
      accept=".ini"
      onChange={(info) => {
        if (info.file.status === 'done') {
          setFormdata((prevData) => ({
            ...prevData,
            inifile: info.fileList.map((file) => file.url),
          }));
        }
      }}
    >
      <p className="ant-upload-text">Ini file</p>
    </Upload.Dragger>
  </div>
</Form.Item>


                    </Col>
                </Row>

        </div>
    );
};

export default FunctionalConfigForm;
