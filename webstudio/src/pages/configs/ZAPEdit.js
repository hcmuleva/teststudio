

import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { Col, Row } from 'antd';
import { useState } from "react";

import { Button, Form, Input, Space, Upload } from "antd";

const { TextArea } = Input;
const API_URL = process.env.REACT_APP_API_SERVER
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY

 const ZAPEdit = ({item}) => {
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
    const [responses, setResponses] = useState([]);
    const [selections, setSelections] = useState([]);
    const[openAPIFile,setOpenAPIFile]=useState([])
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>{error.message}</div>

    console.log("queryResult", data.data)
    
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
      const handleOpenAPIFileUpload = (info) => {
        if (info.file.status === 'done') {
            // Add the response to the responses array
            setOpenAPIFile([...responses, info.file.response]);
        }
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
                    
                </Row>
                <Row>
                    
                <Col span={20}>
                        <Form.Item
                            name="openapifile"
                            valuePropName="fileList"
                            getValueProps={(data) => getValueProps(data, API_URL)}
                            noStyle
                        >
                            <Upload.Dragger
                                name="files"
                                action={`${API_URL}/api/upload`}
                                multiple={true}
                                headers={{
                                    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                                }}
                                accept=".json,.yaml,.yml"
                                fileList={[]}
                                onChange={handleOpenAPIFileUpload}
                            >
                                <p className="ant-upload-text">OPEN API File</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Col>
                    </Row>
                {data.data.framework === 'ZAP' ? <>
                <Form.List name="filearray">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'configname']}
                                        rules={[{ required: true, message: 'Missing configname' }]}
                                    >
                                        <Input placeholder="Enter configname" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'command']}
                                        rules={[{ required: true, message: 'Missing command' }]}
                                    >
                                        <Input placeholder="command" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'selection']}
                                        rules={[{ required: true, message: 'Missing selection' }]}
                                    >
                                        <Input placeholder="selection" />
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

export default ZAPEdit;