import React from "react";
import { Layout, Button, Space, Col } from "antd";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import WeatherReport from "./WeatherReport";

const { Header } = Layout;

const DefaultHeader = () => {
  const { t } = useTranslation();

  return (
    <Header
      style={{
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Col flex="auto" />
      <Space size="large">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <WeatherReport />
        </div>
        <div>
          <LanguageSelector />
        </div>
        <Link to="/login">
          <Button
            type="primary"
            style={{ padding: "18px", borderRadius: "999px", boxShadow: "none" }}
          >
            <b>{t("make_login")}</b>
          </Button>
        </Link>
      </Space>
    </Header>
  );
};

export default DefaultHeader;
