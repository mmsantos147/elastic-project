import { Button, Col, Row, Typography } from "antd";
import {
  CloseOutlined,
  RightOutlined,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";
import wikipediaLogo from "../../../assets/wikipedia_icon.png";
import styled from "styled-components";

const { Text, Paragraph } = Typography;

const OptionButton = styled(Button)`
  padding: 18px;
  border-radius: 10px;
  box-shadow: none;
`;

const IndexResume = styled(Paragraph)`
  text-align: justify;
  line-height: 21px;
  font-size: 14px;
  margin-bottom: 20px !important;
`

const ImageLogo = styled.img`
  width: 40px; 
  margin-right: 15px;
`

export const IndexResultMenu = () => {
  return (
    <>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <ImageLogo src={wikipediaLogo}/>
        <Text style={{ fontSize: "18px" }}>Wikipédia</Text>
        <Col flex="auto" />
        <CloseOutlined style={{ fontSize: "20px" }} />
      </Row>

      <Row
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Text style={{ fontSize: "22px" }}>Título da página</Text>
        <Col flex="auto" />
        <Button
          type="primary"
          style={{
            padding: "18px",
            borderRadius: "999px",
            boxShadow: "none",
          }}
        >
          <strong>Visitar o site</strong> <RightOutlined />
        </Button>
      </Row>

      <IndexResume>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod debitis
        ea mollitia ullam accusamus dolorum quibusdam modi, voluptatibus totam,
        et corrupti? In corporis non ut. Cum mollitia sed itaque modi. Lorem
        ipsum, dolor sit amet consectetur adipisicing elit. Fugiat voluptatibus
        nobis...
      </IndexResume>

      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <OptionButton>
          <ShareAltOutlined /> Compartilhar
        </OptionButton>
        <OptionButton>
          <StarOutlined /> Salvar resultado
        </OptionButton>
        <OptionButton>Denunciar resultado</OptionButton>
        <OptionButton>Feedback</OptionButton>
      </Row>
    </>
  );
};
