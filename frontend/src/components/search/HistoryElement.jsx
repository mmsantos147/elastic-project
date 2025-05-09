import styled from "styled-components";
import COLORS from "../../colors";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const HistoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${COLORS.white};
  font-size: 16px;
  width: 100%;
  padding: 8px 20px 15px 20px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgb(44, 44, 44);
    border-radius: 5px;
  }
`;

const HistoryContent = styled.div`
  display: flex;
  align-items: center;
`;

const CloseIcon = styled(CloseOutlined)`
  color: ${COLORS.gray};
  padding-left: 15px;
  cursor: pointer;
`;

const HistoryElement = ({ id, query, deleteFromHistory }) => {
  const navigate = useNavigate();
  return (
    <HistoryWrapper
      onClick={() => {
        navigate(`/search?q=${query}`);
      }}
    >
      <HistoryContent>
        <SearchOutlined style={{ color: COLORS.gray, paddingRight: "15px" }} />
        {query}
      </HistoryContent>
      <CloseIcon onClick={() => deleteFromHistory(id)} />
    </HistoryWrapper>
  );
};

export default HistoryElement;
