import { Typography } from "antd";
import { APP_NAME_UPPERCASE } from "../constants";
const { Title } = Typography;


const AISearch = () => {
  return (
    <Title
      level={1}
      style={{
        color: "#e8eaed",
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
