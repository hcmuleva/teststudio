import { useShow, useOne } from "@refinedev/core";

import { Show, MarkdownField } from "@refinedev/antd";
import { Col, Form, Input, Row, Tabs } from "antd";
import { Typography } from "antd";

const { Title, Text } = Typography;

export const ProjectShow = () => {
    
    const { queryResult } = useShow({meta:{populate:['projects']}});
    const { data, isLoading } = queryResult;
    const record = data?.data;
    console.log("REcord in projectShow",data)
    if(isLoading){
      <h1>Loading</h1>
    }
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
                        <Text>{record?.name}</Text>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={10}>
                        <Text>{record?.description}</Text>
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
            <Text>{record?.influxdburl}</Text>
            </Col>
            <Col span={2}></Col>
            <Col span={10}>
            <Text>{record?.influxdbbucket}</Text>
            </Col>
            </Row>
            <Row>
            <Col span={10}>
            <Text>{record?.influxdborg}</Text>
           
            </Col>
            <Col span={2}></Col>
            <Col span={10}>
            <Text>{record?.githubtoken}</Text>
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
            <Text>{record?.githuburl}</Text>
             
            </Col>
            <Col span={2}></Col>
            <Col span={10}>
            <Text>{record?.githubbranch}</Text>
           
            </Col>
            </Row>
            <Row>
            <Col span={10}>
            <Text>{record?.githubtoken}</Text>
            
            </Col>
            <Col span={2}></Col>
            <Col span={10}>
            <Text>{record?.githubuser}</Text>
           
            </Col>
            </Row>
            </>
        }

    ]
    return (
    
        <Show isLoading={isLoading}>
         
         <Tabs defaultActiveKey="1" items={items} onChange={tabChange} />
           
        </Show>
        
    );
};
