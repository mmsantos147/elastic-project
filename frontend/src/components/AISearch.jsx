import { Typography } from "antd";
import { APP_NAME_UPPERCASE } from "../constants";
import COLORS from "../colors";
const { Title } = Typography;


const AISearch = () => {
  return (
    <Title
      level={1}
      style={{
        color: COLORS.white,
        fontSize: "60px",
        marginBottom: "40px",
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      {`${APP_NAME_UPPERCASE}`}
    </Title>
  );
};

export default AISearch;
