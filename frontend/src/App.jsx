import React from "react";
import { Layout } from "antd";
import DefaultHeader from "./components/DefaultHeader";
import DefaultFooter from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./view/Main";
import Search from "./view/Search";


const App = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#202124" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>

      

      <DefaultFooter />
    </Layout>
  );
};

export default App;
