import { Typography, Divider } from "antd";
import { Content } from "antd/es/layout/layout";

import COLORS from "../../../colors";
import { IndexResultMenu } from "./IndexResultMenu";
import { AboutTheFont } from "./AboutTheFont";
import { WhyIndexed } from "./WhyIndexed";
import styled from "styled-components";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

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
  max-height: calc(100vh + 30px);
  overflow-y: auto;
`

const SideMenuFooter = styled(Paragraph)`
    color: ${COLORS.gray}
`

const DividerInformation = styled.div`
    background-color: rgba(242,234,218,0.11);
    padding: 10px 100px 10px 100px;
    border-radius: 20px;
`

const DividerMarginBottom = styled(Divider)`
    margin-bottom: 30px;
`

const TitleParagraph = styled(Paragraph)`
    font-size: 20px;
`

export const IndexMenu = () => {
  const { t } = useTranslation();
    
  return (
    <SideMenu>
      <IndexResultMenu />

      <DividerMarginBottom />

      <AboutTheFont />

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
