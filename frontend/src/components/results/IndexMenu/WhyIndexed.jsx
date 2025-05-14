import { Col, Divider, Row, Typography } from "antd"
import {
    InfoCircleOutlined,
    RightOutlined,
    SearchOutlined,
  } from "@ant-design/icons";
import COLORS from "../../../colors";
import styled from "styled-components";

const { Paragraph } = Typography;

const WhyIndexModal = styled.div`
  background-color: rgb(36, 36, 36);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
`

const WhyIndexList = styled.ul`
  padding-left: 14px;
  font-size: 15px;
  gap: 12px;
  display:flex;
  flex-direction: column;
  margin-bottom: 40px;
  color: ${COLORS.gray}
`

const WhyIndexItem = styled.li`
  margin-left: 5px;
`

const UnderlineDotted = styled.strong`
  text-decoration: underline dotted;
`

export const WhyIndexed = () => {
    return (<WhyIndexModal>
        <WhyIndexList>
          <WhyIndexItem>Estes <UnderlineDotted>termos de pesquisa</UnderlineDotted> aparecem no resultado: <strong>Lorem</strong>, <strong>ipsum</strong>, <strong>dolor</strong></WhyIndexItem>
          <WhyIndexItem>O resultado está em <UnderlineDotted>Inglês (americano)</UnderlineDotted></WhyIndexItem>
          <WhyIndexItem>O resultado parece ser relevante para pesquisas neste país: <UnderlineDotted>Estados Unidos</UnderlineDotted></WhyIndexItem>
        </WhyIndexList>
        <Paragraph style={{ fontSize: "16px", marginBottom: "0px" }}>
          <Row>
            <Col flex={"auto"}>
              <SearchOutlined
                style={{ margin: "0px 20px 0px 20px",  fontSize: "19px" }}
              />
              <strong style={{fontSize: "15px"}}>Como que a pesquisa funciona ?</strong>
            </Col>
            <Col>
              <RightOutlined />
            </Col>
          </Row>
        </Paragraph>
        <Divider style={{ margin: "12px 0px 12px 0px" }} />
        <Paragraph style={{ fontSize: "16px", marginBottom: "0px" }}>
          <Row>
            <Col flex={"auto"}>
              <InfoCircleOutlined
                style={{ margin: "0px 20px 0px 20px", fontSize: "19px" }}
              />
              <strong style={{fontSize: "15px"}}>Dicas de como fazer uma pesquisa</strong>
            </Col>
            <Col>
              <RightOutlined />
            </Col>
          </Row>
        </Paragraph>
      </WhyIndexModal>)
}