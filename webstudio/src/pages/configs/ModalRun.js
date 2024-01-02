import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Modal, Row, Select, Space, Table } from 'antd';

import { Typography } from 'antd';
import axios from 'axios';
import { useState } from 'react';


const CONTROLLER_API_URL=process.env.REACT_APP_ORCHESTRATOR_API_URL
const ModalRun = ({open,setOpen,item}) => {

  const jmxfile=item?.jmxfile?.url
  const private_key=item?.private_key?.url
  const csvfile=item?.csvfile?.url
  const generateRandomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
  };
  const [dataSource,setDataSource] = useState([])
  const [filelist,setFilelist] = useState([])
  const { Column, ColumnGroup } = Table;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
 const influxdb ={
  
  influxdbbucket:item?.project?.influxdbbucket,
  influxdborg:item?.project?.influxdborg,
  influxdbtoken:item?.project?.influxdbtoken,
  influxdburl:item?.project?.influxdburl
 }
 
 const jmeterinit ={
  threadcount: "1",
  rampup_time: "1",
  total_workers: "1",
  loop_count:"1",
}
 const intdata={
  jmxfile:item?.jmxfile?.url,
  private_key:item?.private_key?.url,
  csvfile:item?.csvfile?.url,
  host:item.host,
  filearrary:[],
  jmeterdata:jmeterinit,
  orchestratorpath:item?.testplatformurl
  }
  const [formdata,setFormdata] = useState(intdata)
  const { Text } = Typography;
  const LongTextField = ({ text, maxLength }) => {
    if(!!!text){return ""}
    console.log("Text", text, "max", maxLength)
    const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  
    return <Text ellipsis>{truncatedText}</Text>;
  };
const createWorkLoad = ()=>{
 const str= generateRandomString(3)
  setDataSource([...dataSource,{key:{str},...formdata.jmeterdata, filepath:filelist ,'aut':item.host}])
}

  const handleOk = async () => {
    const body = (
      <div>
        <p>Test Request submitted Please wait for result...</p>
        
      </div>
    );
    info("Your File Download test started", body);
    const userobj=localStorage.getItem('user')
    const user= JSON.parse(userobj)
    formdata['jmxfile']=jmxfile
    formdata['private_key']=private_key
    formdata['csvfile']=csvfile
    formdata['influxdb']=influxdb
    formdata['filelist'] = filelist
    formdata['wll'] = dataSource
    formdata['config']=item.id
    formdata['users_permissions_user']=user.id
    const mydata={data:formdata}
    console.log("File execution message", mydata, " and Item", item)
  if (formdata.orchestratorpath) {    
    setConfirmLoading(true);
  await axios.post(`${formdata.orchestratorpath}/runtest`, mydata)
  .then(response => {
    console.log('Response:', response);
    setConfirmLoading(false);
    const successtitle = "File download execution completed"
    const body = (
      <div>
        <p>Response from server</p>
        <p> {response.data}</p> {/* Display the response message */}
      </div>
    );
    success(successtitle,body)
  })
  .catch(error => {
    console.error('Error:', error);

  });
}else {
  console.log("Plese Provide TestPlatform Host IP or address")
}
    
    setFilelist([])
    setFormdata(intdata)
    setOpen(false)
  };
  const success = (title,body) => {
    form.resetFields()
   
    Modal.success({
      title: title,
      content: body,
      onOk() {},
    });
  };

  
  const handleDelete = (record) => {
    // Implement your delete logic here
    console.log("Before delete",dataSource)
    console.log('Deleting record:', record);
    const updatedDataSource = dataSource.filter((item) => item.key !== record.key);
    setDataSource(updatedDataSource)
    console.log("updatedDataSource",updatedDataSource)

  };
  const columns =[{
    title: 'Threads',
    dataIndex: 'threadcount',
    key: 'threadcount',
  },{
    title: 'loops',
    dataIndex: 'loop_count',
    key: 'loop_count',
  },
  {
    title: 'Rampup(s)',
    dataIndex: 'rampup_time',
    key: 'rampup_time',
  },
  {
    title: 'workers',
    dataIndex: 'total_workers',
    key: 'total_workers',
  },
  {
    title: 'filepath',
    dataIndex: 'filepath',
    key: 'filepath',
    render: (_, { filepath }) => (
      <>
       <LongTextField text={filepath} maxLength={5} />
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleDelete(record)}>Delete</a>
      </Space>
    ),
  },
]
  const info = (title, body) => {
    Modal.info({
      title: title,
      content: body,
      onOk() {},
    });
  };
  
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const options = [];
  if(item?.filearray&&item.filearray.length>0){
    item.filearray.map(elm=>options.push({label:elm.tag, value:elm.filepath}))
  }

const handleChange = (value) => {
  console.log(`selected ${value}`);

  setFilelist(value)
};

  return (
    <>
     
      <Modal
        title="Run Test"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Run"
        cancelText="Cancel"
      >
       <Form onFieldsChange={(values)=>{console.log("Changed filed", values)}}>
        <Row>
        <Col span={8}></Col>
        <Divider plain>Fill data for Work Load</Divider>
        </Row>
        <Row> <Col></Col></Row>
        <Row>
                        <Col span={10}>
              <Form.Item
          label="Total Thread"
          tooltip={{ title: 'Total Thread', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="Total Thread"  value={formdata.jmeterdata.threadcount} onChange={(event)=>{setFormdata({...formdata,   jmeterdata: { ...formdata.jmeterdata, threadcount: event.target.value }})}}/>
        </Form.Item>
        </Col>
        <Col span={2}></Col>
        <Col span={10}>
        <Form.Item
          label="Rampup Time"
          tooltip={{ title: 'Rampup Time(s)', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="Rampup Time" value={formdata.jmeterdata.rampup_time} onChange={(event)=>{setFormdata({...formdata,   jmeterdata: { ...formdata.jmeterdata, rampup_time: event.target.value }})}}/>
        </Form.Item>
        </Col>
        </Row>
        <Row>
       
        <Col span={10}>
        
       <Form.Item
          label="Total JMeter Pods"
          tooltip={{ title: 'Total Workers', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="Total Workers" value={formdata.jmeterdata.total_workers} onChange={(event)=>{setFormdata({...formdata,   jmeterdata: { ...formdata.jmeterdata, total_workers: event.target.value }})}}/>
        </Form.Item>
    
            </Col>
            <Col span={2}></Col>
            <Col span={8}>
            <Form.Item
          label="Loops"
          tooltip={{ title: 'Loops', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="Loops" value={formdata.jmeterdata.loop_count} onChange={(event)=>{setFormdata({...formdata,   jmeterdata: { ...formdata.jmeterdata, loop_count: event.target.value }})}}/>
        </Form.Item>
        </Col>

        <Col span={12}>
        <Form.Item
          label="Select File "
          tooltip={{ title: 'Select File', icon: <InfoCircleOutlined /> }}
        >
    <Select
      mode="single"
      label="Select Files"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={[]}
      onChange={handleChange}
      options={options}
    />
    </Form.Item>
    
        </Col>
        
        <Col span={2}>
        </Col>
        
       
   
        </Row>
        <Row>
      
      </Row>
      <Row>
      <Button type="primary" onClick={createWorkLoad}> Add WorkLoad  To List</Button>
      </Row>
      <Row>
      <Table columns={columns} dataSource={dataSource} />;
      </Row>
      </Form>
      </Modal>
    </>
  );
};

export default ModalRun;