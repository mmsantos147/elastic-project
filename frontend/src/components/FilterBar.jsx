import {
  Button,
  Col,
  Input,
  InputNumber,
  Modal,
  Popover,
  Row,
  Space,
} from "antd";
import Filter from "./Filter";
import styled from "styled-components";
import COLORS from "../colors";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckboxOutline } from "react-icons/io5";

const ResponsiveResults = styled(Col)`
  color: ${COLORS.gray};

  @media (max-width: 1400px) {
    display: none;
  }
`;

const FilterBar = ({ setFormData }) => {
  const [t] = useTranslation();
  const [orderByState, setOrderByState] = useState("SCORE_DESC");

  const [itensByPageState, setItensByPageState] = useState(10);

  const [readingTimeState, setReadingTimeState] = useState(undefined);

  const [minDateTimeState, setMinDateTimeState] = useState(undefined);

  const [searchForState, setSearchForState] = useState("allResults");

  const handleOrderByChange = (e) => {
    setFormData((prev) => ({ ...prev, orderBy: e.key }));
    setOrderByState(e.key);
  };

  const handleItensByPageChange = (e) => {
    setFormData((prev) => ({ ...prev, resultsPerPage: Number(e.key) }));
    setItensByPageState(e.key);
    setPopoverVisible(false);
  };

  const handleReadingTimeChange = (e) => {
    setFormData((prev) => ({ ...prev, maxReadTime: Number(e.key) }));
    setReadingTimeState(e.key);
  };

  const handleSearchForChange = (e) => {
    setFormData((prev) => ({ ...prev, searchFor: e.key }));
    setSearchForState(e.key);
  };

  const handleMinDateTimeChange = (e) => {
    setFormData((prev) => ({ ...prev, minDateTime: e.key }));
    setMinDateTimeState(e.key);
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
    }
  ];

  const readTime = [
    {
      label: `${t("any_time")}`,
      key: undefined,
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
    }
  ];

  const publisedDate = [
    {
      label: `${t("any_date")}`,
      key: undefined
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
    }
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

  return (
    <>
      <Row style={{ marginTop: "13px" }}>
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
            selectedKeys={itensByPageState}
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
          <Filter
            items={searchFor}
            selectedKeys={searchForState}
            name={t("search_for")}
            onClick={handleSearchForChange}
          />
        </Col>

        <Col flex="auto" />
        <ResponsiveResults style={{ marginRight: "40px" }}>
          {t("near")} 9.000 {t("results")} (0,24 {t("seconds")})
        </ResponsiveResults>
      </Row>
    </>
  );
};

export default FilterBar;
