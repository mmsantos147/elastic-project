import { Typography, Divider } from "antd";
import { Content } from "antd/es/layout/layout";
import COLORS from "../../../colors";
import { IndexResultMenu } from "./IndexResultMenu";
import { AboutTheFont } from "./AboutTheFont";
import { WhyIndexed } from "./WhyIndexed";
import styled from "styled-components";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { GraphModal } from "../../graph/GraphModal";
import { useMediaQuery } from "react-responsive";

const { Paragraph } = Typography;

const SideMenu = styled(Content)`
  padding: 25px;
  background: rgba(0, 0, 0, 0.14);
  border-radius: 40px;
  max-width: 800px;
  margin: 50px;
  position: sticky;
  top: 30px;
  align-self: flex-start;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 20px;
    max-width: 100%;
    margin: 15px;
    width: calc(100% - 30px);
  }
`;

const SideMenuFooter = styled(Paragraph)`
  color: ${COLORS.gray}
`;

const DividerInformation = styled.div`
  background-color: rgba(242,234,218,0.11);
  padding: 10px 100px 10px 100px;
  border-radius: 20px;
  
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const DividerMarginBottom = styled(Divider)`
  margin-bottom: 30px;
`;

const TitleParagraph = styled(Paragraph)`
  font-size: 20px;
`;

export const IndexMenu = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <SideMenu>
      <IndexResultMenu />
      <DividerMarginBottom />
      <AboutTheFont />
      <DividerMarginBottom>
        <DividerInformation>
          {t("results_mapping")}
        </DividerInformation>
      </DividerMarginBottom>
      <div style={{
        width: "100%", 
        height: isMobile ? "300px" : "500px", 
        border: "1px solid white", 
        borderRadius: "10px",
        display: "block",
        position: "relative"
      }}>
        <GraphModal />
      </div>
      <DividerMarginBottom>
        <DividerInformation>
          {t("more_information")}
        </DividerInformation>
      </DividerMarginBottom>
      <TitleParagraph>
        {t("your_search_about_this_result")}
      </TitleParagraph>
      <WhyIndexed />
      <SideMenuFooter>
        {t("this_result_is_not_an_ad")}
      </SideMenuFooter>
    </SideMenu>
  );
};
