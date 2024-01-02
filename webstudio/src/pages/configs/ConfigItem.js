import FunctionalTestRun from '../../components/testrun/FunctionalTestRun';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import { DeleteButton, EditButton } from "@refinedev/antd";
import { Card,Button,Row,Col } from "antd";
import { InternalBreadcrumbItem } from 'antd/es/breadcrumb/BreadcrumbItem';
import { useState } from 'react';
import ModalRun from "./ModalRun";
import UnitTestRun from '../../components/testrun/UnitTestRun';
import SDLTestRun from '../../components/testrun/SDLTestRun';
import PerformanceTestRun from '../../components/testrun/PerformanceTestRun';
const { Meta } = Card;
export const ConfigItem = ({ item }) => {
    const [open, setOpen] = useState(false);
    const style = { padding: '8px 0' };
    const projectname=item?.project?.name
    const filearray=item?.filearray??[];
    const [loading, setLoading] = useState(false);
    return (
        <>
              {item.type==="PERFORMANCE"?<PerformanceTestRun open={open} setOpen={setOpen} item={item} />:""}
              {item.type==="FUNCTIONAL"?<FunctionalTestRun open={open} setOpen={setOpen} item={item} />:""}
              {item.type==="UNIT"?<UnitTestRun open={open} setOpen={setOpen} item={item} />:""}
              {item.type==="SDL"?<SDLTestRun open={open} setOpen={setOpen} item={item} />:""}

            <Card
                style={{ width: 300 }}
                title={`Config Name : ${item.name}`}
                actions={[
                    <EditButton key="edit" recordItemId={item.id} />,
                    <DeleteButton key="delete" recordItemId={item.id}  />,
                    <Button type="primary" icon={<PlayCircleOutlined />} loading={loading} onClick={()=>{  setOpen(true)  }}>Run</Button>
                ]}
            >
                    <Row><Col span={10}><b>TestType:</b></Col><Col span={12}>{item.type}</Col></Row>
                    <Row><Col span={10}><b>Project:</b></Col><Col span={12}>{projectname}</Col></Row>
                    <Row><Col span={10}><b>AUT:</b></Col><Col span={12}>{item.host}</Col></Row>
                    <Row><Col span={10}><b>Orchestrator:</b></Col><Col span={12}>{item.testplatformurl}</Col></Row>
                    {/* <Row><Col span={10}><b>JMX file:</b></Col><Col span={12}>{jmxfile?item.jmxfile.name:""}</Col></Row> */}
                   {item.type==="PERFORMANCE"? <Row><Col span={10}><b>Files for download:</b></Col><Col span={12}>{filearray.length}</Col></Row> :""}       
            </Card>
        </>
    );
};
