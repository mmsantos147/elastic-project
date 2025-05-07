import React, { useState, useRef, useEffect } from "react";
import { Layout, Button, Space, Col, Drawer, Menu } from "antd";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import WeatherReport from "./WeatherReport";
import { MenuOutlined } from "@ant-design/icons";
import { useAuthService } from "../api/Authorization.api";
import { FaCircleUser } from "react-icons/fa6";
import { LoggedUserMenu } from "./LoggedUserMenu";

const { Header } = Layout;

const DefaultHeader = () => {
  const { t } = useTranslation();
  const { verify } = useAuthService();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const userIconRef = useRef(null);
  const menuRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !userIconRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const data = verify()

    if (data.logged) {
      setIsLogged(data.logged)
      setUsername(data.username)
    }
  }, []);

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
              marginBottom: "30px",
            }}
          >
            <b>{t("make_login")}</b>
          </Button>
        </Link>
      </div>
      <div
        className="p-4"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
          {isLogged ? (
            <>
              <div
                ref={userIconRef}
                style={{ padding: "10px", cursor: "pointer", alignContent: "center", display: "flex" }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FaCircleUser style={{ color: "white" }} size={30} />
              </div>

              <LoggedUserMenu
                visible={menuOpen}
                username="carlos"
                ref={menuRef}
                onClose={() => setMenuOpen(false)}
              />
            </>
          ) : (
            <Link to="/login">
              <Button
                type="primary"
                style={{
                  padding: "18px",
                  borderRadius: "999px",
                  boxShadow: "none",
                }}
              >
                <b>{t("make_login")}</b>
              </Button>
            </Link>
          )}
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
