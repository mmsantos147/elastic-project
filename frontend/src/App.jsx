import React, { useEffect } from "react";
import { ConfigProvider, Layout } from "antd";
import DefaultFooter from "./components/Footer";
import i18n from './utils/i18n';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./view/Main";
import Search from "./view/Search";
import VLibras from "@djpfs/react-vlibras";
import authorizationApi from './api/authorization.api'
import COLORS from "./colors";
import { I18nextProvider } from "react-i18next";
import Login from "./view/Login";
import Register from "./view/Register";

const App = () => {
  useEffect(() => {
    const initializeSession = async () => {
      authorizationApi.initSession()
    };

    initializeSession();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: COLORS.dark_gray,
          colorTextPlaceholder: "white"
        },
        components: {
          Skeleton: {
            gradientFromColor: "rgb(54, 54, 54)",
            gradientToColor: "rgba(85, 85, 85, 0)",
          },
          Dropdown: {
            colorBgElevated: "rgb(48, 49, 52)",
            colorText: COLORS.white
          },
          Input: {
            activeBg: COLORS.dark_gray,
            hoverBg: COLORS.dark_gray,
            activeBorderColor: COLORS.purple,
            hoverBorderColor: COLORS.purple
            
          }
        },
      }}
    >
      <Layout style={{ minHeight: "100vh", backgroundColor: "#202124" }}>
        <VLibras />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
        <DefaultFooter />
      </Layout>
    </ConfigProvider>
    </I18nextProvider>
  );
};

export default App;
