import React, { useEffect, useState } from "react";
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
import searchApi from "../api/search.api";
import { useLocation } from "react-router-dom";
import SearchIndexSkeleton from "../components/results/SearchIndexSkeleton";

const { Content } = Layout;

const StyledSearchBar = styled(SearchBar)`
  line-height: 0px;
`;

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("q") || "";

  const [toolsVisible, setToolsVisible] = useState(false);
  const [searchResult, setSearchResults] = useState([]);
  const [processingRequest, setProcessingRequest] = useState(false);
  const [formData, setFormData] = useState({
    search: initialSearch,
    page: 1,
    resultsPerPage: "",
    orderBy: "",
    maxReadTime: "",
    searchFor: "",
  });

  useEffect(() => {
    if (initialSearch) {
      searchSubmit(initialSearch);
    }
  }, [initialSearch]);

  const setSearchValue = (value) => {
    setFormData((prev) => ({ ...prev, search: value }));
  };

  const searchSubmit = async (value) => {
    setSearchResults([]);
    const formContent = { ...formData, search: value };
    setFormData(formContent);
    setProcessingRequest(true);
    const response = await searchApi.search(formContent);
    setSearchResults(response);
    setProcessingRequest(false);
  };

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
            minWidth: "730px",
          }}
        >
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <StyledSearchBar
              setSearchValue={setSearchValue}
              onEnterEvent={searchSubmit}
              initialSearch={initialSearch}
            />
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

      {toolsVisible && <FilterBar setFormData={setFormData} />}

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

        {searchResult.length === 0 && processingRequest ? (
          <>
            <SearchIndexSkeleton />
            <SearchIndexSkeleton />
            <SearchIndexSkeleton />
          </>
        ) : (
          <Row>
            {searchResult.map((result) => (
              <SearchIndex
                id={result.id}
                url={result.url}
                title={result.title}
                content={result.content}
                readingTime={result.reading_time}
                date={result.datetime}
              />
            ))}
          </Row>
        )}

        {/* <SearchIndex
          id={1} 
          url={"https://wikipedia.com/"}
          title={"um titulo aleatorio"}
          content={"Time-dependent [1] variational Monte Carlo The time-dependent variational Monte Carlo (t-VMC) method is a quantum Monte Carlo approach to study the dynamics of closed, non-relativistic quantum systems in the context of the quantum many-body problem. It is an extension of the variational Monte Carlo method, in which a time-dependent pure quantum state is encoded by some variational wave function, generally parametrized as <som1>\\Psi(X,t) = \\exp \\left ( \\sum_k a_k(t) O_k(X) \\right )</som1> where the c ..."}
          readingTime={10}
          date={"10/10/10"}
        /> */}

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
              display: "flex",
            }}
          >
            <UAISearch logoWidth={"200px"} />
          </div>

          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col style={{ marginRight: "14px" }}>
              <GrPrevious />
            </Col>
            <Col style={{ marginRight: "14px" }}>
              <b>1</b>
            </Col>
            <Col style={{ marginRight: "14px", color: COLORS.purple }}>2</Col>
            <Col style={{ marginRight: "14px", color: COLORS.purple }}>3</Col>
            <Col style={{ marginRight: "14px", color: COLORS.purple }}>4</Col>
            <Col style={{ marginRight: "14px", color: COLORS.purple }}>5</Col>
            <Col>
              <GrNext />
            </Col>
          </Row>
        </Row>
      </Content>
    </>
  );
};

export default Search;
