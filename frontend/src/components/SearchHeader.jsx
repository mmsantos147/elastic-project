import React from "react";
import { Row, Col, Grid } from "antd";
import { Link } from "react-router-dom";
import SearchBar from "./search/SearchBar";
import { AuthProvider } from "../context/AuthContext";
import { SideInfoMenu } from "./menu/SideInfoMenu";
import UAISearch from "./UAISearch";
import NavigationBar from "./NavigationBar";
import styled from "styled-components";

const StyledSearchBar = styled(SearchBar)`
  line-height: 0px;
`;

const { useBreakpoint } = Grid;

const SearchHeader = ({
  setSearchValue,
  formData,
  toolsVisible,
  setToolsVisible,
}) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const SearchBarComponent = (
    <StyledSearchBar
      setSearchValue={setSearchValue}
      onEnterEvent={setSearchValue}
      initialSearch={formData.search}
    />
  );

  const NavigationComponent = (
    <div style={{ marginTop: isMobile ? "10px" : "20px" }}>
      <NavigationBar onClickShowTools={() => setToolsVisible(!toolsVisible)} />
    </div>
  );

  const LogoComponent = (
    <Link to="/">
      <UAISearch
        logoWidth={isMobile ? "100px" : "150px"}
        style={{ margin: isMobile ? "0" : "12px 0 20px 0" }}
      />
    </Link>
  );

  const AuthMenuComponent = (
    <AuthProvider>
      <SideInfoMenu />
    </AuthProvider>
  );

  if (isMobile) {
    return (
      <Row
        style={{
          gap: "10px",
          margin: "15px",
          borderBottom: "1px gray solid",
          flexDirection: "column",
        }}
      >
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Col>{LogoComponent}</Col>
          <Col>{AuthMenuComponent}</Col>
        </Row>
        <Col style={{ marginTop: "10px" }}>
          {SearchBarComponent}
          {NavigationComponent}
        </Col>
      </Row>
    );
  }

  return (
    <Row
      style={{
        gap: "30px",
        margin: "40px",
        borderBottom: "1px gray solid",
        flexDirection: "row",
      }}
    >
      <Col
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        {LogoComponent}
      </Col>
      <Col
        xs={24}
        sm={24}
        md={10}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {SearchBarComponent}
          {NavigationComponent}
        </div>
      </Col>
      <Col flex="auto" />
      <Col>{AuthMenuComponent}</Col>
    </Row>
  );
};

export default SearchHeader;
