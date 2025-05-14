import { Button, Col, Row, Typography } from "antd";
import {
  CloseOutlined,
  RightOutlined,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";
import wikipediaLogo from "../../../assets/wikipedia_icon.png";
import styled from "styled-components";
import { useSearchData } from "../../../context/SearchContext";
import { ApplyHighlighter } from "../ApplyHighlighter";

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
`;

const ImageLogo = styled.img`
  width: 40px;
  margin-right: 15px;
`;

export const IndexResultMenu = () => {
  const { setIsIndexMenuOpen, indexMenuContent } = useSearchData();

  return (
    <>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <ImageLogo src={wikipediaLogo} />
        <Text style={{ fontSize: "18px" }}>Wikipédia</Text>
        <Col flex="auto" />
        <CloseOutlined
          style={{ fontSize: "20px" }}
          onClick={() => {
            setIsIndexMenuOpen(false);
          }}
        />
      </Row>

      <Row
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Text style={{ fontSize: "22px" }}>
          <ApplyHighlighter text={indexMenuContent.title} />
        </Text>
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
        <ApplyHighlighter text={indexMenuContent.content} />
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
