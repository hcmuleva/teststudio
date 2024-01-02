import { useSelect } from "@refinedev/antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";

import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, Upload } from 'antd';
import { useState } from "react";
import { useList, useShow } from "@refinedev/core";
const API_URL = process.env.REACT_APP_API_SERVER
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY

const CreateConfigForm = ({ testtypeval }) => {
    const [auttype, setAuttype] = useState(null)
    const [optionList, setOptionList] = useState([])
    const { selectProps } = useSelect({
        resource: "projects",
        optionLabel: "name",
        optionValue: "id",

    });

    const { data, isLoading, isError } = useList({
        resource: "projects",
    });
    console.log("data", data, "isLoading", isLoading, "isError", isError)
    const options = data?.data ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }


    console.log("data.data", data.data)

    console.log("selectProps", selectProps)
    console.log("data=>", data)
    console.log("optionlist=>", optionList)
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        //filter value from options where id = value
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
                {testtypeval === "SDL" ?
                    <>

                        
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

                            </Form.Item>
                        </Col>
                    </>


                    : ""}

                {testtypeval === "PERFORMANCE" ?

                    <Col span={6}>
                        <Form.Item label="Upload"

                            tooltip={{ title: 'JMX file Upload is required', icon: <UploadOutlined /> }}
                            required
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
                    : ""}
                <Col span={6}>  </Col>
                {auttype !== "FILEDOWNLOAD" && testtypeval === "PERFORMANCE" ?
                    <Col span={6}>
                        <Form.Item label="Upload a private key"

                            tooltip={{ title: 'Private key Upload is required', icon: <UploadOutlined /> }}
                            required
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
                    </Col> : ""
                }
                <Col span={6}>  </Col>

                {auttype !== "FILEDOWNLOAD" && testtypeval === "PERFORMANCE" ?
                    <Col span={6}>
                        <Form.Item label="Upload a csv zip folder"

                            tooltip={{ title: 'csv.zip file required', icon: <UploadOutlined /> }}
                            required
                        >
                            <Form.Item
                                name="csvfile"
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
                                        CSV zip folder
                                    </p>
                                </Upload.Dragger>

                            </Form.Item>

                        </Form.Item>
                    </Col> : ""
                }
            </Row>
            {auttype === "FILEDOWNLOAD" ?
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
                                    File for Download
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                : ""}
            <Row>
                <Col span={6}></Col>

                <Col span={6}>

                </Col>
            </Row>
        </div>
    );
};

export default CreateConfigForm;