import { Col, Divider, Row } from "antd";
import { MdOutlineSearchOff } from "react-icons/md";
import COLORS from "../../colors";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

const SuggestionLink = styled.a`
  display: flex;
  align-items: center;
  color: ${COLORS.white};
  text-decoration: none;
  cursor: pointer;

  span {
    transition: all 0.3s ease;
  }

  &:hover span {
    text-decoration: underline;
    text-decoration-color: ${COLORS.blue};
  }
`;

const EmptyResults = () => {
  return (
    <>
      <Row>
        <Col style={{marginRight: "30px"}}>
          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "#fef7e0",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MdOutlineSearchOff size={30} color="#f9ab00" />
          </div>
        </Col>
        <Col>
            <h2>Sua pesquisa não encontrou nenhum documento correspondente</h2>
            <strong>Precisa de ajuda?</strong> Confira outras <a href="/tips">dicas</a> para pesquisar no uAISearch.
            <Row style={{marginTop: "30px"}}>
                Você também pode tentar fazer estas pesquisas:
            </Row>
            <Divider style={{ borderColor: COLORS.gray }}/>
            <Row align="middle" style={{ display: "flex" }}>
                <SuggestionLink style={{color: COLORS.white}} href="/search?q=Square root">
                    <SearchOutlined style={{fontSize: "20px", marginRight: "20px", marginLeft: "30px"}} /> <span>Square root</span>
                </SuggestionLink>
            </Row>

            <Divider style={{ borderColor: COLORS.gray }}/>
            <Row align="middle" style={{ display: "flex" }}>
                <SuggestionLink style={{color: COLORS.white}} href="/search?q=Quantum mechanics">
                    <SearchOutlined style={{fontSize: "20px", marginRight: "20px", marginLeft: "30px"}} /> <span>Quantum mechanics</span>
                </SuggestionLink>
            </Row>

            <Divider style={{ borderColor: COLORS.gray }}/>
            <Row align="middle" style={{ display: "flex" }}>
                <SuggestionLink style={{color: COLORS.white}} href="/search?q=Math">
                    <SearchOutlined style={{fontSize: "20px", marginRight: "20px", marginLeft: "30px"}} /> <span>Math</span>
                </SuggestionLink>
            </Row>

            <Divider style={{ borderColor: COLORS.gray }}/>
            <Row align="middle" style={{ display: "flex" }}>
                <SuggestionLink style={{color: COLORS.white}} href="/search?q=Quadratic equation">
                    <SearchOutlined style={{fontSize: "20px", marginRight: "20px", marginLeft: "30px"}} /> <span>Quadratic equation</span>
                </SuggestionLink>
            </Row>

            <Divider style={{ borderColor: COLORS.gray }}/>
            <Row align="middle" style={{ display: "flex" }}>
                <SuggestionLink style={{color: COLORS.white}} href="/search?q=Optics">
                    <SearchOutlined style={{fontSize: "20px", marginRight: "20px", marginLeft: "30px"}} /> <span>Optics</span>
                </SuggestionLink>
            </Row>

            <Divider style={{ borderColor: COLORS.gray }}/>
            <Row align="middle" style={{ display: "flex" }}>
                <SuggestionLink style={{color: COLORS.white}} href="/search?q=Atomic models">
                    <SearchOutlined style={{fontSize: "20px", marginRight: "20px", marginLeft: "30px"}} /> <span>Atomic models</span>
                </SuggestionLink>
            </Row>

            <Divider style={{ borderColor: COLORS.gray }}/>
            <Row align="middle" style={{ display: "flex" }}>
                <SuggestionLink style={{color: COLORS.white}} href="/search?q=Newtons laws">
                    <SearchOutlined style={{fontSize: "20px", marginRight: "20px", marginLeft: "30px"}} /> <span>Newton's laws</span>
                </SuggestionLink>
            </Row>

            <Divider style={{ borderColor: COLORS.gray }}/>
            <Row align="middle" style={{ display: "flex" }}>
                <SuggestionLink style={{color: COLORS.white}} href="/search?q=Exponential function">
                    <SearchOutlined style={{fontSize: "20px", marginRight: "20px", marginLeft: "30px"}} /> <span>Exponential function</span>
                </SuggestionLink>
            </Row>


            <Divider style={{ borderColor: COLORS.gray, marginBottom: "150px" }}/>
        </Col>
      </Row>
      
    </>
  );
};

export default EmptyResults;
