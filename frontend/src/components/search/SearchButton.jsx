import { Button } from "antd";
import COLORS from "../../colors";
import { useTranslation } from "react-i18next";

const SearchButton = () => {
  const { t } = useTranslation();
  
  return (
    <Button
      style={{
        borderRadius: "4px",
        backgroundColor: "#303134",
        color: COLORS.white,
        borderColor: "#5f6368",
        border: "0px",
      }}
      size="middle"
    >
      {t("search_on_brand")}
    </Button>
  );
};

export default SearchButton;
