import { Col, Row } from "antd";
import Filter from "./Filter";
import styled from "styled-components";
import COLORS from "../colors";
import { useState } from "react";

const ResponsiveResults = styled(Col)`
  color: ${COLORS.gray};

  @media (max-width: 1400px) {
    display: none;
  }
`;

const FilterBar = ({ setFormData }) => {
  const [orderByState, setOrderByState] = useState("scoreDecreasing");
  const [itensByPageState, setItensByPageState] = useState("10");
  const [readingTimeState, setReadingTimeState] = useState(undefined);
  const [searchForState, setSearchForState] = useState("allResults");
  const [minDateTimeState, setMinDateTimeState] = useState(undefined);

  const handleOrderByChange = (e) => {
    setFormData((prev) => ({ ...prev, orderBy: e.key }));
    setOrderByState(e.key);
  };

  const handleItensByPageChange = (e) => {
    setFormData((prev) => ({ ...prev, resultsPerPage: Number(e.key) }));
    setItensByPageState(e.key);
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
    setFormData((prev) => ({...prev, minDateTime: e.key}));
    setMinDateTimeState(e.key);
  }

  const orderBy = [
    {
      label: "Relevância decrescente",
      key: "scoreDecreasing",
    },
    {
      label: "Relevância crescente",
      key: "scoreIncreasing",
    },
    {
      label: "Tempo de leitura decrescente",
      key: "readingTimeDecreasing",
    },
    {
      label: "Tempo de leitura crescente",
      key: "readingTimeIncreasing",
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
    {
      type: "divider",
    },
    {
      label: "Definir",
      key: "4",
    },
  ];

  const readTime = [
    {
      label: "Rápido (<3 min)",
      key: 3,
    },
    {
      label: "Médio (<5 min)",
      key: 5,
    },
    {
      label: "Longo (<10 min)",
      key: 10,
    },
    {
      type: "divider",
    },
    {
      label: "Definir",
      key: "4",
    },
  ];

  const publisedDate = [
    {
      label: "Depois de 2020",
      key: "2020-01-01",
    },
    {
      label: "Depois de 2010",
      key: "2010-01-01",
    },
    {
      label: "Depois de 2005",
      key: "2005-01-01",
    },
    {
      type: "divider",
    },
    {
      label: "Definir",
      key: "4",
    },
  ];

  const searchFor = [
    {
      label: "Todos os resultados",
      key: "allResults",
    },
    {
      label: "Correspondência exata",
      key: "exactSearch",
    },
  ];

  return (
    <Row style={{ marginTop: "13px" }}>
      <Col style={{ width: "220px" }} />
      <Col style={{ marginRight: "40px" }}>
        <Filter
          items={orderBy}
          selectedKeys={orderByState}
          name={"Ordenar por"}
          onClick={handleOrderByChange}
        />
      </Col>
      <Col style={{ marginRight: "40px" }}>
        <Filter
          items={itensPerPage}
          selectedKeys={itensByPageState}
          name={"Itens por página"}
          onClick={handleItensByPageChange}
        />
      </Col>
      <Col style={{ marginRight: "40px" }}>
        <Filter
          items={readTime}
          name={"Tempo de leitura"}
          selectedKeys={readingTimeState}
          onClick={handleReadingTimeChange}
        />
      </Col>
      <Col style={{ marginRight: "40px" }}>
        <Filter
          items={publisedDate}
          name={"Data de publicacação"}
          selectedKeys={minDateTimeState}
          onClick={handleMinDateTimeChange}
        />
      </Col>
      <Col>
        <Filter
          items={searchFor}
          selectedKeys={searchForState}
          name={"Pesquisar por"}
          onClick={handleSearchForChange}
        />
      </Col>
      <Col flex="auto" />
      <ResponsiveResults style={{ marginRight: "40px" }}>
        Aproximadamente 9.000 resultados (0,24 segundos)
      </ResponsiveResults>
    </Row>
  );
};

export default FilterBar;
