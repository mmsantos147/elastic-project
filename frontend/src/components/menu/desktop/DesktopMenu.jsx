import { Space } from "antd";
import WeatherReport from "../WeatherReport";
import LanguageSelector from "../LanguageSelector";
import { useAuthData } from "../../../context/AuthContext";
import { FaCircleUser } from "react-icons/fa6";
import { GenericLoginButton } from "../GenericLoginButton";
import { useRef, useState } from "react";
import { DesktopMenuContent } from "./DesktopMenuContent";

export const DesktopMenu = () => {
  const { isLogged } = useAuthData();
  const userIconRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Space size="large">
      <WeatherReport />
      <LanguageSelector />
      {isLogged ? (
        <>
          <div
            ref={userIconRef}
            style={{
              padding: "10px",
              cursor: "pointer",
              alignContent: "center",
              display: "flex",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaCircleUser style={{ color: "white" }} size={30} />
          </div>

          <DesktopMenuContent
            visible={menuOpen}
            ref={menuRef}
            onClose={() => setMenuOpen(false)}
          />
        </>
      ) : 
        <GenericLoginButton />
      }
    </Space>
  );
};
