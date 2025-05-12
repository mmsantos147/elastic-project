import React from "react";
import { Row, Col, Grid } from "antd";
import { Link } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import { AuthProvider } from "../../context/AuthContext";
import { SideInfoMenu } from "../menu/SideInfoMenu";
import UAISearch from "../UAISearch";
import NavigationBar from "../NavigationBar";
import styled from "styled-components";
import { SearchBarProvider } from "../../context/SearchBarContext";

const StyledSearchBar = styled(SearchBar)`
  line-height: 0px;
`;

const StyledHeaderRow = styled(Row)`
  display: flex;
  flex-wrap: nowrap;
  gap: 30px;
  padding: 40px 40px 0 40px;
  border-bottom: 1px solid gray;
`;

const LogoCol = styled(Col)`
  display: flex;
  justify-content: flex-start;
`;

const SearchCol = styled(Col)`
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 900px;
  min-width: 0;
`;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AuthCol = styled(Col)`
  margin-left: auto;
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
          <Col>
            <Link to="/">
              <UAISearch
                logoWidth={"100px"}
                style={{ margin: "0" }}
              />
            </Link>
          </Col>
          <Col>
            <SideInfoMenu />
          </Col>
        </Row>
        <Col style={{ marginTop: "10px" }}>
          <SearchBarProvider>
            <StyledSearchBar
              setSearchValue={setSearchValue}
              onEnterEvent={setSearchValue}
              initialSearch={formData.search}
            />
          </SearchBarProvider>
          <div style={{ marginTop: "10px"}}>
            <NavigationBar
              onClickShowTools={() => setToolsVisible(!toolsVisible)}
            />
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <StyledHeaderRow>
      <LogoCol>
        <Link to="/">
          <UAISearch
            logoWidth={"150px"}
            style={{ margin: "12px 0 20px 0" }}
          />
        </Link>
      </LogoCol>
      <SearchCol>
        <SearchWrapper>
          <SearchBarProvider>
            <StyledSearchBar
              setSearchValue={setSearchValue}
              onEnterEvent={setSearchValue}
              initialSearch={formData.search}
            />
          </SearchBarProvider>
          <div style={{ marginTop: "20px" }}>
            <NavigationBar
              onClickShowTools={() => setToolsVisible(!toolsVisible)}
            />
          </div>
        </SearchWrapper>
      </SearchCol>
      <AuthCol>
        <SideInfoMenu />
      </AuthCol>
    </StyledHeaderRow>
  );
};

export default SearchHeader;
