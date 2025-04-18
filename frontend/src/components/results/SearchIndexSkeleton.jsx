import { Skeleton, Row, Col } from "antd";
import { FaCalendar, FaClock } from "react-icons/fa";
import styled from "styled-components";



const SearchIndexSkeleton = () => {
  return (
      <div style={{ marginBottom: "50px", width: "100%" }}>
        <Row style={{ marginBottom: "7px" }}>
          <Col>
            <Skeleton.Avatar
              active
              shape="square"
              size={50}
              style={{ marginRight: "10px", borderRadius: "30px" }}
            />
          </Col>
          <Col>
            <Row style={{ marginBottom: "3px", fontSize: "16px" }}>
              <Skeleton.Input style={{ width: 120 }} active size="small" />
            </Row>
            <Row style={{ marginBottom: "6px", fontSize: "12px" }}>
              <Skeleton.Input style={{ width: 200 }} active size="small" />
            </Row>
          </Col>
        </Row>

        <Row>
          <Skeleton paragraph={{ rows: 3 }} active />
        </Row>

        <Row style={{ marginTop: 10 }}>
          <Col style={{ fontSize: "15px" }}>
            <FaCalendar
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            <Skeleton.Input style={{ width: 80 }} active size="small" />
          </Col>
          <Col flex="auto" />
          <Col style={{ fontSize: "15px" }}>
            <FaClock style={{ verticalAlign: "middle", marginRight: "8px" }} />
            <Skeleton.Input style={{ width: 100 }} active size="small" />
          </Col>
        </Row>
      </div>
  );
};

export default SearchIndexSkeleton;
