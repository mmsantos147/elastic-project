import { FiLink2 } from "react-icons/fi";
import COLORS from "../../colors";

const IAVisionAbstract = ( {children, href} ) => {
  return (
    <span style={{ fontSize: "18px", lineHeight: "30px", textAlign: "justify" }}>
      {children}
      <a href={href}>
        <FiLink2
          style={{
            backgroundColor: "#397b82",
            padding: "3px",
            fontSize: "23px",
            color: COLORS.white,
            borderRadius: "99px",
            width: "40px",
            verticalAlign: "middle",
            marginLeft: "13px",
          }}
        />
      </a>
    </span>
  );
};

export default IAVisionAbstract;
