import { Row, Col } from "antd";
import { FaClock, FaCalendar } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import wikipediaLogo from "../../assets/wikipedia_icon.png";
import COLORS from "../../colors";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const SearchIndex = ({ id, url, title, content, readingTime, date }) => {
  const text = content
  .replace(/<math[^>]*>([\s\S]*?)<\/math>/gi, (_, expr) => `$$${expr.trim()}$$`)
  .replace(/<som\d+>([\s\S]*?)<\/som\d+>/gi, (_, expr) => `$${expr.trim()}$`)
  .replace(/\{\{math\|([\s\S]+?)\}\}/gi, (_, expr) => `$${expr.trim()}$`)
  .replace(/\{\{sqrt\|([\s\S]+?)\}\}/gi, (_, expr) => `\\sqrt{${expr.trim()}}`)
  .replace(/\{\{mvar\|([\s\S]+?)\}\}/gi, (_, expr) => `${expr.trim()}`)
  .replace(/\[\[([^|\]]+)\|([^|\]]+)\]\]/g, (_, page, text) => text)
  .replace(/\[\[([^|\]]+)\]\]/g, (_, page) => page)
  .replace(/'''''(.*?)'''''/g, '***$1***')  
  .replace(/'''(.*?)'''/g, '**$1**')
  .replace(/''(.*?)''/g, '*$1*')
  .replace(/\{\{[^}]+\}\}/g, '')
  .replace(/^\s+|\s+$/g, '')
  ;

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
            <Row
              style={{
                color: COLORS.white,
                marginBottom: "3px",
                fontSize: "16px",
              }}
            >
              Wikipédia
            </Row>
            <Row style={{ marginBottom: "6px", fontSize: "12px" }}>
              <div style={{ color: COLORS.white, marginRight: "20px" }}>
                {url}
              </div>
              <SlOptionsVertical style={{ color: COLORS.white }} />
            </Row>
          </a>
        </Col>
      </Row>
      <Row style={{ fontSize: "22px", marginBottom: "5px" }}>
        <a style={{ color: COLORS.purple }} href={url}>
          {title}
        </a>
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
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {text + " ..."}
          </ReactMarkdown>
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
