import React, { useEffect, useState } from "react";
import SearchBar from "../components/search/SearchBar";
import styled from "styled-components";
import Layout from "antd/es/layout/layout";
import { message, Grid } from "antd";
import COLORS from "../colors";
import FilterBar from "../components/FilterBar";
import { useLocation } from "react-router-dom";
import { API_PREFIX } from "../constants";
import SearchResults from "../components/search/SeachResults";
import PageSelect from "../components/search/PageSelect";
import EmptyResults from "../components/search/EmptyResults";
import { useNavigate } from "react-router-dom";
import { useSearchService } from "../api/Search.api";
import emitter from "../eventBus";
import { useAuthService } from "../api/Authorization.api";
import { DidYouMean } from "../components/search/DidYouMean";
import SearchHeader from "../components/SearchHeader";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const Search = () => {
  const { search } = useSearchService();
  const { verify } = useAuthService();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("q") || "";
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const isMobile = !screens.md;
  const [toolsVisible, setToolsVisible] = useState(false);
  const [searchResult, setSearchResults] = useState({
    hits: 0,
    pages: 0,
    timeTaken: 0.0,
    results: [],
    requestId: "",
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
  const [currentAiAbstract, setCurrentAiAbstract] = useState("");

  useEffect(() => {
    if (initialSearch != formData.search) {
      setFormData((prev) => ({ ...prev, search: initialSearch }));
    }
  }, [initialSearch]);

  useEffect(() => {
    const es = new EventSource(`/${API_PREFIX}/stream`);

    es.addEventListener("AiAbstract", (evt) => {
      try {
        console.log(evt.data);
        const data = JSON.parse(evt.data);
        console.log(data);
        setAiAbstract(data);
        setCurrentAiAbstract(data.requestId);
      } catch (err) {
        message.error("Um erro aconteceu com a inteligência artificial!");
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
          requestId: "",
        });

        setProcessingRequest(true);
        setAiAbstract({});
        const response = await search(formData);
        setSearchResults(response);
        currentAiAbstract(response.requestId);
      } catch (error) {
        console.error("Erro ao buscar resultados:", error);
      } finally {
        setProcessingRequest(false);
      }
    };
    fetchData();
    navigate(`/search?q=${formData.search}`);
  }, [formData]);

  useEffect(() => {
    const handleNewIARequest = () => {
      setCurrentAiAbstract((prev) => prev + 1);
    };

    emitter.on("new-ai-request", handleNewIARequest);
    return () => emitter.off("new-ai-request", handleNewIARequest);
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
  const setSearchValue = (value) => {
    setFormData((prev) => ({ ...prev, search: value }));
  };

  return (
    <>
      <SearchHeader setSearchValue={setSearchValue} formData={formData} toolsVisible={toolsVisible} setToolsVisible={setToolsVisible}/>

      {toolsVisible && (
        <FilterBar setFormData={setFormData} searchResult={searchResult} />
      )}

      <Content
        style={{
          paddingLeft: isMobile ? "15px" : "220px",
          paddingRight: isMobile ? "15px" : "0",
          marginTop: isMobile ? "15px" : "30px",
          color: COLORS.white,
          maxWidth: isMobile ? "100%" : "950px",
        }}
      >
        <DidYouMean suggestions={searchResult.suggestions || []} />
        {(Array.isArray(searchResult?.results) &&
          searchResult.results.length > 0) ||
        processingRequest ? (
          <>
            <SearchResults
              processingRequest={processingRequest}
              aiAbstract={aiAbstract}
              searchResult={searchResult.results}
              currentRequestId={currentAiAbstract}
            />
            <PageSelect
              setFormData={setFormData}
              maxPages={searchResult.pages}
            />
          </>
        ) : (
          <EmptyResults />
        )}
      </Content>
    </>
  );
};

export default Search;
