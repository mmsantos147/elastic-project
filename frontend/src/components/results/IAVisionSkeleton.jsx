import { Skeleton, Row, Col, Typography } from "antd";
import { BsStars } from "react-icons/bs";
import COLORS from "../../colors";

const { Title } = Typography;

const IAVisionAbstractSkeleton = (props) => {
  return (
    <div style={props.style}>
      <Row>
        <Col style={{ marginRight: "20px" }}>
          <BsStars style={{ color: COLORS.purple, fontSize: "30px" }} />
        </Col>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <b>Visão gerada por IA</b>
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
