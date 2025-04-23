import { useState } from "react";
import { Col, Row, Typography, Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { BsStars } from "react-icons/bs";
import COLORS from "../../colors";
import IAVisionAbstract from "./IAVisionAbstract";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const IAVision = (props) => {
  const { t } = useTranslation();
  
  const [expanded, setExpanded] = useState(false);
  const { aiAbstract } = props;
  return (
    <div style={props.style}>
      <Row>
        <Col style={{ marginRight: "20px" }}>
          <BsStars style={{ color: COLORS.purple, fontSize: "30px" }} />
        </Col>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <b>{t("artificial_intelligence_vision")}</b>
        </Col>
      </Row>

      <Row style={{ marginTop: "20px", marginBottom: "10px" }}>
        <Title level={4} style={{ color: COLORS.white }}>
          {aiAbstract.title}
        </Title>
      </Row>

      <div
        style={{
          position: "relative",
          maxHeight: expanded ? "none" : "180px",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <Row style={{ position: "relative" }}>
          {aiAbstract.paragraphs.map((paragraph) => (
            <IAVisionAbstract href={paragraph.url}>
              {paragraph.content}
            </IAVisionAbstract>
          ))}
        </Row>

        {!expanded && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "150px",
              background: `linear-gradient(
                to bottom,
                rgba(32, 33, 36, 0.1) 0%,   
                rgba(32, 33, 36, 0.95) 85%,  
                rgb(32, 33, 36) 100%        
              )`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      <Button
        type="link"
        onClick={() => setExpanded((prev) => !prev)}
        style={{
          color: COLORS.purple,
          marginTop: "5px",
          paddingLeft: 0,
          border: `1px ${COLORS.purple} solid`,
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "40px",
        }}
      >
        {expanded ? (
          <>
            {t("show_less")} <UpOutlined />
          </>
        ) : (
          <>
            {t("show_more")} <DownOutlined />
          </>
        )}
      </Button>
    </div>
  );
};

export default IAVision;
