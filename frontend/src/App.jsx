import React from "react";
import { Layout, Button, Space } from "antd";
import { APP_NAME_CAMMEL_CASE } from "./constants";
import DefaultHeader from "./components/Header";
import DefaultFooter from "./components/Footer";
import AISearch from "./components/AISearch";
import SearchBar from "./components/search/SearchBar";

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
          <Button
            style={{
              borderRadius: "4px",
              backgroundColor: "#303134",
              color: "#e8eaed",
              borderColor: "#5f6368",
              border: "0px",
            }}
            size="middle"
          >
            Pesquisa {`${APP_NAME_CAMMEL_CASE}`}
          </Button>
        </Space>
      </Content>

      <DefaultFooter />
    </Layout>
  );
};

export default App;
