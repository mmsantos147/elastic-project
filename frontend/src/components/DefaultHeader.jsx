import React, { useState } from "react";
import { Layout, Button, Space, Col, Drawer, Menu } from "antd";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import WeatherReport from "./WeatherReport";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

const DefaultHeader = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check if screen is mobile
  const isMobile = window.innerWidth <= 768;
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const mobileMenuContent = (
    <>
      <div className="p-4">
        <Link to="/login">
          <Button
            type="primary"
            style={{ 
              padding: "18px", 
              borderRadius: "999px", 
              boxShadow: "none",
              width: "100%",
              marginBottom: "30px"
            }}
          >
            <b>{t("make_login")}</b>
          </Button>
        </Link>
      </div>
      <div className="p-4" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <WeatherReport />
        <LanguageSelector />
      </div>
    </>
  );

  return (
    <Header
      style={{
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: isMobile ? "0 16px" : "0 50px",
      }}
    >
      <Col flex="auto" />
      
      {/* Desktop View */}
      {!isMobile && (
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
      )}
      
      {/* Mobile View */}
      {isMobile && (
        <>
          <Button
            icon={<MenuOutlined />}
            onClick={toggleMobileMenu}
            style={{ border: "none" }}
          />
          <Drawer
            title={null}
            placement="right"
            onClose={toggleMobileMenu}
            open={mobileMenuOpen}
            width={250}
          >
            {mobileMenuContent}
          </Drawer>
        </>
      )}
    </Header>
  );
};

export default DefaultHeader;