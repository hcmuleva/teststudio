import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import {  mediaUploadMapper } from "@refinedev/strapi-v4";
import { Col, Form, Input, Row, Tabs } from "antd";


export const ProjectEdit= () => {
    const { formProps, saveButtonProps, queryResult } = useForm({
        metaData: { populate: ["configs", "cover"] },
    });

    
    const tabChange = (key) => {
        console.log(key);
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
              <Form.Item label="InfluxDB URL" name="influxdburl" rules={[ { required: true }]}>
                <Input />

            </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={10}>
            <Form.Item label="InfluxDB Bucket" name="influxdbbucket" rules={[ { required: true }]}>
                <Input />
            </Form.Item>
            </Col>
            </Row>
            <Row>
            <Col span={10}>
            <Form.Item label="InfluxDB Org" name="influxdborg" rules={[ { required: true }]}>
                <Input />
            </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={10}>
            <Form.Item label="InfluxDB Token" name="influxtoken" rules={[ { required: true }]}>
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
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    formProps.onFinish?.(mediaUploadMapper(values));
                }}
            >
               <Tabs defaultActiveKey="1" items={items} onChange={tabChange} />
              
            
            </Form>
        </Edit>
    );
};
