import { Card, Form, Input, Button, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import UAISearch from "../components/UAISearch";
import COLORS from "../colors";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuthService } from "../api/Authorization.api";
import { useForm } from "antd/es/form/Form";

const Register = () => {
  const { t } = useTranslation();
  const { register } = useAuthService();
  const [ form ] = useForm();
  const onFinish = async (values) => {
    await register(values)
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
              <Link to="/" style={{ color: COLORS.white }}>
                {" "}
                <IoMdArrowRoundBack /> {t("go_back_to_search")}
              </Link>
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
              form={form}
            >
              <Form.Item
                name="userName"
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
                  { required: true, message: t("please_insert_your_password") },
                ]}
              >
                <Input
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
                <Input
                  placeholder={t("confirm_password")}
                  style={{ color: "white", padding: "14px" }}
                />
              </Form.Item>
            </Form>
          </Col>
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
              <Link style={{ color: COLORS.purple }} to="/login">
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
              }}
              onClick={() => {form.submit()}}
            >
              <b>{t("create_account")}</b>
            </Button>
          </div>
        </Row>
      </Card>
    </Content>
  );
};

export default Register;
