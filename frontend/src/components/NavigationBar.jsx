import { Row, Col, Button } from "antd";
import styled from "styled-components";
import COLORS from "../colors";


const NavLinks = styled.div`
  display: flex;
  gap: 24px;
  font-size: 14px;
  cursor: pointer;
  color: ${COLORS.gray};
  border-bottom: 3px solid ${COLORS.gray};
`;

const ToolsButton = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: ${COLORS.gray};
`;

const NavigationBar = ({ onClickShowTools }) => {
  return (
    <Row style={{ maxWidth: "700px", minWidth: "600px" }}>
      <Col>
        <NavLinks>Todos os resultados</NavLinks>
      </Col>
      <Col flex="auto" />
      <ToolsButton
        onClick={() => {
          onClickShowTools();
        }}
      >
        Ferramentas
      </ToolsButton>
    </Row>
  );
};

export default NavigationBar;
