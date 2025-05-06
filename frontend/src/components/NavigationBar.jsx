import { Row, Col } from "antd";
import styled from "styled-components";
import COLORS from "../colors";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const NavLinks = styled.div`
  display: flex;
  gap: 24px;
  font-size: 14px;
  cursor: pointer;
  color: ${COLORS.gray};
  border-bottom: 3px solid ${COLORS.gray};

  @media (max-width: 768px) {
    font-size: 13px;
    gap: 16px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    gap: 12px;
  }
`;

const ToolsButton = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: ${COLORS.gray};

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ResponsiveRow = styled(Row)`
  max-width: 730px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    min-width: auto;
    width: 100%;
  }
`;

const NavigationBar = ({ onClickShowTools }) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <ResponsiveRow>
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
    </ResponsiveRow>
  );
};

export default NavigationBar;