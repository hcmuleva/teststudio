import { useShow } from "@refinedev/core";

import { DownloadOutlined, EditOutlined, EllipsisOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';
import { Show } from "@refinedev/antd";

import { Button, Card, Col, Form, Row, Select, Typography } from "antd";
import { useState } from "react";
import ModalRun from "./ModalRun";
const API_URL=process.env.REACT_APP_API_SERVER
const TOKEN_KEY=process.env.REACT_APP_TOKEN_KEY

const { Option } = Select;

const { Item } = Form;
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
  

const { Title, Text } = Typography;

export const ConfigShow = () => {
    const [open, setOpen] = useState(false);
    const { Meta } = Card;
    const [filevalue, setFileValue] = useState("");

    const { queryResult } = useShow({meta:{populate:'*'}});
    const { data, isLoading } = queryResult;
    const record = data?.data;
    console.log("record",record)
    const filearray=record?.filearray;
    if(isLoading){
      <h1>Loading</h1>
    }
    const jmxfile=record?.jmxfile?.url
    
    const fileUrl=jmxfile?`${API_URL}${jmxfile}`:""
    console.log("fileUrl",fileUrl)
    const onFileRadioChange = (e) => {
        setFileValue(e.target.value);
      };
    const imgurl = `https://loremflickr.com/640/480/animals?random=${Math.random()}`;
    return (
        <Show isLoading={isLoading}>
  <Row gutter={[8, 8]}>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <Card cover={<img src={imgurl} alt="your image" />} actions={[
             <DownloadOutlined key="download" />,
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}>
         
        </Card>
        <Card
  cover={<img src={fileUrl} alt="File Preview" />}
  actions={[
    <a href={fileUrl} download>
      <DownloadOutlined key="download" />
    </a>,
    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
      <EyeOutlined key="preview" />
    </a>,
  ]}
>
  {/* Card content */}
</Card>
      </Col>
     
    </Row>
    <Row gutter={[12, 12]}>
    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <ModalRun open={open} setOpen={setOpen} data={data} filevalue={filevalue} jmxfile={jmxfile}/>
        </Col><Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <Button type="primary" onClick={()=>{setOpen(true)}}>RunTest</Button>
        </Col>
    </Row>

        
       
    </Show>
    
       
        
    );
};
