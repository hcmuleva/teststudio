
import React, { useState } from 'react';
import { useSelect } from "@refinedev/antd";
import { useList, useShow } from "@refinedev/core";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { Button, Form, Input, Space, Upload, Row, Col, Radio, Divider } from 'antd';
import { Select } from 'antd';
import frameworklist from '../../data/frameworklist.json';

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const UnitConfigForm = ({ formdata, setFormdata }) => {
    const [type, setType] = useState("UNIT");
    const [testtype, setTesttype] = useState("TestNG");
 
    const [selections, setSelections] = useState([]);
    // setFormdata((prevData) => ({
    //     ...prevData,
    //     type:  "UNIT", // Set the subtype or an empty string if not available
    //   }));
    
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

    
   

    const handleChange = (value) => {
        setTesttype(value)
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
                        label="Enter Path of Framework"
                        name="path"
                        rules={[{ required: true, message: 'PATH is required' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <Form.Item
                        label="Select Framework"
                        name="testtype"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                       <Select
                    
                    style={{
                      width: 120,
                    }}
                    onChange={handleChange}
                    options={frameworklist["UNIT"]}
                  />
                    </Form.Item>
                </Col>
               
            </Row>
            
           

        </div>
    );
};

export default UnitConfigForm;
