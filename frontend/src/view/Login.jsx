import { Card, Form, Input, Button, Row, Col, Grid } from "antd";
import { Content } from "antd/es/layout/layout";
import UAISearch from "../components/UAISearch";
import COLORS from "../colors";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useAuthService } from "../api/Authorization.api";
import { useEffect, useState } from "react";

const { useBreakpoint } = Grid;

const Login = () => {
  const { login } = useAuthService();
  const { t } = useTranslation();
  const [loginForm] = useForm();
  const screens = useBreakpoint();
  const [isMobile, setIsMobile] = useState(false);

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
    const data = login(values);

  };

  return (
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
          minHeight: isMobile ? "auto" : "400px",
          minWidth: isMobile ? "auto" : "800px",
          maxWidth: isMobile ? "100%" : "900px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Row style={{ 
          flex: 1, 
          width: "100%", 
          flexDirection: isMobile ? "column" : "row",
          marginBottom: isMobile ? "60px" : 0 
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
                {t("make_login")}
              </h1>
            </Row>
            <Row>
              <Link style={{ color: COLORS.white}} to="/"> <IoMdArrowRoundBack /> {t("go_back_to_search")}</Link>
            </Row>
          </Col>
          <Col
            xs={24} sm={24} md={12} lg={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              height: "100%",
              marginTop: isMobile ? "20px" : 0,
            }}
          >
            <Form
              layout="vertical"
              onFinish={onFinish}
              form={loginForm}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
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
              to="/register"
            >
              {t("register")}
            </Link>
          </b>
          <Button
            type="primary"
            onClick={() => { loginForm.submit() }}
            style={{
              padding: "18px",
              borderRadius: "999px",
              boxShadow: "none",
              backgroundColor: COLORS.purple,
              width: isMobile ? "100%" : "auto",
            }}
          >
            <b>{t("login")}</b>
          </Button>
        </div>
      </Card>
    </Content>
  );
};

export default Login;