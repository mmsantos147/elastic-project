import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const GenericLoginButton = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Link to="/login">
        <Button
          type="primary"
          style={{
            padding: "18px",
            borderRadius: "999px",
            boxShadow: "none",
            width: "100%",
          }}
        >
          <b>{t("make_login")}</b>
        </Button>
      </Link>
    </div>
  );
};
