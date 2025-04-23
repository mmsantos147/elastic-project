import React, { useEffect, useState } from "react";
import UAISearch from "../components/UAISearch";
import SearchBar from "../components/search/SearchBar";
import styled from "styled-components";
import Layout from "antd/es/layout/layout";
import { Col, Row, Space, Button  , message } from "antd";
import NavigationBar from "../components/NavigationBar";
import COLORS from "../colors";
import FilterBar from "../components/FilterBar";
import searchApi from "../api/search.api";
import { useLocation } from "react-router-dom";
import { API_PREFIX, ROOT_URL } from "../constants";
import SearchResults from "../components/search/SeachResults";
import PageSelect from "../components/search/PageSelect";
import EmptyResults from "../components/search/EmptyResults";

const { Content } = Layout;

const StyledSearchBar = styled(SearchBar)`
  line-height: 0px;
`;

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("q") || "";

  const [toolsVisible, setToolsVisible] = useState(false);
  const [searchResult, setSearchResults] = useState({
    hits: 0,
    pages: 0,
    timeTaken: 0.0,
    results: [],
  });
  const [processingRequest, setProcessingRequest] = useState(false);
  const [aiAbstract, setAiAbstract] = useState({});
  const [formData, setFormData] = useState({
    search: initialSearch,
    page: 1,
    resultsPerPage: 10,
    orderBy: "SCORE_DESC",
    maxReadTime: null,
    searchFor: "",
    minDateTime: "",
  });

  useEffect(() => {
    if (initialSearch) {
      searchSubmit(initialSearch);
    }
  }, [initialSearch]);

  useEffect(() => {
    const es = new EventSource(`${ROOT_URL}/${API_PREFIX}/stream`);

    es.addEventListener("AiAbstract", (evt) => {
      try {
        console.log("===================================================")
        console.log(evt.data);
        const data = JSON.parse(evt.data);
        console.log(data);
        setAiAbstract(data);
      } catch (err) {
        message.error("Um erro aconteceu com a inteligência artificial!")
        console.error("Erro parseando SSE:", err);
      }
    });

    return () => es.close();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSearchResults({
          hits: 0,
          pages: 0,
          timeTaken: 0.0,
          results: [],
        });
  
        setProcessingRequest(true);
  
        const response = await searchApi.search(formData);
        setSearchResults(response);
      } catch (error) {
        console.error("Erro ao buscar resultados:", error);
      } finally {
        setProcessingRequest(false);
      }
    };
  
    fetchData(); 
  }, [formData]);

  const setSearchValue = (value) => {
    setFormData((prev) => ({ ...prev, search: value }));
  };
  

  const searchSubmit = async (value) => {
  //   setSearchResults({
  //     hits: 0,
  //     pages: 0,
  //     timeTaken: 0.0,
  //     results: [],
  //   });
  //   const formContent = { ...formData, search: value };
  //   setFormData(formContent);
  //   setProcessingRequest(true);
  //   const response = await searchApi.search(formContent);
  //   setSearchResults(response);
  //   setProcessingRequest(false);
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
          <a href="/">
            <UAISearch logoWidth="150px" style={{ margin: "12px 0 20px 0" }} />
          </a>
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
              onEnterEvent={setSearchValue}
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
        {searchResult.results.length > 0 || processingRequest ? (
          <>
            <SearchResults
              processingRequest={processingRequest}
              aiAbstract={aiAbstract}
              searchResult={searchResult.results}
            />
            <PageSelect setFormData={setFormData} />
          </>
        ) : (
          <EmptyResults />
        )}

        {/* <SearchIndex
          id={1} 
          url={"https://wikipedia.com/"}
          title={"um titulo aleatorio"}
          content={"Time-dependent [1] variational Monte Carlo The time-dependent variational Monte Carlo (t-VMC) method is a quantum Monte Carlo approach to study the dynamics of closed, non-relativistic quantum systems in the context of the quantum many-body problem. It is an extension of the variational Monte Carlo method, in which a time-dependent pure quantum state is encoded by some variational wave function, generally parametrized as <som1>\\Psi(X,t) = \\exp \\left ( \\sum_k a_k(t) O_k(X) \\right )</som1> where the c ..."}
          readingTime={10}
          date={"10/10/10"}
        /> */}
      </Content>
    </>
  );
};

export default Search;
