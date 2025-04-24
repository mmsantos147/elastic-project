import { Card, Form, Input, Button, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import UAISearch from "../components/UAISearch";
import COLORS from "../colors";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
                {t("register_now")}
              </h1>
            </Row>
            <Row>
              <a style={{ color: COLORS.white }} onClick={() => {navigate("/")}}>
                {" "}
                <IoMdArrowRoundBack /> {t("go_back_to_search")}
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
                  { required: true, message: t("please_insert_your_username") },
                ]}
              >
                <Input
                  placeholder={t("insert_your_username")}
                  style={{ color: "white", padding: "14px" }}
                />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: t("please_insert_your_email") },
                ]}
              >
                <Input
                  placeholder={t("insert_your_email")}
                  style={{ color: "white", padding: "14px" }}
                />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: t("please_insert_your_password")},
                ]}
              >
                <Input
                  placeholder={t("insert_your_password")}
                  style={{ color: "white", padding: "14px" }}
                />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: t("please_confirm_your_password") },
                ]}
              >
                <Input
                  placeholder={t("confirm_password")}
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
                      <a style={{ color: COLORS.purple }} onClick={() => {navigate("/login")}}>
                        {t("already_have_a_account")}
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
                      <b>{t("create_account")}</b>
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
