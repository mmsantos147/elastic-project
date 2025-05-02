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

const SearchBar = ({ className, children, onEnterEvent, initialSearch }) => {
  const { searchAsYouType } = useSearchService();
  const [historyContent, setHistoryContent] = useState([]);
<<<<<<< HEAD

  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const interactionModeRef = useRef("mouse");
=======
>>>>>>> parent of 0c659e7d (feat: add select with keys)

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [inputValue, setInputValue] = useState(initialSearch || "");
  const [extensionVisible, setextensionVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const inputRef = useRef(null);
  const keyboardRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setextensionVisible(false);
      }
<<<<<<< HEAD
    };
=======
    }
>>>>>>> parent of 0c659e7d (feat: add select with keys)
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    const handleMouseMove = () => {
      interactionModeRef.current = "mouse";
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const hasSuggestions = extensionVisible && suggestions.length > 0;
      const hasHistory =
        extensionVisible &&
        inputValue.length === 0 &&
        historyContent.length > 0;

      if (!hasSuggestions && !hasHistory) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          interactionModeRef.current = "keyboard";
          setHighlightedIndex((prev) => {
            const maxIndex = hasSuggestions
              ? suggestions.length - 1
              : historyContent.length - 1;
            return prev < maxIndex ? prev + 1 : 0;
          });
          break;

        case "ArrowUp":
          e.preventDefault();
          interactionModeRef.current = "keyboard";
          setHighlightedIndex((prev) => {
            const minIndex = hasSuggestions || hasHistory ? 0 : -1;
            return prev > minIndex ? prev - 1 : -1;
          });
          break;

        case "Enter":
          const hasSuggestions = extensionVisible && suggestions.length > 0;
          const hasHistory =
            extensionVisible &&
            inputValue.length === 0 &&
            historyContent.length > 0;

          let valueToUse = inputValue;

          if (hasSuggestions && highlightedIndex >= 0) {
            valueToUse = suggestions[highlightedIndex];
          } else if (hasHistory && highlightedIndex >= 0) {
            valueToUse = historyContent[highlightedIndex].content;
          }

          setInputValue(valueToUse);
          onEnterEvent(valueToUse);

          setextensionVisible(false);
          setSuggestions([]);
          setHighlightedIndex(-1);
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [suggestions, historyContent, extensionVisible, inputValue]);

=======
>>>>>>> parent of 0c659e7d (feat: add select with keys)
  const updateSugestions = async (value) => {
    const response = await searchAsYouType({ query: value });
    console.log(response);
    setSuggestions(response.suggestions);
  };

  const borderRadius =
    extensionVisible && (historyContent.length > 0 || suggestions.length > 0)
      ? "30px 30px 0 0"
      : "999px";

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
      onClick={() => setextensionVisible(true)}
    >
      <StyledInput
        onPressEnter={(e) => {
          const hasSuggestions = extensionVisible && suggestions.length > 0;
          const hasHistory =
            extensionVisible &&
            inputValue.length === 0 &&
            historyContent.length > 0;

          let valueToUse = e.target.value;

          if (hasSuggestions && highlightedIndex >= 0) {
            valueToUse = suggestions[highlightedIndex];
          }

          if (hasHistory && highlightedIndex >= 0) {
            valueToUse = historyContent[highlightedIndex].content;
          }

          setInputValue(valueToUse);
          onEnterEvent(valueToUse);

          e.target.blur();
          setextensionVisible(false);
          setSuggestions([]);
<<<<<<< HEAD
          setHighlightedIndex(-1);
=======
        }}
        size="large"
        placeholder={t("search_default")}
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
                marginLeft: "10px"
              }}
              onClick={() => setShowKeyboard(!showKeyboard)}
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
          padding: "10px",
          transition: "none",
>>>>>>> parent of 0c659e7d (feat: add select with keys)
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

      <SearchSuggestions
        visible={extensionVisible && suggestions.length > 0}
        suggestions={suggestions}
        highlightedIndex={highlightedIndex}
        onHover={(index) => {
          if (interactionModeRef.current === "mouse") {
            setHighlightedIndex(index);
          }
        }}
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
              keyboardRef={(r) => (keyboardRef.current = r)}
              onKeyPress={(button) => {
                if (button === "{bksp}") {
                  setInputValue((prev) => prev.slice(0, -1));
                } else if (button === "{space}") {
                  setInputValue((prev) => prev + " ");
                } else if (button.startsWith("{")) {
                } else {
                  setInputValue((prev) => prev + button);
                }
              }}
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
