import { Divider } from "antd";
import HistoryElement from "./HistoryElement";
import COLORS from "../../colors";
import { useEffect } from "react";
import historyApi from "../../api/history.api";
import SearchButtonExtension from "./SearchButtonExtension";
import { useTranslation } from "react-i18next";

const SearchHistory = ({ visible, historyContent, setHistoryContent }) => {
  const { t } = useTranslation();
  
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await historyApi.fetchHistory();
        setHistoryContent(data);
      } catch {
        setHistoryContent([]);
      }
    };
    loadHistory();
  }, [setHistoryContent]);

  const deleteFromHistory = async (id) => {
    setHistoryContent((prev) => prev.filter((item) => item.id !== id));
    try {
      await historyApi.deleteItemFromHistory(id);
    } catch {
      setHistoryContent([]);
    }
  };

  if (!visible || historyContent.length === 0) return null;

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
        {t("recent_searches")}
      </Divider>
      {historyContent.map((query) => (
        <HistoryElement
          key={query.id}
          id={query.id}
          query={query.content}
          deleteFromHistory={deleteFromHistory}
        />
      ))}
      <SearchButtonExtension />
    </div>
  );
};

export default SearchHistory;
