import { Card, Form, Input, Button, Row, Col, Grid } from "antd";
import { Content } from "antd/es/layout/layout";
import UAISearch from "../components/UAISearch";
import COLORS from "../colors";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuthService } from "../api/Authorization.api";
import { useForm } from "antd/es/form/Form";
import { SecurityWarning } from "../components/SecurityWarning";
import { useEffect, useState } from "react";

const { useBreakpoint } = Grid;

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { register } = useAuthService();
  const [form] = useForm();
  const screens = useBreakpoint();
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const onFinish = async (values) => {
    const data = await register(values);
    if (data.success)
      navigate("/login");
  };

  return (
    <>
      <SecurityWarning />
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: isMobile ? "20px" : 0,
        }}
      >
        <Card
          style={{
            width: isMobile ? "100%" : "50%",
            padding: isMobile ? "20px" : "30px",
            backgroundColor: COLORS.dark_gray,
            borderColor: "rgba(0,0,0,0)",
            borderRadius: isMobile ? "20px" : "30px",
            minWidth: isMobile ? "auto" : "800px",
            maxWidth: isMobile ? "100%" : "900px",
            height: isMobile ? "auto" : "450px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Row style={{ 
            flex: 1, 
            width: "100%",
            flexDirection: isMobile ? "column" : "row",
            marginBottom: isMobile ? "80px" : 0
          }}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Row>
                <UAISearch logoWidth={isMobile ? 200 : 300} style={{ marginBottom: isMobile ? "15px" : "30px" }} />
              </Row>
              <Row>
                <h1
                  style={{
                    color: COLORS.white,
                    fontSize: isMobile ? "28px" : "40px",
                    marginBottom: "0px",
                  }}
                >
                  {t("register_now")}
                </h1>
              </Row>
              <Row>
                <Link to="/" style={{ color: COLORS.white }}>
                  {" "}
                  <IoMdArrowRoundBack /> {t("go_back_to_search")}
                </Link>
              </Row>
            </Col>
            <Col
              xs={24} sm={24} md={12} lg={12}
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: isMobile ? "20px" : 0,
              }}
            >
              <Form
                layout="vertical"
                onFinish={onFinish}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                form={form}
              >
                <Form.Item
                  name="userName"
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
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: t("please_insert_your_email"),
                    },
                    {
                      type: "email",
                      message: t("insert_a_valid_email"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("insert_your_email")}
                    style={{ color: "white", padding: "14px" }}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: t("please_insert_your_password"),
                    },
                  ]}
                >
                  <Input.Password
                    placeholder={t("insert_your_password")}
                    style={{ color: "white", padding: "14px" }}
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: t("please_confirm_your_password"),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(t("passwords_do_not_match"))
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder={t("confirm_password")}
                    style={{ color: "white", padding: "14px" }}
                  />
                </Form.Item>
              </Form>
            </Col>
            <div
              style={{
                position: isMobile ? "static" : "absolute",
                bottom: isMobile ? "auto" : 30,
                right: isMobile ? "auto" : 30,
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center",
                gap: "20px",
                marginTop: isMobile ? "10px" : 0,
                width: isMobile ? "100%" : "auto",
              }}
            >
              <b>
                <Link 
                  style={{ 
                    color: COLORS.purple,
                    textAlign: isMobile ? "center" : "left",
                    display: isMobile ? "block" : "inline"
                  }} 
                  to="/login"
                >
                  {t("already_have_a_account")}
                </Link>
              </b>
              <Button
                type="primary"
                style={{
                  padding: "18px",
                  borderRadius: "999px",
                  boxShadow: "none",
                  backgroundColor: COLORS.purple,
                  width: isMobile ? "100%" : "auto",
                }}
                onClick={() => {
                  form.submit();
                }}
              >
                <b>{t("create_account")}</b>
              </Button>
            </div>
          </Row>
        </Card>
      </Content>
    </>
  );
};

export default Register;