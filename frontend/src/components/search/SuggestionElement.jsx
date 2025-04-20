import COLORS from "../../colors";
import { SearchOutlined } from "@ant-design/icons";

const SuggestionElement = ({ query }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: COLORS.white,
        fontSize: "16px",
        width: "100%",
        marginTop: "25px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchOutlined style={{ color: COLORS.gray, paddingRight: "15px" }} />
        {query}
      </div>
    </div>
  );
};

export default SuggestionElement;
