import { Card, Form, Input, Button, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import UAISearch from "../components/UAISearch";
import COLORS from "../colors";
import { IoMdArrowRoundBack } from "react-icons/io";

const Register = () => {
  const onFinish = (values) => {
    console.log("Dados enviados:", values);
  };
  return (
    <Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          width: "50%",
          padding: "30px",
          backgroundColor: COLORS.dark_gray,
          borderColor: "rgba(0,0,0,0)",
          borderRadius: "30px",
          height: "450px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Row style={{ flex: 1, width: "100%" }}>
          <Col span={12}>
            <Row>
              <UAISearch logoWidth={300} style={{ marginBottom: "30px" }} />
            </Row>
            <Row>
              <h1
                style={{
                  color: COLORS.white,
                  fontSize: "40px",
                  marginBottom: "0px",
                }}
              >
                Registrar-se agora
              </h1>
            </Row>
            <Row>
              <a style={{ color: COLORS.white }} href="/">
                {" "}
                <IoMdArrowRoundBack /> Voltar para a pesquisa
              </a>
            </Row>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form
              layout="vertical"
              onFinish={onFinish}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Por favor, insira seu usuário!" },
                ]}
              >
                <Input
                  placeholder="Insira seu usuário"
                  style={{ color: "white", padding: "14px" }}
                />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Por favor, insira seu usuário!" },
                ]}
              >
                <Input
                  placeholder="Insira o seu e-mail"
                  style={{ color: "white", padding: "14px" }}
                />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Por favor, insira seu usuário!" },
                ]}
              >
                <Input
                  placeholder="Digite sua senha"
                  style={{ color: "white", padding: "14px" }}
                />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Por favor, insira seu usuário!" },
                ]}
              >
                <Input
                  placeholder="Repita a mesma senha"
                  style={{ color: "white", padding: "14px" }}
                />
              </Form.Item>
              <Row flex="auto" style={{ marginBottom: "" }} />
              <Form.Item style={{ marginBottom: 0 }}>
                <Row justify="end" gutter={20} align="middle">
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <b>
                      <a href="/login" style={{ color: COLORS.purple }}>
                        Já tenho uma conta
                      </a>
                    </b>
                  </Col>
                  <Col>
                    <Button
                      style={{
                        backgroundColor: COLORS.purple,
                        color: COLORS.dark_gray,
                        borderRadius: "30px",
                        padding: "23px",
                        boxShadow: "none",
                        color: "white",
                      }}
                      type="primary"
                      htmlType="submit"
                    >
                      <b>Criar conta</b>
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </Content>
  );
};

export default Register;
