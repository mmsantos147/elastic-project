import { Row, Col } from "antd";
import styled from "styled-components";
import COLORS from "../colors";
import { useTranslation } from "react-i18next";


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
  const { t } = useTranslation()
  
  return (
    <Row style={{ maxWidth: "730px", minWidth: "600px" }}>
      <Col>
        <NavLinks>{t("all_results")}</NavLinks>
      </Col>
      <Col flex="auto" />
      <ToolsButton
        onClick={() => {
          onClickShowTools();
        }}
      >
        {t("tools")}
      </ToolsButton>
    </Row>
  );
};

export default NavigationBar;
