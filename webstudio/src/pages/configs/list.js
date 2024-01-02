import { List, useSimpleList } from "@refinedev/antd";
import { usePermissions } from "@refinedev/core";

import { List as AntdList } from "antd";
import { ConfigItem } from "./ConfigItem";
import { Radio } from 'antd';
import { useState,useEffect } from "react";
import { Col, Row } from 'antd';


export const ConfigList = () => {
    const [value, setValue] = useState("UNIT");
    const [conflist,setConfList]=useState(null);
    const { listProps,loading } = useSimpleList({
        resource: "configs",
       
        metaData: {
           populate: ["jmxfile", "inifile","supportingfiles", "project","jmeter","influxdb","private_key","openapifiles","csvfile"] },
       
    });
    const dataSource = listProps?.dataSource||[];
    let segregatedData = null;
    console.log("ConfigList loading",loading)
    console.log("ConfigList listProps",listProps)
    if(!loading){

         segregatedData = dataSource.reduce((result, item) => {
            const type = item.type || 'Other'; // Use 'Other' if type is null or undefined
          
            // Check if there is already an array for the current type
            if (!result[type]) {
              result[type] = [];
            }
          
            // Push the current item to the array corresponding to its type
            result[type].push(item);
          
            return result;
          }, {}); 
    }
    console.log("listprops",listProps)
 
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    //setConfList(segregatedData[e.target.value]);
  };
  console.log("conflist",conflist)
  const getComponent=()=>{
    const datalist =segregatedData[value]||[];
    return datalist.map(item=><Col span={8}><ConfigItem item={item} /></Col>)
}
  useEffect(() => {
    
    getComponent()
    }, [value]);
    
    return (
        <div>
             <List>
            <br></br>
            <br></br>
             <Radio.Group onChange={onChange} value={value}>
      <Radio value={"UNIT"}>UNIT</Radio>
      <Radio value={"FUNCTIONAL"}>FUNCTIONAL</Radio>
      <Radio value={"PERFORMANCE"}>PERFORMANCE</Radio>
      <Radio value={"SDL"}>SDL</Radio>

    </Radio.Group>
            <br></br>
            <br></br>
            <Row>
               
            {getComponent()}
           
            </Row>
            {/* conflist&&conflist !==null&&conflist.map((item) => {
                return <div></div>
            })) */}
            {/* <List>
                <AntdList
                    grid={{ gutter: 16, xs: 1 }}
                    style={{
                        justifyContent: "center",
                    }}
                    {...conflist}
                    renderItem={(item) => {
                        const imgurl = `https://loremflickr.com/640/480/animals?random=${Math.random()}`;
                        return <AntdList.Item>
                            <ConfigItem item={item} imgurl={imgurl} />
                        </AntdList.Item>
                    }}
                />
            </List> */}
 </List>

        </div>
    );
};