import React, { useEffect } from "react";
import { ConfigProvider, Layout, theme } from "antd";
import DefaultFooter from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./view/Main";
import Search from "./view/Search";
import VLibras from "@djpfs/react-vlibras";
import { useAuthService } from "./api/Authorization.api";
import COLORS from "./colors";
import Login from "./view/Login";
import Register from "./view/Register";
import i18n from "./utils/i18n";

const AppContent = () => {
  const { initSession } = useAuthService();

  useEffect(() => {
    const initializeSession = async () => {
      initSession();
    };

    initializeSession();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorBgContainer: COLORS.dark_gray,
            colorTextPlaceholder: "white",
          },
          components: {
            Skeleton: {
              gradientFromColor: "rgb(54, 54, 54)",
              gradientToColor: "rgba(85, 85, 85, 0)",
            },
            Dropdown: {
              colorBgElevated: "rgb(48, 49, 52)",
              colorText: COLORS.white,
            },
            Input: {
              activeBg: COLORS.dark_gray,
              hoverBg: COLORS.dark_gray,
              activeBorderColor: COLORS.purple,
              hoverBorderColor: COLORS.purple,
            },
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

export default AppContent;
