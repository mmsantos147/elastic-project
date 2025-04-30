import { Col, Row } from "antd";
import UAISearch from "../UAISearch";
import { GrNext, GrPrevious } from "react-icons/gr";
import COLORS from "../../colors";
import { useState } from "react";

const PageSelect = ({ setFormData, maxPages }) => {
  const [pageSelected, setPageSelected] = useState(1);

  const handlePageSelect = (number) => {
    if (number < 1 || number > maxPages) return;
    setPageSelected(number);
    setFormData((prev) => ({ ...prev, page: number }));
    window.scrollTo({ top: 0 });
  };

  const getPageRange = () => {
    const maxVisible = 5;
    let start = Math.max(1, pageSelected - 2);
    let end = Math.min(maxPages, pageSelected + 2);

    if (end - start < maxVisible - 1) {
      if (start === 1) {
        end = Math.min(maxPages, start + maxVisible - 1);
      } else if (end === maxPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const PageNumber = ({ page }) => {
    return page === pageSelected ? (
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
            visibility: pageSelected === 1 ? "hidden" : "visible",
          }}
          onClick={() => handlePageSelect(pageSelected - 1)}
        >
          <GrPrevious />
        </Col>

        {getPageRange().map((page) => (
          <PageNumber key={page} page={page} />
        ))}

        <Col
          style={{
            color: "#ccc",
            cursor: pageSelected === maxPages ? "default" : "pointer",
            visibility: pageSelected === maxPages ? "hidden" : "visible",
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
