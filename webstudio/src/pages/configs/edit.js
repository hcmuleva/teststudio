

import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { Col, Row } from 'antd';
import { useState } from "react";

import { Button, Form, Input, Space, Upload } from "antd";
import ZAPEdit from './ZAPEdit';

const { TextArea } = Input;
const API_URL = process.env.REACT_APP_API_SERVER
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY

export const ConfigEdit = () => {
    const { formProps, saveButtonProps, queryResult,form  } = useForm({
        metaData: { populate: ["cover", "jmxfile", "inifile","supportingfiles", "project", "private_key"] },
    });
    const intdata = {
        name: "",
        project: "",
        host: "",
        testplatformurl: "",
        jmxfile: null,
        inifile: null,
    }
    const [formdata, setFormdata] = useState(intdata)
    const {isLoading,data,error} = queryResult
    
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>{error.message}</div>

    console.log("queryResult", data.data)
    if(data.data.framework==="ZAP"){
        console.log("Inside ZAP")
        return <ZAPEdit item={data.data}/>
    }
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
      };
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical" onFinish={async (values) => {
                try {
                    let payload = { ...values }
                    console.log("payload", payload)
                    formProps.onFinish?.(mediaUploadMapper(payload));
                    setFormdata(intdata)
                } catch (error) {
                    console.log('Error creating config:', error);
                }


            }}>

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
                        <Form.Item label="ProjectName" >
                            <Input value={queryResult?.data?.data?.project?.name || ""} disabled />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item label="AUT(e.g https://dev1-coresvcs.amds.dell.com)" name="host" rules={[{ required: true, },]} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>

                    <Col span={10}>
                        <Form.Item
                            label="TestPlatform e.g. http://IP:5000"
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
                    {queryResult.data.type === "PERFORMANCE" ?
                        <><Col span={6}>
                            <Form.Item label="Upload"

                                tooltip={{ title: 'JMX file Upload is required', icon: <UploadOutlined /> }}
                            >
                                <Form.Item
                                    name="jmxfile"
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
                                        accept=".jmx"
                                    >
                                        <p className="ant-upload-text">
                                            JMX file
                                        </p>
                                    </Upload.Dragger>

                                </Form.Item>

                            </Form.Item>
                        </Col>
                            <Col span={6}>
                                <Form.Item label="Upload a private key"

                                    tooltip={{ title: 'Private key Upload is required', icon: <UploadOutlined /> }}
                                >
                                    <Form.Item
                                        name="private_key"
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
                                            accept=".der"
                                        >
                                            <p className="ant-upload-text">
                                                Private Key
                                            </p>
                                        </Upload.Dragger>

                                    </Form.Item>

                                </Form.Item>
                            </Col>
                        </> : data?.data?.type &&data.data.type === 'SDL' ? <><Col span={2}>   </Col>

                            <Col span={10}>
                                <Form.Item
                                    label="Artifactory User Name"
                                    name="artifactoryusername"
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
                                    label="Artifactory Password"
                                    name="artifactorypassword"
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
                            <Col span={6}>
                                <Form.Item label="Upload"

                                    tooltip={{ title: 'Ini file Upload is required for sdl', icon: <UploadOutlined /> }}
                                    required
                                >
                                    <Form.Item
                                        name="inifile"
                                        valuePropName="fileList"
                                        getValueProps={(data) => getValueProps(data, API_URL)}
                                        noStyle
                                    >
                                        <Upload.Dragger
                                            name="files"
                                            multiple={false} // Allow only one file
                                            action={`${API_URL}/api/upload`}
                                            headers={{
                                                Authorization: `Bearer ${localStorage.getItem(
                                                    TOKEN_KEY,
                                                )}`,
                                            }}
                                            accept=".ini"
                                        >
                                            <p className="ant-upload-text">
                                                Ini file
                                            </p>
                                        </Upload.Dragger>

                                    </Form.Item>
                                    {form.getFieldValue('inifile') && form.getFieldValue('inifile').length > 0 && (
        <div>
            <p>Uploaded File:</p>
            <Space>
                <span>{form.getFieldValue('inifile')[0].name}</span>
                <Button
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        form.setFieldsValue({ inifile: [] }); // Clear the uploaded file
                        message.success('File removed');
                    }}
                />
            </Space>
        </div>
    )}
                                </Form.Item>
                            </Col></> : ""}
                </Row>
                {data.data.type === 'PERFORMANCE' ? <>
                <Form.List name="filearray">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'tag']}
                                        rules={[{ required: true, message: 'Missing Tag' }]}
                                    >
                                        <Input placeholder="EnterTag" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'filepath']}
                                        rules={[{ required: true, message: 'Missing file path' }]}
                                    >
                                        <Input placeholder="FilePath" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add FilePath For Downloads
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List></>:""}
            </Form>
        </Edit>
    );
};
