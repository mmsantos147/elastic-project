import { Input } from "antd";
import "react-simple-keyboard/build/css/index.css";
import { SearchOutlined } from "@ant-design/icons";
import { FaKeyboard } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
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

const IconWrapper = styled.div`
  color: #9aa0a6;
  padding-left: ${(props) => (props.isMobile ? "5px" : "7px")};
  margin-right: ${(props) => (props.isMobile ? "5px" : "10px")};
  font-size: ${(props) => (props.isMobile ? "16px" : "18px")};
  cursor: pointer;
`;

const SearchBar = ({ className, children, onEnterEvent, initialSearch }) => {
  const { t } = useTranslation();
  const { extensionVisible, inputValue, setInputValue, setInputOnFocus } =
    useSearchBarData();
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
          e.target.blur();
          setInputOnFocus(false);
          onEnterEvent(e.target.value);
        }}
        size={isMobile ? "middle" : "large"}
        placeholder={t("search_default")}
        value={inputValue}
        prefix={
          <IconWrapper $isMobile={isMobile}>
            <SearchOutlined />
          </IconWrapper>
        }
        suffix={
          <IconWrapper $isMobile={isMobile}>
            <FaKeyboard
              onClick={(e) => {
                e.stopPropagation();
                setShowKeyboard(!showKeyboard);
              }}
            />
          </IconWrapper>
        }
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        style={{
          borderRadius: extensionVisible ? "16px 16px 0 0" : "999px",
          backgroundColor: "#303134",
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
