import React from "react";
import { Layout } from "antd";
import { ProjectOutlined } from "@ant-design/icons";

const CustomHeader = () => {
  return (
    <Layout.Header>
      <div className="logo">
        <ProjectOutlined />
        <span>My Custom Logo</span>
      </div>
      {/* Other header content */}
    </Layout.Header>
  );
};

export default CustomHeader;
