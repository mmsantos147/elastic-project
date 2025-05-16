import { Col, Row } from "antd";
import COLORS from "../../colors";
import { FaCalendar, FaClock, FaStar } from "react-icons/fa";
import { ApplyHighlighter } from "../results/ApplyHighlighter";
import { useTranslation } from "react-i18next";
import { useFavoriteSearch } from "../../api/Favorite.api";
import { useState } from "react";
import wikipediaLogo from "../../assets/wikipedia_icon.png"

export const FavoriteItem = ({ item }) => {
    const [t, i18n] = useTranslation();
    const [favorited, setFavorited] = useState(true);
    const { deleteFavoriteItem } = useFavoriteSearch();
  
    return (
    <Row
      key={item.id}
      style={{
        backgroundColor: "rgb(12, 12, 12)",
        padding: "30px",
        borderRadius: "20px",
        transition: "transform 0.2s, box-shadow 0.2s",
        width: "100%",
      }}
    >
      <div style={{ width: "100%" }}>
        <Row style={{ marginBottom: "7px" }}>
          <Col>
            <img
              src={wikipediaLogo}
              height={37}
              style={{ marginRight: "10px" }}
              alt={item.source}
            />
          </Col>
          <Col>
            <a href={item.url}>
              <Row
                style={{
                  color: COLORS.white,
                  marginBottom: "3px",
                  fontSize: "16px",
                }}
              >
                {item.source}
              </Row>
            </a>
            <Row style={{ marginBottom: "6px", fontSize: "12px" }}>
              <a href={item.url}>
                <div style={{ color: COLORS.white, marginRight: "20px" }}>
                  {item.url}
                </div>
              </a>
            </Row>
          </Col>
          <Col style={{ marginLeft: "auto" }}>
            <FaStar onClick={() => {deleteFavoriteItem(item.id); setFavorited(false)}} style={{ color: favorited ? "#FFD700" : "rgb(109, 109, 109)", fontSize: "24px" }} />
          </Col>
        </Row>

        <Row style={{ fontSize: "22px", marginBottom: "15px" }}>
          <a style={{ color: COLORS.purple }} href={item.url}>
            <div style={{ fontSize: "22px", fontWeight: "600" }}>
              <ApplyHighlighter text={item.title} />
            </div>
          </a>
        </Row>

        <Row>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "25px",
              marginBottom: "18px",
              textAlign: "justify",
              width: "100%",
              color: COLORS.lightGray,
            }}
          >
            <ApplyHighlighter text={item.content} />
            ...
          </p>
        </Row>
        <Row align="middle">
          <Col style={{ fontSize: "15px", color: COLORS.lightGray }}>
            <FaCalendar
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            {new Date(item.date).toLocaleDateString(i18n.language, {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Col>
          <Col flex="auto" />
          <Col style={{ fontSize: "15px", color: COLORS.lightGray }}>
            <FaClock style={{ verticalAlign: "middle", marginRight: "8px" }} />
            {t("approximate_small")} {item.readTime} {t("minutes")}
          </Col>
        </Row>
      </div>
    </Row>
  );
};
