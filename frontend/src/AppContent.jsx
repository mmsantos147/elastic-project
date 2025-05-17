import React, { useEffect } from "react";
import { ConfigProvider, Layout, theme } from "antd";
import DefaultFooter from "./components/Footer";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./view/Main";
import Search from "./view/Search";
import VLibras from "@djpfs/react-vlibras";
import { useAuthService } from "./api/Authorization.api";
import COLORS from "./colors";
import Login from "./view/Login";
import Register from "./view/Register";
import { Tips } from "./view/Tips";
import { SearchProvider } from "./context/SearchContext";
import { Favorites } from "./view/Favorites";
import { useAuthData } from "./context/AuthContext";

const AppContent = () => {
  const { initSession } = useAuthService();
  const { isLogged } = useAuthData();

  useEffect(() => {
    const initializeSession = async () => {
      initSession();
    };

    initializeSession();
  }, []);

  return (
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

              <Route path="/search" element={<SearchProvider><Search /></SearchProvider>} />
              <Route path="/tips" element={<Tips />} />

              {!isLogged && <Route path="/login" element={<Login />} /> }
              {!isLogged && <Route path="/register" element={<Register />} /> }
              
              {isLogged && <Route path="/favorites" element={<Favorites />} />}
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          <DefaultFooter />
        </Layout>
      </ConfigProvider>
  );
};

export default AppContent;
