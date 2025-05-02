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
  transition: background-color 0.2s ease;
`;

const SuggestionContent = styled.div`
  display: flex;
  align-items: center;
`;

const SuggestionElement = ({ query, isSelected, onMouseEnter }) => {
  const navigate = useNavigate();
  return (
    <SuggestionWrapper
      onMouseEnter={onMouseEnter}
      style={{
        backgroundColor: isSelected ? "rgb(44, 44, 44)" : "transparent",
      }}
      onClick={() => {
        navigate(`/search?q=${query}`);
      }}
    >
      <SuggestionContent>
        <SearchOutlined style={{ color: COLORS.gray, paddingRight: "15px" }} />
        {query}
      </SuggestionContent>
    </SuggestionWrapper>
  );
};

export default SuggestionElement;
