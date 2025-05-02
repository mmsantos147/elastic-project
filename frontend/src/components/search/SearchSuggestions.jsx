import { Divider } from "antd";
import COLORS from "../../colors";
import SuggestionElement from "./SuggestionElement";
import SearchButtonExtension from "./SearchButtonExtension";
import { useTranslation } from "react-i18next";

const SearchSuggestions = ({
  visible,
  suggestions,
  highlightedIndex,
  onHover,
}) => {
  const { t } = useTranslation();

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
        {t("search_suggested")}
      </Divider>
      {suggestions.map((query, index) => (
        <SuggestionElement
          key={query}
          query={query}
          isSelected={index === highlightedIndex}
          onMouseEnter={() => onHover(index)}
        />
      ))}

      <SearchButtonExtension />
    </div>
  );
};

export default SearchSuggestions;
