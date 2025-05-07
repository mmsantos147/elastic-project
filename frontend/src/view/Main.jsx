import { Layout, Space } from "antd";
import UAISearch from "../components/UAISearch";
import SearchBar from "../components/search/SearchBar";
import SearchButton from "../components/search/SearchButton";
import DefaultHeader from "../components/DefaultHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const { Content } = Layout;

const MarginBottomSearchBar = styled(SearchBar)`
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
`;

const ResponsiveLogo = styled(UAISearch)`
  @media (max-width: 768px) {
    transform: scale(0.8);
  }
  @media (max-width: 480px) {
    transform: scale(0.6);
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
`;

const Main = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const setSearchValue = (e) => {};
  
  const onEnterEvent = async (value) => {
    navigate(`/search?q=${value}`);
  };

  const getLogoWidth = () => {
    if (windowWidth <= 480) return "200px";
    if (windowWidth <= 768) return "300px";
    return "400px";
  };

  return (
    <>
      <DefaultHeader />
      <Content
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            marginBottom: "40px",
            marginTop: windowWidth <= 768 ? "-80px" : "-120px",
          }}
        >
          <ResponsiveLogo logoWidth={getLogoWidth()} />
        </div>
        
        <SearchContainer>
          <MarginBottomSearchBar onEnterEvent={onEnterEvent} setSearchValue={setSearchValue} initialSearch={""} />
          <Space>
            <SearchButton />
          </Space>
        </SearchContainer>
      </Content>
    </>
  );
};

export default Main;