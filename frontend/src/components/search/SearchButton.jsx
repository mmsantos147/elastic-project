import { Button } from "antd";
import { APP_NAME_CAMMEL_CASE } from "../../constants";
import COLORS from "../../colors";

const SearchButton = () => {
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
      Pesquisa {`${APP_NAME_CAMMEL_CASE}`}
    </Button>
  );
};

export default SearchButton;