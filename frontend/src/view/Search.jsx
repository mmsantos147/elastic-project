import React, { useState } from "react";
import UAISearch from "../components/UAISearch";
import SearchBar from "../components/search/SearchBar";
import styled from "styled-components";
import Layout from "antd/es/layout/layout";
import { Col, Row, Space, Button, Divider } from "antd";
import NavigationBar from "../components/NavigationBar";
import COLORS from "../colors";
import FilterBar from "../components/FilterBar";
import IAVision from "../components/results/IAVision";
import SearchIndex from "../components/results/SearchIndex";
import { GrNext, GrPrevious } from "react-icons/gr";

const { Content } = Layout;

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
            minWidth: "600px",
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

      <Content
        style={{
          paddingLeft: "220px",
          marginTop: "30px",
          color: COLORS.white,
          maxWidth: "950px",
        }}
      >
        <IAVision style={{ marginBottom: "50px" }} />
        <Divider style={{ borderColor: COLORS.gray }} />
        
        <Row>
          <SearchIndex url={"a"} title={"a"} content={"a"} readingTime={"3"} date={"3"} />
        </Row>

        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
            marginBottom: "50px",
            flexDirection: "column", 
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              display: "flex"
            }}
          >
            <UAISearch logoWidth={"200px"}/> 
          </div>

          <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col style={{marginRight: "14px"}}>
              < GrPrevious /> 
              </Col>
              <Col style={{ marginRight: "14px" }}>
                <b>1</b>
              </Col>
              <Col style={{ marginRight: "14px", color: COLORS.purple}}>
                2
              </Col>
              <Col style={{ marginRight: "14px", color: COLORS.purple}}>
                3
              </Col>
              <Col style={{ marginRight: "14px", color: COLORS.purple}}>
                4
              </Col>
              <Col style={{marginRight: "14px", color: COLORS.purple}}>
                5
              </Col>
              <Col>
              < GrNext />
              </Col>
            
          </Row>
        </Row>
      </Content>
    </>
  );
};

export default Search;
