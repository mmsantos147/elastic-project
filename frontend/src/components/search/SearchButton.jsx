import { Button } from "antd";
import COLORS from "../../colors";
import { useTranslation } from "react-i18next";

const SearchButton = () => {
  const { t } = useTranslation();
  
  return (
    <Button
      style={{
        backgroundColor: "#303134",
        color: COLORS.white,
        border: "none",
      }}
      size="middle"
    >
      {t("search_on_brand")}
    </Button>
  );
};

export default SearchButton;
