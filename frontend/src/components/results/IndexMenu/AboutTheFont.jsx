import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";


const {Paragraph} = Typography;

const SectionTitle = styled(Paragraph)`
    font-size: 24px;
`

const SiteTitle = styled(Paragraph)`
    font-size: 20px;
    margin-bottom: 0px !important;
`

const SectionDescription = styled(Paragraph)`
    text-align: justify; 
    margin-bottom: 40px !important;
`

export const AboutTheFont = () => {
  const {t} = useTranslation();
  return (
    <>
      <SectionTitle>{t("about_the_font")}</SectionTitle>
      <SiteTitle>
        {t("wikipedia")}
      </SiteTitle>
      <Paragraph>{t("site")}</Paragraph>
      <SectionDescription>
        {t("wikipedia_description")}
      </SectionDescription>
    </>
  );
};
