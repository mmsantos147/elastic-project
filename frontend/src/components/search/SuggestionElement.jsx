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
  background-color: ${({ highlighted }) => highlighted ? "rgb(44, 44, 44)" : "transparent"};
  cursor: pointer;
  border-radius: ${({ highlighted }) => highlighted ? "5px" : "0"};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgb(44, 44, 44);
    border-radius: 5px;
  }
`;

const SuggestionContent = styled.div`
  display: flex;
  align-items: center;
`;

const SuggestionElement = ({ query }) => {
    const navigate = useNavigate();
    return (
    <SuggestionWrapper onClick={() => {navigate(`/search?q=${query}`)}}> 
      <SuggestionContent>
        <SearchOutlined style={{ color: COLORS.gray, paddingRight: "15px" }} />
        {query}
      </SuggestionContent>
    </SuggestionWrapper>
  );
};

export default SuggestionElement;
