import React from "react";
import { Layout, Button, Space, Typography } from "antd";
import { DownOutlined, SunOutlined } from "@ant-design/icons";
import ReactCountryFlag from "react-country-flag";
import LanguageSelector from "./LanguageSelector";

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          width: "50%",
        }}
      >
        {children}
      </div>

      <Space size="large">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <SunOutlined style={{ fontSize: "20px", color: "#fff" }} />
          <Text style={{ fontWeight: "bold", color: "#fff" }}>23 °C</Text>
        </div>
        <div>
          <LanguageSelector />
        </div>
        <Button
          type="primary"
          style={{ padding: "18px", borderRadius: "999px" }}
        >
          <b>Fazer login</b>
        </Button>
      </Space>
    </Header>
  );
};

export default DefaultHeader;
