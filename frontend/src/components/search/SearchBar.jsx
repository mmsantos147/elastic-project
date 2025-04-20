import { Input } from "antd";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { SearchOutlined } from "@ant-design/icons";
import { APP_NAME_CAMMEL_CASE } from "../../constants";
import { FaKeyboard, FaMicrophone } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import SearchHistory from "./SearchHistory";
import COLORS from "../../colors";
import Draggable from "react-draggable";
import styled from "styled-components";
import searchApi from "../../api/search.api";

const StyledInput = styled(Input)`
  ::placeholder {
    color: #9aa0a6;
  }
`;

const SearchBar = ({
  className,
  children,
  onEnterEvent,
  setSearchValue,
  initialSearch,
}) => {
  const [historyContent, setHistoryContent] = useState([]);

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [inputValue, setInputValue] = useState(initialSearch);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  const inputRef = useRef(null);
  const keyboardRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setHistoryVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateSugestions = async (value) => {
    const response = await searchApi.searchAsYouType({query: value})
    console.log(response)
    setSuggestions(response.suggestions)
  }

  const borderRadius =
    historyVisible && historyContent.length > 0 ? "30px 30px 0 0" : "999px";

  return (
    <div
      className={className}
      ref={inputRef}
      style={{
        width: "100%",
        maxWidth: "730px",
        minWidth: "600px",
        position: "relative",
      }}
      onClick={() => setHistoryVisible(true)}
    >
      <StyledInput
        onPressEnter={(e) => onEnterEvent(e.target.value)}
        size="large"
        placeholder={`Pesquise no ${APP_NAME_CAMMEL_CASE} ou digite uma URL`}
        value={inputValue}
        prefix={
          <SearchOutlined
            style={{
              color: COLORS.gray,
              paddingLeft: "7px",
              marginRight: "10px",
            }}
          />
        }
        suffix={
          <>
            <FaKeyboard
              style={{
                color: "#9aa0a6",
                paddingRight: "7px",
                fontSize: "25px",
              }}
              onClick={() => setShowKeyboard(!showKeyboard)}
            />
            <FaMicrophone
              style={{
                color: "#9aa0a6",
                paddingRight: "10px",
                fontSize: "22px",
              }}
            />
          </>
        }
        onChange={(e) => {
          setInputValue(e.target.value);
          setSearchValue(e.target.value);
          updateSugestions(e.target.value);
        }}
        style={{
          borderRadius,
          backgroundColor: "#303134",
          color: "#e8eaed",
          border: "0px",
          padding: "10px",
          transition: "none",
        }}
      />

      <SearchHistory
        visible={historyVisible}
        historyContent={historyContent}
        setHistoryContent={setHistoryContent}
      />

      {children}

      {showKeyboard && (
        <Draggable nodeRef={keyboardRef}>
          <div
            ref={keyboardRef}
            style={{
              marginTop: "10px",
              position: "absolute",
              zIndex: "99999",
              maxWidth: "600px",
              minWidth: "200px",
              width: "100%",
            }}
          >
            <Keyboard
              onChange={(input) => setInputValue(input)}
              theme={"hg-theme-default myTheme"}
              layoutName="default"
            />
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default SearchBar;
