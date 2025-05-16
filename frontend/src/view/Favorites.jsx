import { Content } from "antd/es/layout/layout";
import UAISearch from "../components/UAISearch";
import {
  Col,
  Typography,
  Layout,
} from "antd";
import { useTranslation } from "react-i18next";
import { SideInfoMenu } from "../components/menu/SideInfoMenu";
import { Link } from "react-router-dom";
import { FavoriteItem } from "../components/favorites/FavoriteItem";
import { useAuthData } from "../context/AuthContext";

const { Header } = Layout;

export const Favorites = () => {
  const [t, i18n] = useTranslation();
  const { favoriteItems } = useAuthData();

  const isMobile = window.innerWidth <= 768;

  return (
    <>
      <Header
        style={{
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "0 16px" : "0 50px",
        }}
      >
        <Link to="/">
            <UAISearch logoWidth={"150px"} />
        </Link>
        <Col flex="auto" />

        <SideInfoMenu />
      </Header>

      <Content style={{ height: "100%", padding: isMobile? "40px 10px" : "40px 100px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {favoriteItems.map((favoriteItems) => (
            <FavoriteItem item={favoriteItems} />
          ))}
        </div>
      </Content>
    </>
  );
};
