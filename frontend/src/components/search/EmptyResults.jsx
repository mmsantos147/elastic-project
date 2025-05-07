import React from "react";
import { Col, Divider, Row, Grid } from "antd";
import { MdOutlineSearchOff } from "react-icons/md";
import COLORS from "../../colors";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const { useBreakpoint } = Grid;

const SuggestionLink = styled.a`
  display: flex;
  align-items: center;
  color: ${COLORS.white};
  text-decoration: none;
  cursor: pointer;

  span {
    transition: all 0.3s ease;
  }

  &:hover span {
    text-decoration: underline;
    text-decoration-color: ${COLORS.blue};
  }
`;

const EmptyResults = () => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  
  const isMobile = !screens.md;
  
  return (
    <>
      <Row gutter={[16, 16]} align="top">
        <Col xs={24} sm={24} md={4} lg={3} style={{ marginBottom: isMobile ? "20px" : "0" }}>
          <div
            style={{
              width: isMobile ? "50px" : "60px",
              height: isMobile ? "50px" : "60px",
              backgroundColor: "#fef7e0",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: isMobile ? "0 auto" : "0",
            }}
          >
            <MdOutlineSearchOff size={isMobile ? 25 : 30} color="#f9ab00" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={20} lg={21}>
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <h2 style={{ fontSize: isMobile ? "1.3rem" : "1.5rem" }}>
              {t('your_search_dont_find_any_docs')}
            </h2>
            <p>
              <strong>{t('need_help_ask')}</strong> {t("check_out_other")} <a href="/tips"> {t("tips")} </a> {t("to_search_on_brand")}.
            </p>
          </div>
          
          <Row style={{ marginTop: "30px", textAlign: isMobile ? "center" : "left" }}>
            {t("you_can_try_these_searches")}:
          </Row>
          <Divider style={{ borderColor: COLORS.gray }}/>
          
          {/* Suggestion links */}
          {[
            "Square root",
            "Quantum mechanics",
            "Math",
            "Quadratic equation",
            "Optics",
            "Atomic models",
            "Newton's laws",
            "Exponential function"
          ].map((suggestion, index) => (
            <React.Fragment key={index}>
              <Row align="middle" style={{ display: "flex" }}>
                <SuggestionLink 
                  style={{
                    color: COLORS.white,
                    width: "100%",
                    justifyContent: isMobile ? "center" : "flex-start"
                  }} 
                  href={`/search?q=${encodeURIComponent(suggestion)}`}
                >
                  <SearchOutlined 
                    style={{
                      fontSize: "20px", 
                      marginRight: "20px", 
                      marginLeft: isMobile ? "0" : "30px"
                    }} 
                  /> 
                  <span>{suggestion}</span>
                </SuggestionLink>
              </Row>
              <Divider 
                style={{ 
                  borderColor: COLORS.gray,
                  marginBottom: index === 7 ? "150px" : undefined 
                }}
              />
            </React.Fragment>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default EmptyResults;