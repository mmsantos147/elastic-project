import { Divider } from "antd";
import HistoryElement from "./HistoryElement";
import COLORS from "../../colors";
import SearchButton from "./SearchButton";

const example = [
  "Como fazer bolo de cenoura",
  "Qual é o teorema de pitagoras?",
  "Quem veio primeiro, ovo ou a galinha?",
  "Como calcular a area de um triangulo?",
  "Classificação morfológica de ornitorrincos",
  "Deuses da grécia antiga",
  "Quem é carlos stri?",
];

const SearchHistory = ({ visible }) => {
  const historyStyle = {
    width: "100%",
    display: visible ? "block" : "none",
    backgroundColor: "rgb(48, 49, 52)",
    zIndex: "9999",
    position: "absolute",
    textAlign: "left",
    padding: "20px",
    borderRadius: "0 0 20px 20px",
  };

  return (
    <div style={historyStyle}>
      <Divider
        orientation="left"
        style={{
          marginTop: "0px",
          borderColor: COLORS.gray,
          color: COLORS.gray,
        }}
      >
        Pesquisas recentes
      </Divider>
      {example.map((query, index) => (
        <HistoryElement key={index} id={index} query={query} />
      ))}
    </div>
  );
};

export default SearchHistory;
