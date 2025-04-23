import styled from "styled-components";
import { Col, Row } from "antd";
import UAISearch from "../UAISearch";
import { GrNext, GrPrevious } from "react-icons/gr";
import COLORS from "../../colors";

const PageNumber = styled(Col).attrs(() => ({
  role: "button",
}))`
  margin-right: 14px;
  cursor: ${({ $active }) => ($active ? "default" : "pointer")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  color: ${({ $active }) => ($active ? COLORS.purple : "inherit")};
  pointer-events: ${({ $active }) => ($active ? "none" : "auto")};
`;

const PageSelect = ({ setFormData, currentPage }) => {
  const handlePageSelect = (number) => {
    if (number !== currentPage) {
      setFormData((prev) => ({ ...prev, page: number }));
      window.scrollTo({ top: 0 });
    }
  };

  const totalPages = 5;

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

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <PageNumber
              key={pageNumber}
              $active={pageNumber === currentPage}
              onClick={() => handlePageSelect(pageNumber)}
            >
              {pageNumber}
            </PageNumber>
          );
        })}

        <Col>
          <GrNext />
        </Col>
      </Row>
    </Row>
  );
};

export default PageSelect;
