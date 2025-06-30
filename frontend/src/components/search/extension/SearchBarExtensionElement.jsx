import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import COLORS from "../../../colors";

const ElementWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${COLORS.white};
  font-size: 16px;
  width: 100%;
  padding: 13px 20px 13px 20px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color:rgb(43,43,43);
    border-radius: 5px;
}
`;

const ElementContent = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchBarExtensionElement = ({ query, children }) => {
    return (
    <ElementWrapper onClick={() => {window.location.href=`/search?q=${query}`}}> 
      <ElementContent>
        <SearchOutlined style={{ color: COLORS.gray, paddingRight: "15px" }} />
        {query}
      </ElementContent>
      <ElementContent>
      {children}
      </ElementContent>
    </ElementWrapper>
  );
};