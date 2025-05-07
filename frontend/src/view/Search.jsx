import React, { useEffect, useRef, useState } from "react";
import UAISearch from "../components/UAISearch";
import SearchBar from "../components/search/SearchBar";
import styled from "styled-components";
import Layout from "antd/es/layout/layout";
import { Col, Row, Space, Button, message, Drawer, Grid } from "antd";
import NavigationBar from "../components/NavigationBar";
import COLORS from "../colors";
import FilterBar from "../components/FilterBar";
import { Link, useLocation } from "react-router-dom";
import { API_PREFIX, ROOT_URL } from "../constants";
import SearchResults from "../components/search/SeachResults";
import PageSelect from "../components/search/PageSelect";
import EmptyResults from "../components/search/EmptyResults";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import LanguageSelector from "../components/LanguageSelector";
import WeatherReport from "../components/WeatherReport";
import { useSearchService } from "../api/Search.api";
import emitter from "../eventBus";
import { IoPersonSharp } from "react-icons/io5";
import { MenuOutlined } from "@ant-design/icons";
import { useAuthService } from "../api/Authorization.api";
import { DidYouMean } from "../components/search/DidYouMean";
import { LoggedUserMenuMobile } from "../components/LoggedUserMenuMobile";
import { LoggedUserMenu } from "../components/LoggedUserMenu";
import { FaCircleUser } from "react-icons/fa6";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const StyledSearchBar = styled(SearchBar)`
  line-height: 0px;
`;

const Search = () => {
  const { search } = useSearchService();
  const { verify } = useAuthService();
  const [searchParamsReactive] = useSearchParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("q") || "";
  const paramQ = searchParamsReactive.get("q");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const screens = useBreakpoint();

  const isMobile = !screens.md;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const [userData, setUserData] = useState({});

  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState();

  const [menuOpen, setMenuOpen] = useState(false);
  const userIconRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (initialSearch != formData.search) {
      setFormData((prev) => ({ ...prev, search: initialSearch }));
    }
  }, [initialSearch]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const es = new EventSource(`${ROOT_URL}/${API_PREFIX}/stream`);

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
      <Row
        style={{
          gap: isMobile ? "10px" : "30px",
          margin: isMobile ? "15px 15px 0px 15px" : "40px 40px 0px 40px",
          borderBottom: "1px gray solid",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Col
          style={{
            display: "flex",
            justifyContent: isMobile ? "space-between" : "flex-start",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <Link to="/">
            <UAISearch
              logoWidth={isMobile ? "100px" : "150px"}
              style={{ margin: isMobile ? "0" : "12px 0 20px 0" }}
            />
          </Link>

          {isMobile && (
            <Button
              icon={<MenuOutlined />}
              onClick={toggleMobileMenu}
              style={{ border: "none" }}
            />
          )}
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
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <StyledSearchBar
              setSearchValue={setSearchValue}
              onEnterEvent={setSearchValue}
              initialSearch={formData.search}
            />
            <div style={{ marginTop: isMobile ? "10px" : "20px" }}>
              <NavigationBar
                onClickShowTools={() => {
                  setToolsVisible(!toolsVisible);
                }}
              />
            </div>
          </div>
        </Col>

        {!isMobile && (
          <>
            <Col flex="auto" />
            <Col>
              <Space size="large">
                <WeatherReport />
                <LanguageSelector />
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
            </Col>
          </>
        )}
      </Row>

      {/* Mobile menu drawer */}
      {isMobile && (
        <Drawer
          title={null}
          placement="right"
          onClose={toggleMobileMenu}
          open={mobileMenuOpen}
          width={250}
        >
          <LoggedUserMenuMobile username={username} isLogged={isLogged} />
        </Drawer>
      )}

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
