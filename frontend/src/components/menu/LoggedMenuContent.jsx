import { Row } from "antd";
import { FaStar, FaTrash } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import styled from "styled-components";
import { useAuthService } from "../../api/Authorization.api";
import { useHistoryService } from "../../api/History.api";
import { IoLogOut } from "react-icons/io5";
import { useAuthData } from "../../context/AuthContext";
import COLORS from "../../colors";
import { useTranslation } from "react-i18next";

const MenuItem = styled(Row)`
  padding: 15px;
  background-color: rgb(24, 24, 24);
  margin-top: 4px;
  color: ${COLORS.white};
  text-decoration: none;
  cursor: pointer;

  &:hover{
    background-color: rgb(20, 20, 20);
  }
`;

const MenuItemTop = styled(MenuItem)`
  border-radius: 16px 16px 0 0;
`;

const MenuItemBottom = styled(MenuItem)`
  border-radius: 0 0 16px 16px;
`;

export const LoggedMenuContent = () => {
  const { t, i18n } = useTranslation();
  const { logout } = useAuthService();
  const { deleteAllHistory } = useHistoryService();
  const { username } = useAuthData();

  return (
    <div style={{ marginTop: "20px" }}>
      <Row align="center" style={{ marginTop: "20px" }}>
        <FaCircleUser style={{ color: "white", marginTop: 8 }} size={100} />
      </Row>
      <Row
        align="center"
        style={{ marginTop: "20px", marginBottom: "20px", fontSize: "30px", color: "white", textAlign: "center" }}
      >
        {i18n.language == "es" ? "¡" : ""}{t("hello")}, {username}!
      </Row>
      <MenuItemTop>
        <FaStar style={{ marginRight: "10px" }} /> {t("favorite_searches")}
      </MenuItemTop>
      <MenuItem
        onClick={async () => {
          await deleteAllHistory();
        }}
      >
        <FaTrash style={{ marginRight: "10px" }} /> {t("clean_history")}
      </MenuItem>
      <MenuItemBottom
        onClick={async () => {
          await logout();
          window.location.reload();
        }}
      >
        <IoLogOut style={{ marginRight: "10px" }} /> {t("logout")}
      </MenuItemBottom>
    </div>
  );
};
