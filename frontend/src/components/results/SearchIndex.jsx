import { Row, Col } from "antd";
import { FaClock, FaCalendar } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import wikipediaLogo from "../../assets/wikipedia_icon.png";
import COLORS from "../../colors";

const SearchIndex = ({ key, url, title, content, readingTime, date }) => {
  return (
    <div style={{ marginBottom: "50px", width: "100%" }}>
      <Row style={{ marginBottom: "7px" }}>
        <Col>
          <img
            src={wikipediaLogo}
            height={37}
            style={{ marginRight: "10px" }}
          />
        </Col>
        <Col>
          <a href={url}>
            <Row style={{color: COLORS.white, marginBottom: "3px", fontSize: "16px" }}>
              Wikipédia
            </Row>
            <Row style={{ marginBottom: "6px", fontSize: "12px" }}>
              <div style={{color: COLORS.white, marginRight: "20px" }}>{url}</div>
              <SlOptionsVertical style={{color: COLORS.white }}/>
            </Row>
          </a>
        </Col>
      </Row>
      <Row
        style={{ fontSize: "22px", marginBottom: "5px" }}
      >
        <a style={{color: COLORS.purple}} href={ url }>{title}</a>
      </Row>

      <Row>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "25px",
            marginBottom: "12px",
            textAlign: "justify",
            width: "100%",
          }}
        >
          {content} ...
        </p>
      </Row>
      <Row>
        <Col style={{ fontSize: "15px" }}>
          <FaCalendar style={{ verticalAlign: "middle", marginRight: "8px" }} />
          {date}
        </Col>
        <Col flex="auto" />
        <Col style={{ fontSize: "15px" }}>
          <FaClock style={{ verticalAlign: "middle", marginRight: "8px" }} />
          aprox. {readingTime} minutos
        </Col>
      </Row>
    </div>
  );
};

export default SearchIndex;
