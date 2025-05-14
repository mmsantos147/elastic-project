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
import { useState } from "react";
import { ShareModal } from "./ShareModal";
import { useNavigate } from "react-router-dom";
import { useAuthData } from "../../../context/AuthContext";
import { useFavoriteSearch } from "../../../api/Favorite.api";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsIndexMenuOpen, indexMenuContent } = useSearchData();
  const { favoriteItem } = useFavoriteSearch();
  const { isLogged } = useAuthData();
  const [ modalOpen, setModalOpen ] = useState(false);

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
        <Text style={{ fontSize: "18px" }}>{t("wikipedia")}</Text>
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
          onClick={() => {window.location.href=indexMenuContent.url}}
        >
          <strong>{t("visit_the_site")}</strong> <RightOutlined />
        </Button>
      </Row>

      <IndexResume>
        <ApplyHighlighter text={indexMenuContent.content} /> ...
      </IndexResume>

      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <OptionButton onClick={() => {setModalOpen(true)}}>
          <ShareAltOutlined/>{t("share")}
        </OptionButton>
        <OptionButton onClick={() => {isLogged ? favoriteItem(indexMenuContent) : navigate("/login");}}>
          <StarOutlined/>{t("save_result")}
        </OptionButton>
        <OptionButton>{t("report_result")}</OptionButton>
        <OptionButton>{t("Feedback")}</OptionButton>
      </Row>

      <ShareModal open={modalOpen} setOpen={setModalOpen} url={indexMenuContent.url} />
    </>
  );
};
