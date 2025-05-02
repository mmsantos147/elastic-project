import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import COLORS from "../../colors";
import { useNavigate } from "react-router-dom";

const SuggestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${COLORS.white};
  font-size: 16px;
  width: 100%;
  padding: 8px 20px 15px 20px;
  background-color: transparent;
  cursor: pointer;

`;

const SuggestionContent = styled.div`
  display: flex;
  align-items: center;
`;

const SuggestionElement = ({ query, isSelected, onMouseEnter }) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      style={{
        padding: "8px 20px",
        backgroundColor: isSelected ? "#555" : "transparent",
        cursor: "pointer",
      }}
    >
      {query}
    </div>
  );
};

export default SuggestionElement;
