import { Input } from "antd";
import "react-simple-keyboard/build/css/index.css";
import { SearchOutlined } from "@ant-design/icons";
import { FaKeyboard } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import COLORS from "../../colors";
import styled from "styled-components";
import { useSearchService } from "../../api/Search.api";
import { useTranslation } from "react-i18next";
import { VirtualKeyboard } from "./VirtualKeyboard";
import { SearchBarExtension } from "./extension/SearchBarExtension";
import { useSearchBarData } from "../../context/SearchBarContext";

const StyledInput = styled(Input)`
  ::placeholder {
    color: #9aa0a6;
  }
  &&.ant-input-affix-wrapper:focus,
  &&.ant-input-affix-wrapper-focused {
    box-shadow: none;
    outline: none;
    border-color: transparent;
  }

  && input:focus {
    box-shadow: none;
    outline: none;
  }
`;

const ResponsiveContainer = styled.div`
  width: 100%;
  max-width: 730px;
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: auto;
  }
`;


const SearchBar = ({ className, children, onEnterEvent, initialSearch }) => {
  const { extensionVisible, inputValue, setInputValue, setInputOnFocus } =
    useSearchBarData();
  const { t } = useTranslation();

  const [showKeyboard, setShowKeyboard] = useState(false);

  const inputRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    setInputValue(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInputOnFocus(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ResponsiveContainer
      className={className}
      ref={inputRef}
      onClick={() => setInputOnFocus(true)}
    >
      <StyledInput
        onPressEnter={(e) => {
          onEnterEvent(e.target.value);
          e.target.blur();
        }}
        size={isMobile ? "middle" : "large"}
        placeholder={t("search_default")}
        value={inputValue}
        prefix={
          <SearchOutlined
            style={{
              color: COLORS.gray,
              paddingLeft: isMobile ? "5px" : "7px",
              marginRight: isMobile ? "5px" : "10px",
              fontSize: isMobile ? "16px" : "18px",
            }}
          />
        }
        suffix={
          <>
            <FaKeyboard
              style={{
                color: "#9aa0a6",
                paddingRight: isMobile ? "5px" : "7px",
                fontSize: isMobile ? "18px" : "25px",
                marginLeft: isMobile ? "5px" : "10px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowKeyboard(!showKeyboard);
              }}
            />
          </>
        }
        onChange={(e) => {
          setInputValue(e.target.value);
          updateSugestions(e.target.value);
        }}
        style={{
          borderRadius: extensionVisible ? "20px 20px 0 0" : "999px",
          backgroundColor: "#303134",
          color: "#e8eaed",
          border: "0px",
          padding: isMobile ? "5px" : "10px",
          transition: "none",
        }}
      />

      <SearchBarExtension />

      {children}

      {showKeyboard && <VirtualKeyboard />}
    </ResponsiveContainer>
  );
};

export default SearchBar;
