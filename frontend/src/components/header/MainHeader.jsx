import React from "react";
import { Layout, Col } from "antd";
import { SideInfoMenu } from "../menu/SideInfoMenu";
import { AuthProvider } from "../../context/AuthContext";

const { Header } = Layout;

const MainHeader = () => {

  const isMobile = window.innerWidth <= 768;

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

      <AuthProvider>
        <SideInfoMenu />
      </AuthProvider>

    </Header>
  );
};

export default MainHeader;
