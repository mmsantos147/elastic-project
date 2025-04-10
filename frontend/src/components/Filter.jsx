import React from "react";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { createGlobalStyle } from "styled-components";
import COLORS from "../colors";

const GlobalDropdownStyle = createGlobalStyle`
  .ant-dropdown-menu {
    background-color: #333333 !important;
    color: #ffffff;
    border-radius: 0px 0px 8px 8px!important;
  }
  
  .ant-dropdown-menu-item {
    color: #ffffff !important;
  }
  
  .ant-dropdown-menu-item:hover {
    background-color: #444444 !important;
  }
  
  .ant-dropdown-menu-item-divider {
    border-color: ${COLORS.white} !important;
    margin: 4px 0 !important;
  }

  .ant-dropdown-menu-item-selected {
    background-color:rgb(65, 65, 65) !important;
  }
`;

const Filter = ({ name, items, selectedKeys, onMenuClick }) => {
  return (
    <>
      <GlobalDropdownStyle />
      <Dropdown menu={{ items, selectedKeys, onMenuClick }} trigger={["click"]}>
        <a href="#" onClick={(e) => e.preventDefault()}>
          <Space style={{ color: COLORS.gray }}>
            {name}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

export default Filter;
