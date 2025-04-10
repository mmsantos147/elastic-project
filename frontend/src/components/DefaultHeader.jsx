import React from "react";
import { Layout, Button, Space, Typography } from "antd";
import { SunOutlined } from "@ant-design/icons";


const { Header } = Layout;
const { Text } = Typography;

const DefaultHeader = ({ children }) => {
  return (
    <Header
      style={{
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "space-between", 
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px", width: "50%" }}>
        {children}
      </div>

      <Space size="large">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <SunOutlined style={{ fontSize: "20px", color: "#fff" }} />
          <Text style={{ fontWeight: "bold", color: "#fff" }}>16 °C</Text>
        </div>
        <Button type="primary" style={{ padding: "18px", borderRadius: "999px" }}>
          <b>Fazer login</b>
        </Button>
      </Space>
    </Header>
  );
};

export default DefaultHeader;
