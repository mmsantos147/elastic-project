import { Button, Col, Divider, Row } from "antd";
import COLORS from "../../colors";
import SuggestionElement from "./SuggestionElement";
import SearchButtonExtension from "./SearchButtonExtension";

const SearchSuggestions = ({ visible, suggestions, highlightedIndex, setInputValue }) => {
  if (!visible || suggestions.length === 0) return null;

  const historyStyle = {
    width: "100%",
    display: "block",
    backgroundColor: "rgb(48, 49, 52)",
    zIndex: "9999",
    position: "absolute",
    textAlign: "left",
    borderRadius: "0 0 20px 20px",
  };

  return (
    <div style={historyStyle}>
      <Divider
        orientation="left"
        style={{
          marginTop: 0,
          borderColor: COLORS.gray,
          color: COLORS.gray,
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        Pesquisas sugeridas
      </Divider>
      {suggestions.map((query, index) => (
        <SuggestionElement query={query} key={index} isHighlighted={index === highlightedIndex} setInputValue={setInputValue} />
      ))}

      <SearchButtonExtension />
    </div>
  );
};

export default SearchSuggestions;
