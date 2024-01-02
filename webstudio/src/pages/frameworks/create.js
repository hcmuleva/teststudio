import React, { useEffect, useState } from 'react';
import { Create, useForm } from "@refinedev/antd";

import { Button, Row, Col, Checkbox, Upload, Form, Input, Select, Space } from 'antd';
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import frameworklist from '../../data/frameworklist.json';
const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

import { Radio } from 'antd';

const CreateFramework = () => {
  const [frameworkoptions, setFrameworkOptions] = useState([]);
  const [value, setValue] = useState("UNIT");
  const onChangeRadio = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const [form] = Form.useForm();
  const { formProps, saveButtonProps } = useForm();
  const intdata = {
    name: "",
    description: "",
    type: "UNIT",
    subtype: "",
    files: null,
    zipfile: null
  }
  const [formdata, setFormdata] = useState(intdata)

  const handleChange = (value) => {
    setFormdata((prevData) => ({
      ...prevData,
      subtype: value || "", // Set the subtype or an empty string if not available
    }));
  };
  console.log("formdata", formdata)
  const getOptions = () => {
    const frameworks = frameworklist[value];
    console.log("frameworks", frameworks);
    const newOptions = frameworks.map((item) => ({
      value: item.value,
      label: item.label
    }));
    setFrameworkOptions(newOptions);
  };

  useEffect(() => {
    console.log("value", value)
    getOptions()
  }, [value])
  return (
    <>

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
              <Radio.Group onChange={onChangeRadio} value={value}>
                <Radio value={"UNIT"}>UNIT</Radio>
                <Radio value={"FUNCTIONAL"}>FUNCTIONAL</Radio>
                <Radio value={"PERFORMANCE"}>PERFORMANCE</Radio>
                <Radio value={"SECURITY"}>SECURITY</Radio>
              </Radio.Group>

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

                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={frameworkoptions}
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
              </Row>
            </div>
          </Form>
        </Create>
      </Space>
    </>

  );


};

export default CreateFramework;