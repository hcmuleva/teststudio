import React, { useState } from 'react';
import { useTable } from "@refinedev/core";
import { Modal, Table, Space, Select, Typography, Input } from "antd";


const { Text } = Typography;
const { Option } = Select;
const PerformanceReport = ({reportdata}) => {
    const [selectedColumn, setSelectedColumn] = useState("");
    const [searchText, setSearchText] = useState("");

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
      const filteredTableProps = reportdata?.filter((record) => {
        const fieldValue = record[selectedColumn]?.toString().toLowerCase();
        return fieldValue && fieldValue.includes(debouncedSearchText.toLowerCase());
      });
    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
      <Space>
        <Text strong>Filters:</Text>
        <Select value={selectedColumn} style={{ width: 200 }} onChange={handleColumnSelect} placeholder>
          {columns.map((column) => (
            <Option key={column.dataIndex} value={column.dataIndex}>
              {column.title}
            </Option>
          ))}
        </Select>
        <Text strong>Search:</Text>
        <Input type="text" value={searchText} onChange={handleSearch} placeholder="Based on Filter selection"/>
      </Space>
      <Table
        dataSource={selectedColumn ? filteredTableProps : tableProps}
        bordered
        columns={columns}
        scroll={{ x: "min-content" }}
      />
    </div>
    );
};

export default PerformanceReport;