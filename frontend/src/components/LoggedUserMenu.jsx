import React, { forwardRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Row } from "antd";
import COLORS from "../colors";
import styled from "styled-components";

const MenuItem = styled(Row)`
  padding: 15px;
  background-color: rgb(31, 31, 31);
  margin-top: 10px;
  color: ${COLORS.white};
  text-decoration: none;

  &:hover {
    background-color: rgba(31, 31, 31, 0.47);
    cursor: pointer;
  }
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

export const LoggedUserMenu = forwardRef(({ visible, username, onClose }, ref) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: "55px",
        right: "10px",
        backgroundColor: "rgb(23, 23, 23)",
        zIndex: 9999999,
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "300px",
        height: "400px",
      }}
    >
      <Row align="center" style={{ marginTop: "20px" }}>
        <FaCircleUser style={{ color: "white", marginTop: 8 }} size={110} />
      </Row>
      <Row
        align="center"
        style={{
          color: COLORS.white,
          marginTop: "10px",
          fontSize: "30px",
          marginBottom: "20px",
        }}
      >
        Olá, {username}!
      </Row>

      <MenuItemTop>
        <FaStar style={{ marginRight: "10px" }} /> Favoritos
      </MenuItemTop>

      <MenuItem>
        <FaTrash style={{ marginRight: "10px" }} /> Limpar histórico
      </MenuItem>

      <LinkNoUnderline to="/logout">
        <MenuItemBottom>
          <IoLogOut style={{ marginRight: "10px" }} /> Deslogar
        </MenuItemBottom>
      </LinkNoUnderline>
    </div>,
    document.body
  );
});
