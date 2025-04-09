import React from "react";
import { Layout, Button, Space } from "antd";
import { APP_NAME_CAMMEL_CASE } from "./constants";
import DefaultHeader from "./components/Header";
import DefaultFooter from "./components/Footer";
import AISearch from "./components/AISearch";
import SearchBar from "./components/search/SearchBar";
import SearchButton from "./components/search/SearchButton";

const { Content } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#202124" }}>
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
          <AISearch />
        </div>
        <SearchBar />

        <Space>
          <SearchButton />
        </Space>
      </Content>

      <DefaultFooter />
    </Layout>
  );
};

export default App;
