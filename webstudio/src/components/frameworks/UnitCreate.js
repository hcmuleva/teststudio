import React, { useState } from 'react';
import { Create, useForm } from "@refinedev/antd";

import { Button, Row, Col, Checkbox, Upload, Form, Input, Select, Space } from 'antd';
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import frameworklist from '../../data/frameworklist.json';
const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const onChange = (key) => {
  console.log(key);
};
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const UnitCreate = () => {
  
  const [form] = Form.useForm();
  const { formProps, saveButtonProps } = useForm();
  const intdata = {
    name: "",
    description: "",
    type:"UNIT",
    subtype:"",
    files: null,
    zipfile: null
  }
  const [formdata, setFormdata] = useState(intdata)

  const handleChange = (value) => {
    // Find the selected framework and set the subtype
    const selectedFramework = unitframeworks.find(framework => framework.value === value);
    console.log("selectedFramework", selectedFramework.value)
    setFormdata((prevData) => ({
      ...prevData,
      subtype: selectedFramework.value || "", // Set the subtype or an empty string if not available
    }));
  };
  console.log("formdata", formdata)
  const getOptions = () => {
    return frameworklist.map((item) => {
      return <Option value={item.value}>{item.label}</Option>
    })
  }


  return (

    <Space wrap>

      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical" onFinish={async (values) => {
          try {
            formProps.onFinish?.(mediaUploadMapper(values));
            setFormdata(intdata)
          } catch (error) {
            console.log('Error creating config:', error);
          }
        }}>
          <div style={{ width: '100%', padding: '20px' }}>


            <Row style={{ width: '100%' }}>
              <Col span={10}>
                <Form.Item
                  name="frmaework"
                  label="Frameworks"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    defaultValue="TestNG"
                    style={{
                      width: 120,
                    }}
                    onChange={handleChange}
                    options={frameworklist}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="name"
                  label="name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                ><Input /></Form.Item>
              </Col>

              <Col span={20}>
                <Form.Item
                  name="description"
                  label="description"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                ><Input /></Form.Item>
              </Col>

              <Col span={20}>
                <Form.Item
                  name="zipfile"
                  valuePropName="fileList"
                  getValueProps={(data) => getValueProps(data, API_URL)}
                  noStyle
                >
                  <Upload.Dragger
                    name="files"
                    action={`${API_URL}/api/upload`}
                    headers={{
                      Authorization: `Bearer ${localStorage.getItem(
                        TOKEN_KEY,
                      )}`,
                    }}
                    accept=".zip"
                  >
                    <p className="ant-upload-text">
                     Zip File
                    </p>
                  </Upload.Dragger>

                </Form.Item>


              </Col>

              {/* <Form.Item {...tailLayout}>
      <Space>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <Button htmlType="button" onClick={onReset}>
        Reset
      </Button></Space>
     
    </Form.Item> */}
            </Row>
          </div>
        </Form>
      </Create>
    </Space>

  );
};

export default UnitCreate;