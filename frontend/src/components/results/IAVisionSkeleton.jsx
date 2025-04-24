import { Skeleton, Row, Col, Typography } from "antd";
import { BsStars } from "react-icons/bs";
import COLORS from "../../colors";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const IAVisionAbstractSkeleton = (props) => {
  const { t } = useTranslation();
  
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
        </Title>
      </Row>

        <Row style={{ position: "relative" }}>
            <Skeleton paragraph={{ rows: 3 }} active />
        </Row>
    </div>
  );
};

export default IAVisionAbstractSkeleton;
