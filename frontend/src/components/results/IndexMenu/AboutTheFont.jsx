import { Typography } from "antd";
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
  return (
    <>
      <SectionTitle>Sobre a fonte</SectionTitle>
      <SiteTitle>
        Wikipédia
      </SiteTitle>
      <Paragraph>Site</Paragraph>
      <SectionDescription>
        A Wikipédia é uma enciclopédia online colaborativa e gratuita, criada em
        2001. É mantida pela Fundação Wikimedia e escrita por voluntários ao
        redor do mundo. Qualquer pessoa com acesso à internet pode editar seus
        artigos. Está disponível em diversos idiomas e cobre uma ampla variedade
        de assuntos. Seu conteúdo é baseado em fontes confiáveis e políticas de
        verificabilidade. É uma das maiores e mais acessadas fontes de
        informação da internet.
      </SectionDescription>
    </>
  );
};
