import { DeleteButton, EditButton, ShowButton } from "@refinedev/antd";

import { Card, Col, Row, Space,Select } from "antd";

import { useNavigation } from "@refinedev/core";
import { Typography } from 'antd';
import { useState } from 'react';

const { Meta } = Card;

export const ProjectItem = ({ item }) => {
    const style = { padding: '8px 0' };
    const totalConfigs= (item?.configs ?? []).length;
    console.log("Total configs", totalConfigs)

    console.log("Project details ", item)
    const { edit, create, show } = useNavigation();
    const[configId,setConfigId] = useState()
    const configarr = item?.configs||[]
     const getConfigArrayForSelection= ()=>{
        return configarr&&configarr.map(elm =>({label:elm.name, value:elm.id}))
     }
  
    
     
     
   
    const handleChange = (value) => {
        console.log("Valie",value)
        console.log(`selected ${value}`);
        setConfigId(value)
      };
    return (
        <>

            <Card
                style={{ width: 300 }}
                title={`Project: ${item.name}`}

                actions={[
                    <EditButton key="edit" recordItemId={item.id} />,
                    <DeleteButton
                        key="delete"
                        
                        
                        recordItemId={item.id}
                    />,
                    <ShowButton key="show"
                       
                      
                        recordItemId={item.id}
                        data={item}
                        onClick={()=>{show("projects", item.id)}}
                    />
                ]}
            >
               
      <p><b>Total Configs:</b> {totalConfigs}</p>
      <p><b>ConfigList:</b> <Select
      defaultValue="Select"
      style={{ width: 120 }}
      onChange={handleChange}
      options={getConfigArrayForSelection()}
    /></p>
     
   
                <Meta
                    className="ant-card-meta-title"
                   
                // description={item.description}
                />
            </Card>
        </>
    );
};