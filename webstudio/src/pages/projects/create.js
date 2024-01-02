import { Create, useForm } from "@refinedev/antd";
import { Col, Form, Input, Row, Tabs } from "antd";
import { Radio } from 'antd';
import { useState } from "react";
import { Select, Space } from 'antd';



export const ProjectCreate = () => {
    const intdata = {

        name: "",
        project: "",
        namespace: "",
        threadcount: "",
        rampup_time: "",
        total_workers: "",
        loop_count: "",
        influxdburl: "",
        bucket_name: "",
        org_name: "",
        influxtoken: ""


    }
    const autType = ['FILEDOWNLOAD', 'OtherTypes'];

    const { formProps, saveButtonProps } = useForm();
    const [appTypeVal, setAppTypeVal] = useState('FILEDOWNLOAD');

    const tabChange = (key) => {
        console.log(key);
    };
    const onChangeAutType = (value) => {
        setAppTypeVal(value);
    };
    const items = [
        {
            key: '1',
            label: `Project`,
            children: <>
                <Row>
                    <Col span={10}>
                        <Form.Item
                            label="ProjectName"
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
                            label="Description"
                            name="description"
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



            </>
        },

        {
            key: '2',
            label: `INFLUXDB`,

            children: <>
                <Row>
                    <Col span={10}>
                        <Form.Item label="InfluxDB URL" name="influxdburl" >
                            <Input />

                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10}>
                        <Form.Item label="InfluxDB Bucket" name="influxdbbucket" >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item label="InfluxDB Org" name="influxdborg" >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10}>
                        <Form.Item label="InfluxDB Token" name="influxtoken" >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </>
        },
        {
            key: '3',
            label: `GITHUB`,
            children: <>
                <Row>
                    <Col span={10}>
                        <Form.Item label="Github URL" name="githuburl" >
                            <Input />

                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10}>
                        <Form.Item label="Github Branch" name="githubbranch" >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item label="Github token" name="githubtoken" >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10}>
                        <Form.Item label="Github User" name="githubuser" >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </>
        }

    ]
    const getFormComponent = ((type) => {
        switch (type) {
            case 'FILEDOWNLOAD':
                return <Tabs defaultActiveKey="1" items={items} onChange={tabChange} />
                break;
            case 'OtherTypes':
                return <Row>
                    <Col span={10}>
                        <Form.Item
                            label="ProjectName"
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
                            label="Description"
                            name="description"
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
            default:
                return <Row>
                    <Col span={10}>
                        <Form.Item
                            label="ProjectName"
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
                            label="Description"
                            name="description"
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
        }
    })

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item
                            label="AutType"
                            name="auttype"
                            initialValue={appTypeVal} // Use initialValue instead of defaultValue

                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >

                            <Select
                                defaultValue="FILEDOWNLOAD"
                                style={{
                                    width: 220,
                                }}
                                onChange={onChangeAutType}
                                options={[
                                    {
                                        value: 'FILEDOWNLOAD',
                                        label: 'FILEDOWNLOAD',
                                    },
                                    {
                                        value: 'SMARTGROUP',
                                        label: 'SMARTGROUP',
                                    },
                                    {
                                        value: 'CONTENTMGMT',
                                        label: 'CONTENTMGMT',
                                    },
                                    {
                                        value: 'USERSERVICE',
                                        label: 'USERSERVICE',

                                    },
                                    {
                                        value: 'ACCOUNTSERVICE',
                                        label: 'ACCOUNTSERVICE',

                                    },
                                    {
                                        value: 'TENANTMGMT',
                                        label: 'TENANTMGMT',

                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="1" items={items} onChange={tabChange} />
            </Form>
        </Create>
    );
};
