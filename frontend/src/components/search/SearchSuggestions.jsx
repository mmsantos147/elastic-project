import { Divider } from "antd";
import COLORS from "../../colors";
import SuggestionElement from "./SuggestionElement";

const SearchSuggestions = ({ visible, suggestions }) => {

  if (!visible || suggestions.length === 0) return null;

  const historyStyle = {
    width: "100%",
    display: "block",
    backgroundColor: "rgb(48, 49, 52)",
    zIndex: "9999",
    position: "absolute",
    textAlign: "left",
    padding: "20px",
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
        }}
      >
        Pesquisas sugeridas
      </Divider>
      {suggestions.map((query) => (
        <SuggestionElement query={query} />
      ))}
    </div>
  );
};

export default SearchSuggestions;
