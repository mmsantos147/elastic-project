import { Col, Row } from "antd";
import Filter from "./Filter";
import styled from "styled-components";
import COLORS from "../colors";

const FilterBar = () => {
  const ResponsiveResults = styled(Col)`
    color: ${COLORS.gray};

    @media (max-width: 1200px) {
      display: none;
    }
  `;

  const orderBy = [
    {
      label: "Relevância crescente",
      key: "0",
    },
    {
      label: "Relevância decrescente",
      key: "1",
    },
    {
      label: "Tempo de leitura crescente",
      key: "3",
    },
    {
      label: "Tempo de leitura decrescente",
      key: "4",
    },
  ];

  const itensPerPage = [
    {
      label: "10",
      key: "0",
    },
    {
      label: "20",
      key: "1",
    },
    {
      label: "30",
      key: "3",
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
      key: "0",
    },
    {
      label: "Médio (<5 min)",
      key: "1",
    },
    {
      label: "Longo (<10 min)",
      key: "3",
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
      key: "0",
    },
    {
      label: "Correspondência exata",
      key: "1",
    },
  ];

  return (
    <Row style={{ marginTop: "13px" }}>
      <Col style={{ width: "220px" }} />
      <Col style={{ marginRight: "40px" }}>
        <Filter items={orderBy} selectedKeys={["1"]} name={"Ordenar por"} />
      </Col>
      <Col style={{ marginRight: "40px" }}>
        <Filter items={itensPerPage} selectedKeys={["0"]} name={"Itens por página"} />
      </Col>
      <Col style={{ marginRight: "40px" }}>
        <Filter items={readTime} name={"Tempo de leitura"} />
      </Col>
      <Col>
        <Filter items={searchFor} selectedKeys={["0"]} name={"Pesquisar por"} />
      </Col>
      <Col flex="auto" />
      <ResponsiveResults style={{ marginRight: "40px" }}>
        Aproximadamente 9.000 resultados (0,24 segundos)
      </ResponsiveResults>
    </Row>
  );
};

export default FilterBar;
