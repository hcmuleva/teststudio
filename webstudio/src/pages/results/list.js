import { useTable } from "@refinedev/core";
import { Modal, Table, Space, Select, Typography, Input } from "antd";
import React, { useState,useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Tabs } from 'antd';
import FunctionalReport from "../../components/reports/FunctionalReport";
import PerformanceReport from "../../components/reports/PerformanceReport";
import SDLReport from "../../components/reports/SDLReport";


const { Text } = Typography;
const { Option } = Select;

export const ResultList = () => {
  const[sdlData,setSdlData] = useState([]);
  const[performanceData,setPerformanceData] = useState([]);
  const[functionalData,setFunctionalData] = useState([]);
  const { tableQueryResult } = useTable({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: { populate: ["config", "users_permissions_user"] },
  });
  
  const tableProps = tableQueryResult?.data?.data;
  
  // const sdlData = tableProps.filter(item => item.testtype === "SDL");
  // const performanceData = tableProps.filter(item => item.testtype === "PERFORMANCE");
  // const functionalData = tableProps.filter(item => item.testtype === "FUNCTIONAL");
  // useEffect to set sdlData,performanceData,functionalDat once tableProps is set
  useEffect(() => {
    if (Array.isArray(tableProps)) {
      console.log("Aray is defined.");
      tableProps.forEach((item) => {  console.log("DDSDS",item.testtype); });

      // Create three separate arrays based on testtype
      setSdlData(tableProps.filter(item => item.testtype === "SDL"));
      setPerformanceData(tableProps.filter(item => item.testtype === "PERFORMANCE"));
      setFunctionalData(tableProps.filter(item => item.testtype === "FUNCTIONAL"));
    
      console.log("SDL Data:", sdlData);
      console.log("Performance Data:", performanceData);
      console.log("Functional Data:", functionalData);
    } else {
      console.log("tableProps is not an array or is undefined.");
    }
    
  }, [tableProps]);
  const [searchText, setSearchText] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const onChange = (key) => {
    console.log(key);
  };
  console.log("tableProps",tableProps)
  const items = [
    {
      key: '1',
      label: 'Functional',
      children: <FunctionalReport reportdata={functionalData}/>,
    },
    {
      key: '2',
      label: 'Performance',
      children: <PerformanceReport reportdata={performanceData} />,
    },
    {
      key: '3',
      label: 'SDL',
      children: <SDLReport reportdata={sdlData}/>,
    },
  ];
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["ascend", "descend"],
    },
    { title: "Workers", dataIndex: "total_workers", key: "total_workers" },
    { title: "Threads", dataIndex: "totalthreads", key: "totalthreads" },
    { title: "Loops", dataIndex: "loops", key: "loops" },
    { title: "Summary", dataIndex: "summary", key: "summary" },
    { title: "Status", dataIndex: "status", key: "status" , },
    { title: "AUT", dataIndex: "aut", key: "aut" },
    {
      title: "User",
      dataIndex: "users_permissions_user",
      key: "users_permissions_user",
      render: (users_permissions_user) => users_permissions_user?.email || "",
    },
    { title: "RunTime", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Config",
      dataIndex: "config",
      key: "config",
      render: (config) => config?.name || "",
    },
    { title: "Duration(HH:MM:SS:ms)", dataIndex: "duration", key: "duration" },
    { title: "FilePath", dataIndex: "filepath", key: "filepath", ellipsis: true },
    {
      title: "Report",
      dataIndex: "reporturl",
      key: "reporturl",
      render: (reporturl) => <a href={reporturl} target="_blank">Report</a>,
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleColumnSelect = (value) => {
    setSelectedColumn(value);
  };

  // const filteredTableProps = tableProps?.filter((record) => {
  //   const fieldValue = record[selectedColumn]?.toString().toLowerCase();
  //   return fieldValue && fieldValue.includes(debouncedSearchText.toLowerCase());
  // });

  const ClickableParagraph = ({ text }) => {
    const handleParagraphClick = () => {
      Modal.info({
        title: "Full Logs",
        content: text,
      });
    };
    const truncatedText = text.split(" ").slice(6, 12).join(" ");
    return (
      <>
        <p>{truncatedText}</p>
        <div style={{ cursor: "pointer", color: "blue" }} onClick={handleParagraphClick}>
          more
        </div>
      </>
    );
  };

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    // <div style={{ width: "100%", overflowX: "auto" }}>
    //   <Space>
    //     <Text strong>Filters:</Text>
    //     <Select value={selectedColumn} style={{ width: 200 }} onChange={handleColumnSelect} placeholder>
    //       {columns.map((column) => (
    //         <Option key={column.dataIndex} value={column.dataIndex}>
    //           {column.title}
    //         </Option>
    //       ))}
    //     </Select>
    //     <Text strong>Search:</Text>
    //     <Input type="text" value={searchText} onChange={handleSearch} placeholder="Based on Filter selection"/>
    //   </Space>
    //   <Table
    //     dataSource={selectedColumn ? filteredTableProps : tableProps}
    //     bordered
    //     columns={columns}
    //     scroll={{ x: "min-content" }}
    //   />
    // </div>
  );
};
