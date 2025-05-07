import { Button, Row } from "antd"
import LanguageSelector from "./LanguageSelector"
import WeatherReport from "./WeatherReport"
import { FaCircleUser } from "react-icons/fa6"
import styled from "styled-components";
import COLORS from "../colors";
import { Link } from "react-router-dom";
import { FaStar, FaTrash } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useTranslation } from "react-i18next";


const MenuItem = styled(Row)`
  padding: 15px;
  background-color: rgb(24, 24, 24);
  margin-top: 10px;
  color: ${COLORS.white};
  text-decoration: none;
`;

const LinkNoUnderline = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const MenuItemTop = styled(MenuItem)`
  border-radius: 16px 16px 0 0;
`;

const MenuItemBottom = styled(MenuItem)`
  border-radius: 0 0 16px 16px;
`;

export const LoggedUserMenuMobile = ({isLogged, username}) => {
    const { t } = useTranslation();

    return (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <WeatherReport />
            <LanguageSelector />
          </div>
          {isLogged ? (
            <div style={{ marginTop: "20px" }}>
              <Row align="center" style={{ marginTop: "20px" }}>
                <FaCircleUser style={{ color: "white", marginTop: 8 }} size={100} />
              </Row>
              <Row align="center" style={{ marginTop: "20px", fontSize: "30px" }}>
                {t("hello")}, {username}!
              </Row>
              <MenuItemTop>
                <FaStar style={{ marginRight: "10px" }} /> {t("favorite_searches")}
              </MenuItemTop>
              <MenuItem>
                <FaTrash style={{ marginRight: "10px" }} /> {t("clean_history")}
              </MenuItem>
              <MenuItemBottom>
                <IoLogOut style={{ marginRight: "10px" }} /> {t("logout")}
              </MenuItemBottom>
            </div>
          ) : (
            <div style={{ marginTop: "20px" }}>
              <Link to="/login">
                <Button
                  type="primary"
                  style={{
                    padding: "18px",
                    borderRadius: "999px",
                    boxShadow: "none",
                    width: "100%",
                    marginBottom: "30px",
                  }}
                >
                  <b>{t("make_login")}</b>
                </Button>
              </Link>
            </div>
          )}
        </>
      )
}