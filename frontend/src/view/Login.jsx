import { Card, Form, Input, Button, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import UAISearch from "../components/UAISearch";
import COLORS from "../colors";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
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
                {t("make_login")}
              </h1>
            </Row>
            <Row>
              <a style={{ color: COLORS.white}} href="/"> <IoMdArrowRoundBack /> {t("go_back_to_search")}</a>
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
                    message: t("please_insert_your_username"),
                  },
                ]}
              >
                <Input
                  placeholder={t("insert_your_username")}
                  style={{ color: "white", padding: "14px" }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: t("please_insert_your_password")},
                ]}
              >
                <Input.Password
                  placeholder={t("insert_your_password")}
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
              {t("register")}
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
            <b>{t("login")}</b>
          </Button>
        </div>
      </Card>
      ;
    </Content>
  );
};

export default Login;
