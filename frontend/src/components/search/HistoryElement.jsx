import deleteHistoryItem from "../../api/history.api";
import COLORS from "../../colors";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

const HistoryElement = ({ id, query }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: COLORS.white,
        fontSize: '16px',
        width: '100%', 
        marginTop: '25px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SearchOutlined style={{ color: COLORS.gray, paddingRight: "15px" }} />
        {query}
      </div>
      <CloseOutlined style={{ color: COLORS.gray, paddingLeft: "15px", cursor: "pointer" }} onClick={() => {deleteHistoryItem(id)}}/>
    </div>
  );
};

export default HistoryElement;
