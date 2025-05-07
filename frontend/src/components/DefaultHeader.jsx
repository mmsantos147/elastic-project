import React, { useState, useRef, useEffect } from "react";
import { Layout, Button, Space, Col, Drawer, Menu, Row } from "antd";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import WeatherReport from "./WeatherReport";
import { MenuOutlined } from "@ant-design/icons";
import { useAuthService } from "../api/Authorization.api";
import { FaCircleUser } from "react-icons/fa6";
import { LoggedUserMenu } from "./LoggedUserMenu";
import styled from "styled-components";
import COLORS from "../colors";
import { IoLogOut } from "react-icons/io5";
import { FaStar, FaTrash } from "react-icons/fa";
import { LoggedUserMenuMobile } from "./LoggedUserMenuMobile";

const { Header } = Layout;

const MenuItem = styled(Row)`
  padding: 15px;
  background-color: rgb(24, 24, 24);
  margin-top: 10px;
  color: ${COLORS.white};
  text-decoration: none;
`;

const LinkNoUnderline = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const MenuItemTop = styled(MenuItem)`
  border-radius: 16px 16px 0 0;
`;

const MenuItemBottom = styled(MenuItem)`
  border-radius: 0 0 16px 16px;
`;

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
    const verifyUser = async () => {
      const data = await verify();

      if (data.logged) {
        setIsLogged(data.logged);
        setUsername(data.username);
      }
    };

    verifyUser();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  alignContent: "center",
                  display: "flex",
                }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FaCircleUser style={{ color: "white" }} size={30} />
              </div>

              <LoggedUserMenu
                visible={menuOpen}
                username={username}
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
            <LoggedUserMenuMobile username={username} logged={isLogged}/>
          </Drawer>
        </>
      )}
    </Header>
  );
};

export default DefaultHeader;
