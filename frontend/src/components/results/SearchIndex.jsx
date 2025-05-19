import { Row, Col, Tooltip } from "antd";
import { FaClock, FaCalendar } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import wikipediaLogo from "../../assets/wikipedia_icon.png";
import COLORS from "../../colors";
import { useTranslation } from "react-i18next";
import { useSearchData } from "../../context/SearchContext";
import { ApplyHighlighter } from "./ApplyHighlighter";

const SearchIndex = ({ content }) => {
  const { setIndexMenuContent, setIsIndexMenuOpen } = useSearchData();
  const { t, i18n } = useTranslation();

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
          <a href={content.url}>
            <Row
              style={{
                color: COLORS.white,
                marginBottom: "3px",
                fontSize: "16px",
              }}
            >
              {t("wikipedia")}
            </Row>
          </a>
          <Row style={{ marginBottom: "6px", fontSize: "12px" }}>
            <a href={content.url}>
              <div style={{ color: COLORS.white, marginRight: "20px" }}>
                {content.url}
              </div>
            </a>
            <Tooltip placement="top" title={t('more_options_tooltip')}>
              <SlOptionsVertical
                style={{ color: COLORS.white, cursor: "pointer", fontSize: "14px"}}
                onClick={() => {
                  setIndexMenuContent(content);
                  setIsIndexMenuOpen(true);
                }}
              />
            </Tooltip>
          </Row>
        </Col>
      </Row>
      <Row style={{ fontSize: "22px", marginBottom: "5px" }}>
        <a style={{ color: COLORS.purple }} href={content.url}>
          <div style={{ fontSize: "22px", marginBottom: "5px" }}>
            <ApplyHighlighter text={content.title} />
          </div>
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
          <ApplyHighlighter text={content.content} />
          ...
        </p>
      </Row>
      <Row>
        <Col style={{ fontSize: "15px" }}>
          <FaCalendar style={{ verticalAlign: "middle", marginRight: "8px" }} />
          {new Date(content.datetime).toLocaleDateString(i18n.language, {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </Col>
        <Col flex="auto" />
        <Col style={{ fontSize: "15px" }}>
          <FaClock style={{ verticalAlign: "middle", marginRight: "8px" }} />
          {t("approximate_small")} {content.reading_time} {t("minutes")}
        </Col>
      </Row>
    </div>
  );
};

export default SearchIndex;
