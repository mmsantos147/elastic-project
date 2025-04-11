import React, { useState } from "react";
import UAISearch from "../components/UAISearch";
import SearchBar from "../components/search/SearchBar";
import styled from "styled-components";
import Layout from "antd/es/layout/layout";
import { Col, Row, Space, Button, Typography, Divider } from "antd";
import NavigationBar from "../components/NavigationBar";
import COLORS from "../colors";
import FilterBar from "../components/FilterBar";
import { BsStars } from "react-icons/bs";
import { FiLink2 } from "react-icons/fi";
import IAVision from "../components/results/IAVision";
import SearchIndex from "../components/results/SearchIndex";

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
          sm={10}
          style={{
            display: "flex",
            alignItems: "center",
            minWidth: "600px"
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
        <Col flex="auto" />
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

      <Content style={{ paddingLeft: "220px", marginTop: "30px", color: COLORS.white, maxWidth: "950px" }}>
        <IAVision style={{marginBottom: "50px"}} />
        <Divider style={{borderColor: COLORS.gray }} />
        <Row>
          <SearchIndex />
          <SearchIndex />
          <SearchIndex />
          <SearchIndex />
          <SearchIndex />
          <SearchIndex />
          <SearchIndex />
          <SearchIndex />
          <SearchIndex />

        </Row>
      </Content>
    </>
  );
};

export default Search;
