import React, { useState } from "react";
import UAISearch from "../components/UAISearch";
import SearchBar from "../components/search/SearchBar";
import styled from "styled-components";
import Layout from "antd/es/layout/layout";
import { Col, Row, Space, Button, Typography } from "antd";
import NavigationBar from "../components/NavigationBar";
import COLORS from "../colors";
import FilterBar from "../components/FilterBar";
import { BsStars } from "react-icons/bs";

const { Content, Text } = Layout;
const { Title } = Typography;

const Search = () => {
  const [toolsVisible, setToolsVisible] = useState(false);

  const StyledSearchBar = styled(SearchBar)`
    line-height: 0px;
  `;

  return (
    <>
      <Row
        style={{
          gap: "30px",
          margin: "40px 40px 0px 40px",
          borderBottom: "1px gray solid",
        }}
      >
        <Col>
          <UAISearch logoWidth="150px" style={{ margin: "12px 0 20px 0" }} />
        </Col>
        <Col
          sm={8}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <StyledSearchBar />
            <div style={{ marginTop: "20px" }}>
              <NavigationBar
                onClickShowTools={() => {
                  setToolsVisible(!toolsVisible);
                }}
              />
            </div>
          </div>
        </Col>
        <Col flex="auto"></Col>
        <Col>
          <Space size="large">
            <Button
              type="primary"
              style={{ padding: "18px", borderRadius: "999px" }}
            >
              <b>Fazer login</b>
            </Button>
          </Space>
        </Col>
      </Row>

      {toolsVisible && <FilterBar />}

      <Content style={{ paddingLeft: "220px", marginTop: "30px", color: COLORS.white }}>
        <Row>
          <Col style={{marginRight: "20px"}}>
            <BsStars style={{ color: COLORS.purple, fontSize: "30px" }} />
          </Col>
          <Col style={{display: "flex", alignItems: "center" }}><b>Visão gerada por IA</b></Col>
        </Row>
        <Row style={{ marginTop: "20px"}}>
          <Title level={3} style={{color: COLORS.white}}>Lorem ipsum dolor sit</Title>
        </Row>
        <Row>
          
        </Row>
      </Content>
    </>
  );
};

export default Search;
