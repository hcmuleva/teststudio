import { useShow, useOne } from "@refinedev/core";

import { Show, MarkdownField } from "@refinedev/antd";

import { Typography } from "antd";

const { Title, Text } = Typography;

export const ResultShow = () => {
    
    const { queryResult } = useShow({meta:{populate:['results']}});
    const { data, isLoading } = queryResult;
    const record = data?.data;
    console.log("REcord in results ",data)
    if(isLoading){
      <h1>Loading</h1>
    }
   
    return (
    
        <Show isLoading={isLoading}>
         
            <Title level={5}>Result</Title>
            <Text>
                {isLoading ? "Loading..." : record?.rawdata}
            </Text>

            <Title level={5}>Result Data</Title>
           
        </Show>
        
    );
};
