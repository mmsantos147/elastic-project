import { Row, Col } from "antd";
import { FaClock, FaCalendar } from "react-icons/fa";
import wikipediaLogo from "../../assets/wikipedia_icon.png";
import COLORS from "../../colors";

const SearchIndex = (props) => {
  return (
    <div style={{ marginBottom: "50px" }}>
      <Row style={{ marginBottom: "7px"}}>
        <Col>
          <img src={wikipediaLogo} height={37} style={{marginRight: "10px"}} />
        </Col>
        <Col>
          <Row style={{ marginBottom: "3px", fontSize: "16px" }}>Wikipédia</Row>
          <Row style={{ marginBottom: "6px", fontSize: "12px"}}>
            https://lorem.com.br
          </Row>
        </Col>
      </Row>
      <Row style={{ fontSize: "22px", marginBottom: "5px", color: COLORS.purple }}>
        Lorem ipsum dolor sit amet
      </Row>

      <Row>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "25px",
            marginBottom: "12px",
            textAlign: "justify",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod corrupti
          ex voluptatum rem, repudiandae nostrum ad vitae recusandae temporibus!
          Modi sed deleniti ullam, nostrum nemo dolores eligendi nihil
          recusandae dicta? ...
        </p>
      </Row>
      <Row>
        <Col style={{ fontSize: "15px" }}>
          <FaCalendar style={{ verticalAlign: "middle", marginRight: "8px" }} />
          01/01/2024
        </Col>
        <Col flex="auto" />
        <Col style={{ fontSize: "15px" }}>
          <FaClock style={{ verticalAlign: "middle", marginRight: "8px" }} />
          aprox. 5 minutos
        </Col>
      </Row>
    </div>
  );
};

export default SearchIndex;
