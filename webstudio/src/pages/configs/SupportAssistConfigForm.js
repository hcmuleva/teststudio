
import { useSelect } from "@refinedev/antd";

import { useList } from "@refinedev/core";
import { Col, Form, Input, Row, Select } from 'antd';
import { useState } from "react";
const API_URL = process.env.REACT_APP_API_SERVER
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY

const SupportAssistConfigForm = ({ testtypeval }) => {
    const [auttype, setAuttype] = useState(null)
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
        console.log(`selected ${value}`);
        const selectedOption = options.filter((elm) => {
            return elm.id === value
        }
        )
        setAuttype(selectedOption[0].auttype)
    };

    return (
        <div>
            <Row>
               
                <Col span={10}>
                    <Form.Item
                        label="ConfigName"
                        name="name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={2}></Col>
                <Col span={10}>

                    <Form.Item
                        label="ProjectName"
                        name="project"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select options={options.map((elm) => {
                            return { label: elm.name, value: elm.id }
                        })} onChange={handleChange} />
                    </Form.Item>

                </Col>
                <Col span={10}>
                    <Form.Item
                        label="AUT HostURL(e.g https://perf.dmf.dell.com)"
                        name="host"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={2}></Col>
                
            </Row>
            
            <Row>
                <Col span={6}></Col>

                <Col span={6}>

                </Col>
            </Row>
        </div>
    );
};

export default SupportAssistConfigForm;