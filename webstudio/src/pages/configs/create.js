import { Create, useForm } from "@refinedev/antd";
import { mediaUploadMapper } from "@refinedev/strapi-v4";
import { Col, Form, Radio, Row } from 'antd';
import { useEffect, useState } from "react";
import CreateConfigForm from './CreateConfigForm';
import FunctionalConfigForm from "./FunctionalConfigForm";
import SDLConfigForm from "./SDLConfigForm";
import UnitConfigForm from "./UnitConfigForm";

const API_URL = process.env.REACT_APP_API_SERVER
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY

export const ConfigCreate = () => {
    const testingType = ["UNIT","FUNCTIONAL","PERFORMANCE","SDL"];
    console.log("CREATE CONFIG")
    const { formProps, saveButtonProps } = useForm();
    const intdata = {

        name: "",
        project: "",
        host: "",
        type:"",
        testplatformurl: "",
        jmxfile: null,
        inifile: null,
    }
    const [formdata, setFormdata] = useState(intdata)
    const [testtypeval, setTesttypeval] = useState('PERFORMANCE');
    const onChangeTestType = ({ target: { value } }) => {
        setTesttypeval(value);
         setFormdata((prevData) => ({
        ...prevData,
        type:  value, // Set the subtype or an empty string if not available
      }));
    
      };
      const onChangeAutType = ({ target: { value } }) => {
        setAppTypeVal(value);
      };
      console.log("testtypeval",testtypeval)
      const getComponent=()=>{
        if(testtypeval === 'UNIT'){
            return <UnitConfigForm formdata={formdata} setFormdata={setFormdata} />  
        }else if(testtypeval === 'FUNCTIONAL'){
            return <FunctionalConfigForm formdata={formdata} setFormdata={setFormdata} />  
        }else if(testtypeval === 'SDL'){
            console.log("Inside SDL")
            return <SDLConfigForm formdata={formdata} setFormdata={setFormdata} />
        }else{  
            console.log("Inside OTHER")
            return <CreateConfigForm testtypeval={testtypeval}/>
        }
        }
     
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical" onFinish={async (values) => {
                try {
                    console.log("Values before form submit",values)
                    formProps.onFinish?.(mediaUploadMapper(values));
                    setFormdata(intdata)
                } catch (error) {
                    console.log('Error creating config:', error);
                }
            }}>
                <Row>

                <Col span={16}>
                <Form.Item
                        label="TestingType"
                        name="type"
                        initialValue={testtypeval} // Use initialValue instead of defaultValue
                        
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                      <Radio.Group options={testingType} onChange={onChangeTestType} value={testtypeval} />  
                      
                    </Form.Item>
 
            </Col>
            </Row>
           
                <Row>
                   
                    {getComponent()}
                </Row>
            </Form>
        </Create>
    )
};
