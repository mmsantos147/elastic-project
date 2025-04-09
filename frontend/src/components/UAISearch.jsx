import { Typography } from "antd";
import COLORS from "../colors";
const { Title } = Typography;
import uaiSearchLogo from '../assets/uaisearch.svg'


const UAISearch = () => {
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
      <img src={uaiSearchLogo} width="380px"/>
    </Title>
  );
};

export default UAISearch;
