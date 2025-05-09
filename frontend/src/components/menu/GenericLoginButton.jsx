import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const GenericLoginButton = () => {
  const { t } = useTranslation();
  
  return (
    <div style={{ marginTop: "20px" }}>
      <Link to="/login">
        <Button
          type="primary"
          style={{
            padding: "18px",
            borderRadius: "999px",
            boxShadow: "none",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <b>{t("make_login")}</b>
        </Button>
      </Link>
    </div>
  );
};
