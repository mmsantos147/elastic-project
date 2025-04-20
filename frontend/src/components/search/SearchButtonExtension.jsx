import { Button, Col, Row } from "antd";
import COLORS from "../../colors";

const SearchButtonExtension = () => {
  return (
    <div>
      <Row
        align={"middle"}
        justify={"center"}
        style={{ margin: "20px", color: COLORS.white }}
      >
        <Col>
          <Button
            style={{
              borderRadius: "4px",
              backgroundColor: "#2a2b2e",
              color: COLORS.white,
              borderColor: "#5f6368",
              border: "0px",
            }}
            size="middle"
          >
            Pesquisar
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SearchButtonExtension;