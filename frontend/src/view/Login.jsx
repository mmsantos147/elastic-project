import { Card, Form, Input, Button, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import UAISearch from "../components/UAISearch";
import COLORS from "../colors";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import LanguageSelector from "../components/LanguageSelector";
import { IoMdArrowRoundBack } from "react-icons/io";

const Login = () => {
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
          height: "400px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Row style={{ flex: 1, width: "100%", height: "300px" }}>
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
                Fazer login
              </h1>
            </Row>
            <Row>
              <a style={{ color: COLORS.white}} href="/"> <IoMdArrowRoundBack /> Voltar para a pesquisa</a>
            </Row>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              height: "100%",
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
                  {
                    required: true,
                    message: "Por favor, insira seu usuário!",
                  },
                ]}
              >
                <Input
                  placeholder="Insira seu usuário ou e-mail"
                  style={{ color: "white", padding: "14px" }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Por favor, insira sua senha!" },
                ]}
              >
                <Input.Password
                  placeholder="Senha"
                  style={{ color: "white", padding: "14px" }}
                  iconRender={(visible) =>
                    visible ? (
                      <EyeOutlined style={{ color: COLORS.white }} />
                    ) : (
                      <EyeInvisibleOutlined style={{ color: COLORS.white }} />
                    )
                  }
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>

        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <b>
            <a style={{ color: COLORS.purple }} href="/register">
              Registrar
            </a>
          </b>
          <Button
            type="primary"
            style={{
              padding: "18px",
              borderRadius: "999px",
              boxShadow: "none",
              backgroundColor: COLORS.purple,
            }}
          >
            <b>Logar</b>
          </Button>
        </div>
      </Card>
      ;
    </Content>
  );
};

export default Login;
