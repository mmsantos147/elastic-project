import { Col, Row } from "antd";
import UAISearch from "../UAISearch";
import { GrNext, GrPrevious } from "react-icons/gr";
import COLORS from "../../colors";

const PageSelect = ({ setFormData, searchSubmit }) => {
  return (
    <Row
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
        marginBottom: "50px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
          fontSize: "20px",
          fontWeight: "bold",
          display: "flex",
        }}
      >
        <UAISearch logoWidth={"200px"} />
      </div>

      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Col style={{ marginRight: "14px" }}>
          <GrPrevious />
        </Col>
        <Col style={{ marginRight: "14px" }}>
          <b>1</b>
        </Col>
        <Col
          style={{ marginRight: "14px", color: COLORS.purple, cursor: "pointer" }}
          onClick={() => {
            setFormData((prev) => ({ ...prev, page: 2 }));
            searchSubmit();
          }}
        >
          2
        </Col>
        <Col
          style={{ marginRight: "14px", color: COLORS.purple, cursor: "pointer" }}
          onClick={() => {
            setFormData((prev) => ({ ...prev, page: 3 }));
            searchSubmit();
          }}
        >
          3
        </Col>
        <Col
          style={{ marginRight: "14px", color: COLORS.purple, cursor: "pointer" }}
          onClick={() => {
            setFormData((prev) => ({ ...prev, page: 4 }));
            searchSubmit();
          }}
        >
          4
        </Col>
        <Col
          style={{ marginRight: "14px", color: COLORS.purple, cursor: "pointer" }}
          onClick={() => {
            setFormData((prev) => ({ ...prev, page: 5 }));
            searchSubmit();
          }}
        >
          5
        </Col>
        <Col>
          <GrNext />
        </Col>
      </Row>
    </Row>
  );
};

export default PageSelect;
