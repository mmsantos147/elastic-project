import { Layout, Space } from "antd";
import UAISearch from "../components/UAISearch";
import SearchBar from "../components/search/SearchBar";
import SearchButton from "../components/search/SearchButton";
import DefaultHeader from "../components/DefaultHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;

const MarginBottomSearchBar = styled(SearchBar)`
  margin-bottom: 30px;
`;

const Main = () => {
  const navigate = useNavigate();
  const setSearchValue = (e) => {}

  const onEnterEvent = async (value) => {
    navigate(`/search?q=${value}`);
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
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "calc(50% - 180px)",
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          <UAISearch logoWidth={"400px"} />
        </div>
        <MarginBottomSearchBar onEnterEvent={onEnterEvent} setSearchValue={setSearchValue} />
        <Space>
          <SearchButton />
        </Space>
      </Content>
    </>
  );
};

export default Main;
