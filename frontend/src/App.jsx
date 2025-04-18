import React from "react";
import { ConfigProvider, Layout } from "antd";
import DefaultFooter from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./view/Main";
import Search from "./view/Search";
import VLibras from "@djpfs/react-vlibras";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Skeleton: {
            gradientFromColor: "rgb(54, 54, 54)",
            gradientToColor: "rgba(85, 85, 85, 0)"
          }
        }
      }}
    >
      <Layout style={{ minHeight: "100vh", backgroundColor: "#202124" }}>
        <VLibras />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
        <DefaultFooter />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
