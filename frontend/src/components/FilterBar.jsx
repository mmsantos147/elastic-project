import { Button, Col, Drawer, Grid, Row, Space } from "antd";
import Filter from "./Filter";
import styled from "styled-components";
import COLORS from "../colors";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ResponsiveResults = styled(Col)`
  color: ${COLORS.gray};

  @media (max-width: 1400px) {
    display: none;
  }
`;

const FilterButton = styled(Button)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const DesktopFilters = styled(Row)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const FilterBar = ({ setFormData, searchResult }) => {
  const [t] = useTranslation();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [orderByState, setOrderByState] = useState("SCORE_DESC");
  const [itensByPageState, setItensByPageState] = useState(10);
  const [readingTimeState, setReadingTimeState] = useState("any");
  const [minDateTimeState, setMinDateTimeState] = useState("any");
  const [searchForState, setSearchForState] = useState("allResults");
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const showFilterDrawer = () => {
    setFilterDrawerVisible(true);
  };

  const closeFilterDrawer = () => {
    setFilterDrawerVisible(false);
  };

  const handleOrderByChange = (e) => {
    setFormData((prev) => ({ ...prev, orderBy: e.key }));
    setOrderByState(e.key);
    if (isMobile) closeFilterDrawer();
  };

  const handleItensByPageChange = (e) => {
    setFormData((prev) => ({ ...prev, resultsPerPage: Number(e.key) }));
    setItensByPageState(e.key);
    if (isMobile) closeFilterDrawer();
  };

  const handleReadingTimeChange = (e) => {
    if (e.key !== "any") {
      setFormData((prev) => ({ ...prev, maxReadTime: Number(e.key) }));
      setReadingTimeState(e.key);
    } else {
      setFormData((prev) => ({ ...prev, maxReadTime: null }));
      setReadingTimeState("any");
    }
    if (isMobile) closeFilterDrawer();
  };

  const handleSearchForChange = (e) => {
    setFormData((prev) => ({ ...prev, searchFor: e.key }));
    setSearchForState(e.key);
    if (isMobile) closeFilterDrawer();
  };

  const handleMinDateTimeChange = (e) => {
    if (e.key !== "any") {
      setFormData((prev) => ({ ...prev, minDateTime: e.key }));
      setMinDateTimeState(e.key);
    } else {
      setFormData((prev) => ({ ...prev, minDateTime: "" }));
      setMinDateTimeState("any");
    }
    if (isMobile) closeFilterDrawer();
  };

  const orderBy = [
    {
      label: t("score_desc"),
      key: "SCORE_DESC",
    },
    {
      label: t("score_asc"),
      key: "SCORE_ASC",
    },
    {
      label: t("read_time_desc"),
      key: "READ_TIME_DESC",
    },
    {
      label: t("read_time_asc"),
      key: "READ_TIME_ASC",
    },
    {
      label: t("date_desc"),
      key: "DATE_DESC",
    },
    {
      label: t("date_asc"),
      key: "DATE_ASC",
    },
  ];

  const itensPerPage = [
    {
      label: "10",
      key: 10,
    },
    {
      label: "20",
      key: 20,
    },
    {
      label: "30",
      key: 30,
    },
  ];

  const readTime = [
    {
      label: `${t("any_time")}`,
      key: "any",
    },
    {
      label: `${t("fast")} (<3 ${t("minute_abbreviation")})`,
      key: 3,
    },
    {
      label: `${t("medium")} (<5 ${t("minute_abbreviation")})`,
      key: 5,
    },
    {
      label: `${t("high")} (<10 ${t("minute_abbreviation")})`,
      key: 10,
    },
  ];

  const publisedDate = [
    {
      label: `${t("any_date")}`,
      key: "any",
    },
    {
      label: `${t("after_")} 2020`,
      key: "2020-01-01",
    },
    {
      label: `${t("after_")} 2010`,
      key: `2010-01-01`,
    },
    {
      label: `${t("after_")} 2005`,
      key: `2005-01-01`,
    },
  ];

  const searchFor = [
    {
      label: t("all_results_search"),
      key: "allResults",
    },
    {
      label: t("exact_result"),
      key: "exactSearch",
    },
  ];

  const ResultsInfo = () => (
    <div
      style={{ color: COLORS.gray, margin: isMobile ? "10px 0" : undefined }}
    >
      {t("near")} {searchResult.hits} {t("results")} ({searchResult.timeTaken}s)
    </div>
  );

  return (
    <>
      {/* Botão de filtro para dispositivos móveis */}
      <Row
        justify="space-between"
        align="middle"
        style={{ marginTop: "10px", padding: "0 15px" }}
      >
        <FilterButton
          type="default"
          icon={<FilterOutlined />}
          onClick={showFilterDrawer}
        >
          {t("filters")}
        </FilterButton>

        {isMobile && <ResultsInfo />}
      </Row>

      {/* Filtros para desktop */}
      <DesktopFilters>
        <Col style={{ width: "220px" }} />
        <Col style={{ marginRight: "40px" }}>
          <Filter
            items={orderBy}
            selectedKeys={orderByState}
            name={t("order_by")}
            onClick={handleOrderByChange}
          />
        </Col>
        <Col style={{ marginRight: "40px" }}>
          <Filter
            items={itensPerPage}
            selectedKeys={[String(itensByPageState)]}
            name={t("itens_per_page")}
            onClick={handleItensByPageChange}
          />
        </Col>
        <Col style={{ marginRight: "40px" }}>
          <Filter
            items={readTime}
            name={t("reading_time")}
            selectedKeys={readingTimeState}
            onClick={handleReadingTimeChange}
          />
        </Col>
        <Col style={{ marginRight: "40px" }}>
          <Filter
            items={publisedDate}
            name={t("publish_date")}
            selectedKeys={minDateTimeState}
            onClick={handleMinDateTimeChange}
          />
        </Col>

        <Col>
          <Link style={{ color: "rgb(154, 160, 166)", textDecoration: "underline" }} to={"/tips"}>Mais informações</Link>
        </Col>

        <Col flex="auto" />
        <ResponsiveResults style={{ marginRight: "40px" }}>
          <ResultsInfo />
        </ResponsiveResults>
      </DesktopFilters>

      <Drawer
        title={t("filters")}
        placement="right"
        onClose={closeFilterDrawer}
        open={filterDrawerVisible}
        width={300}
        closeIcon={<CloseOutlined />}
        bodyStyle={{ padding: "20px 0" }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ padding: "0 20px" }}>
            <Filter
              items={orderBy}
              selectedKeys={orderByState}
              name={t("order_by")}
              onClick={handleOrderByChange}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ padding: "0 20px" }}>
            <Filter
              items={itensPerPage}
              selectedKeys={[String(itensByPageState)]}
              name={t("itens_per_page")}
              onClick={handleItensByPageChange}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ padding: "0 20px" }}>
            <Filter
              items={readTime}
              name={t("reading_time")}
              selectedKeys={readingTimeState}
              onClick={handleReadingTimeChange}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ padding: "0 20px" }}>
            <Filter
              items={publisedDate}
              name={t("publish_date")}
              selectedKeys={minDateTimeState}
              onClick={handleMinDateTimeChange}
              style={{ width: "100%" }}
            />
          </div>
        </Space>
      </Drawer>
    </>
  );
};

export default FilterBar;
