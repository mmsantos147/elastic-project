import { Col, Row } from "antd";
import UAISearch from "../UAISearch";
import { GrNext, GrPrevious } from "react-icons/gr";
import COLORS from "../../colors";
import { useState } from "react";

const PageSelect = ({ setFormData }) => {
  const [pageSelected, setPageSelected] = useState(1);
  const totalPages = 5;

  const handlePageSelect = (number) => {
    if (number < 1 || number > totalPages) return;
    setPageSelected(number);
    setFormData((prev) => ({ ...prev, page: number }));
    window.scrollTo({ top: 0 });
  };

  const PageNumber = ({ page }) => {
    return page == pageSelected ? (
      <Col style={{ marginRight: "14px" }}>
        <b>{page}</b>
      </Col>
    ) : (
      <Col
        style={{
          marginRight: "14px",
          color: COLORS.purple,
          cursor: "pointer",
        }}
        onClick={() => {
          handlePageSelect(page);
        }}
      >
        {page}
      </Col>
    );
  };

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
        <Col
          style={{
            marginRight: "14px",
            color: "#ccc",
            cursor: pageSelected === 1 ? "default" : "pointer",
            visibility: pageSelected == 1 ? "hidden" : "visible"
          }}
          onClick={() => handlePageSelect(pageSelected - 1)}
        >
          <GrPrevious />
        </Col>
        <PageNumber page={1} />
        <PageNumber page={2} />
        <PageNumber page={3} />
        <PageNumber page={4} />
        <PageNumber page={5} />
        <Col
          style={{
            color: "#ccc",
            cursor: pageSelected === totalPages ? "default" : "pointer",
            visibility: pageSelected == totalPages ? "hidden" : "visible"
          }}
          onClick={() => handlePageSelect(pageSelected + 1)}
        >
          <GrNext />
        </Col>
      </Row>
    </Row>
  );
};

export default PageSelect;
