import React, { useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Space,Select } from 'antd';

import { Tabs } from 'antd';
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
  
const RunForm= ({rundata,setRundata,formdata,setFormdata,form,configdefault}) => {
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onChange = (key) => {
    console.log(key);
  };

  const onFinish = (values) => {
    console.log("form data", formdata,'Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleSelectChange = (indexvalue) => {
    const filearrElm=configdefault.filearray[indexvalue]
    setFormdata({...formdata, "filepath":filearrElm.filepath})
    
  };
  const handleSelectTestPlatformChange = (indexvalue) => {
    const orchIPElm=configdefault.project.orchestratorpath[indexvalue]
    console.log("orchIPElm",orchIPElm)
    setFormdata({...formdata, "orchestratorpath":orchIPElm.TestEngineHost})
    
  };
  

  
  const options = [];
  if(configdefault&&configdefault.filearray&&configdefault.filearray.length>0){
    for (let i = 0; i < configdefault.filearray.length; i++) {
      options.push({
        label: configdefault.filearray[i]['tag'],
        value: i,
      });
    }
  }
  
  const Platformoptions=[]
  if(configdefault&&configdefault.project.orchestratorpath&&configdefault.project.orchestratorpath.length>0){
    for (let i = 0; i < configdefault.project.orchestratorpath.length; i++) {
      Platformoptions.push({
        label: configdefault.project.orchestratorpath[i]['tag'],
        value: i,
      });
    }
  }
  useEffect(()=>{
    setRundata(formdata)
  },[formdata])
  
  const items = [
    {
        key: '1',
        label: `Default Settings`,

        children: <>
           <Space direction="vertical">
           <Form.Item
          label="Target Host"
          tooltip={{ title: 'e.g. https://perf.dmf.dell.com', icon: <InfoCircleOutlined /> }}
        >
        <Input  value={formdata.host} onChange={(event)=>{setFormdata({...formdata, "host":event.target.value})}} />
        </Form.Item>
        </Space>
        <Space direction="vertical">
        <Select
      defaultValue="Select File"
      onChange={handleSelectChange}
      style={{
        width: 120,
      }}
      
      options={options}
    />

<Input  value={formdata.filepath} placeholder="FilePath to download" onChange={(event)=>{setFormdata({...formdata, "filepath":event.target.value})}}/>  


          </Space>
          <Space direction="vertical">
        <Select
      defaultValue="Select TestPlatform"
      onChange={handleSelectTestPlatformChange}
      style={{
        width: 120,
      }}
      
      options={Platformoptions}
    />

<Input  value={formdata.orchestratorpath} placeholder="Test Platform IP/Domain " onChange={(event)=>{setFormdata({...formdata, "orchestratorpath":event.target.value})}}/>  
          </Space>
        </>,
      },
    {
        key: '2',
        label: `JMeter`,
        children: <>
         <Form.Item
          label="Total Thread"
          tooltip={{ title: 'Total Thread', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="Total Thread" onChange={(event)=>{setFormdata({...formdata, "threadcount":event.target.value})}}/>
        </Form.Item>
        <Form.Item
          label="Rampup Time"
          tooltip={{ title: 'Rampup Time', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="Rampup Time" onChange={(event)=>{setFormdata({...formdata, "rampup_time":event.target.value})}}/>
        </Form.Item>
        <Form.Item
          label="Total Workers"
          tooltip={{ title: 'Total Workers', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="Total Workers" onChange={(event)=>{setFormdata({...formdata, "total_workers":event.target.value})}}/>
        </Form.Item>
        </>,
      },
    // {
    //   key: '3',
    //   label: `InfluxDB`,
    //   children: <>
    //   <Form.Item label="IP" required tooltip="InfluxDB Ip and Port if any">
    //   <Input placeholder="Container IP and Port if port is there" onChange={(event)=>{setFormdata({...formdata, "influxdbip":event.target.value})}} />
    // </Form.Item>
    // <Form.Item label="Bucket Name" required tooltip="Bucket Name">
    //   <Input placeholder="URL should have IP, orgname, and bucket" onChange={(event)=>{setFormdata({...formdata, "bucket_name":event.target.value})}} />
    // </Form.Item>
    // <Form.Item label="Organization Name" required tooltip="Organization Name">
    //   <Input placeholder="Organization Name" onChange={(event)=>{setFormdata({...formdata, "org_name":event.target.value})}} />
    // </Form.Item>
    // <Form.Item label="API Token" required tooltip="InfluxDB Token" >
    //   <Input placeholder="API Token is require to connect InfluxDB" onChange={(event)=>{setFormdata({...formdata, "influxtoken":event.target.value})}}/>
    // </Form.Item>
    // </>,
    // },
    // {
    //   key: '4',
    //   label: `GitHub`,
    //   children: <><Form.Item
    //   label="GIT Url"
    //   tooltip={{ title: 'Git/Bitbuket URL', icon: <InfoCircleOutlined /> }}
    // >
    //   <Input placeholder="Git URL" onChange={(event)=>{setFormdata({...formdata, "giturl":event.target.value})}}/>
    // </Form.Item>
    // <Form.Item
    //   label="Git Branch Name"
    //   tooltip={{ title: 'Git Branch Name', icon: <InfoCircleOutlined /> }}
    // >
    //   <Input placeholder="Git Branch Name" onChange={(event)=>{setFormdata({...formdata, "gitbranch":event.target.value})}}/>
    // </Form.Item>
    // <Form.Item
    //   label="User Name"
    //   tooltip={{ title: 'Username', icon: <InfoCircleOutlined /> }}
    // >
    //   <Input placeholder="UserId" onChange={(event)=>{setFormdata({...formdata, "gituser":event.target.value})}}/>
    // </Form.Item>
    // <Form.Item
    //   label="Password/Personal Access Token"
    //   tooltip={{ title: 'PAT', icon: <InfoCircleOutlined /> }}
    // >
    //   <Input placeholder="Password/Token" onChange={(event)=>{setFormdata({...formdata, "gittoken":event.target.value})}}/>
    // </Form.Item></>,
    // },
    
  ];
 
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ requiredMarkValue: requiredMark }}
      requiredMark={requiredMark}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  
     
        
      
     
    </Form>
  );
};

export default RunForm;