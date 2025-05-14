import { Col, Divider, Row, Typography } from "antd";
import {
  InfoCircleOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import COLORS from "../../../colors";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Paragraph } = Typography;

const WhyIndexModal = styled.div`
  background-color: rgb(36, 36, 36);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const WhyIndexList = styled.ul`
  padding-left: 14px;
  font-size: 15px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  color: ${COLORS.gray};
`;

const StyledLink = styled(Link)`
  color: ${COLORS.gray} !important;

  &:hover{ 
    color: rgb(127, 132, 138) !important;
    text-decoration: underline;
  }

`

const WhyIndexItem = styled.li`
  margin-left: 5px;
`;

const UnderlineDotted = styled.strong`
  text-decoration: underline dotted;
`;

export const WhyIndexed = () => {
  const { t } = useTranslation();
  
  return (
    <WhyIndexModal>
      <WhyIndexList>
        <WhyIndexItem>
          {t("these")}{" "}<UnderlineDotted>{t("search_terms")}</UnderlineDotted>{" "}{t("show_up_in_results")}: <strong>Lorem</strong>, <strong>ipsum</strong>,{" "}
          <strong>dolor</strong>
        </WhyIndexItem>
        <WhyIndexItem>
          {t("the_results_is_on")}{" "}
          <UnderlineDotted>{t("english_american")}</UnderlineDotted>
        </WhyIndexItem>
        <WhyIndexItem>
          {t("this_result_is_relevant_on")}{" "}
          <UnderlineDotted>{t("united_states")}</UnderlineDotted>
        </WhyIndexItem>
      </WhyIndexList>
      <Paragraph style={{ fontSize: "16px", marginBottom: "0px" }}>
        <StyledLink>
          <Row>
            <Col flex={"auto"}>
              <SearchOutlined
                style={{ margin: "0px 20px 0px 20px", fontSize: "19px" }}
              />
              <strong style={{ fontSize: "15px" }}>
                {t("how_search_works_question")}
              </strong>
            </Col>
            <Col>
              <RightOutlined />
            </Col>
          </Row>
        </StyledLink>
      </Paragraph>
      <Divider style={{ margin: "12px 0px 12px 0px" }} />
      <Paragraph style={{ fontSize: "16px", marginBottom: "0px" }}>
        <StyledLink to="/tips#">
          <Row>
            <Col flex={"auto"}>
              <InfoCircleOutlined
                style={{ margin: "0px 20px 0px 20px", fontSize: "19px" }}
              />
              <strong style={{ fontSize: "15px" }}>
                {t("tips_how_to_search")}
              </strong>
            </Col>
            <Col>
              <RightOutlined />
            </Col>
          </Row>
        </StyledLink>
      </Paragraph>
    </WhyIndexModal>
  );
};
