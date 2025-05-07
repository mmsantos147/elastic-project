import { Input } from "antd";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { SearchOutlined } from "@ant-design/icons";
import { FaKeyboard } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import SearchHistory from "./SearchHistory";
import COLORS from "../../colors";
import Draggable from "react-draggable";
import styled from "styled-components";
import { useSearchService } from "../../api/Search.api";
import SearchSuggestions from "./SearchSuggestions";
import { useTranslation } from "react-i18next";

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

const KeyboardWrapper = styled.div`
  margin-top: 10px;
  position: absolute;
  z-index: 99999;
  width: 100%;
  max-width: 600px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    left: 0;
    right: 0;
  }
  
  @media (max-width: 480px) {
    .hg-button {
      height: 30px;
      font-size: 12px;
    }
  }
`;

const SearchBar = ({ className, children, onEnterEvent, initialSearch }) => {
  const { searchAsYouType } = useSearchService();
  const [historyContent, setHistoryContent] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [inputValue, setInputValue] = useState(initialSearch || "");
  const [extensionVisible, setextensionVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const inputRef = useRef(null);
  const keyboardRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    setInputValue(initialSearch)
  }, [initialSearch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setextensionVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (windowWidth < 480 && showKeyboard) {
      setShowKeyboard(false);
    }
  }, [windowWidth]);

  const updateSugestions = async (value) => {
    const response = await searchAsYouType({ query: value });
    if (!response.error)
      setSuggestions(response.suggestions);
  };

  const borderRadius =
    extensionVisible && (historyContent.length > 0 || suggestions.length > 0)
      ? "30px 30px 0 0"
      : "999px";

  const getInputSize = () => {
    return windowWidth <= 480 ? "middle" : "large";
  };

  return (
    <ResponsiveContainer
      className={className}
      ref={inputRef}
      onClick={() => setextensionVisible(true)}
    >
      <StyledInput
        onPressEnter={(e) => {
          onEnterEvent(e.target.value);
          e.target.blur();
          setextensionVisible(false);
          setSuggestions([]);
        }}
        size={getInputSize()}
        placeholder={t("search_default")}
        value={inputValue}
        prefix={
          <SearchOutlined
            style={{
              color: COLORS.gray,
              paddingLeft: windowWidth <= 480 ? "5px" : "7px",
              marginRight: windowWidth <= 480 ? "5px" : "10px",
              fontSize: windowWidth <= 480 ? "16px" : "18px",
            }}
          />
        }
        suffix={
          <>
            <FaKeyboard
              style={{
                color: "#9aa0a6",
                paddingRight: windowWidth <= 480 ? "5px" : "7px",
                fontSize: windowWidth <= 480 ? "18px" : "25px",
                marginLeft: windowWidth <= 480 ? "5px" : "10px",
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
          borderRadius,
          backgroundColor: "#303134",
          color: "#e8eaed",
          border: "0px",
          padding: windowWidth <= 480 ? "5px" : "10px",
          transition: "none",
        }}
      />

      <SearchHistory
        visible={
          extensionVisible && inputValue.length == 0 && suggestions.length == 0
        }
        historyContent={historyContent}
        setHistoryContent={setHistoryContent}
      />

      <SearchSuggestions
        visible={extensionVisible && suggestions.length > 0}
        suggestions={suggestions}
      />

      {children}

      {showKeyboard && (
        <Draggable nodeRef={keyboardRef} bounds="parent">
          <KeyboardWrapper ref={keyboardRef}>
            <Keyboard
              keyboardRef={(r) => (keyboardRef.current = r)}
              onKeyPress={(button) => {
                if (button === "{bksp}") {
                  setInputValue((prev) => prev.slice(0, -1));
                } else if (button === "{space}") {
                  setInputValue((prev) => prev + " ");
                } else if (button.startsWith("{")) {
                  // Ignore other special keys
                } else {
                  setInputValue((prev) => prev + button);
                }
              }}
              theme={"hg-theme-default myTheme"}
              layoutName="default"
              display={{
                '{bksp}': windowWidth <= 480 ? '⌫' : 'backspace',
                '{enter}': windowWidth <= 480 ? '↵' : 'enter',
                '{space}': windowWidth <= 480 ? '□' : 'space',
              }}
            />
          </KeyboardWrapper>
        </Draggable>
      )}
    </ResponsiveContainer>
  );
};

export default SearchBar;