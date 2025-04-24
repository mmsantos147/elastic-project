import React, { useEffect, useState } from "react";
import { Layout, Button, Space, Typography } from "antd";
import { SunOutlined } from "@ant-design/icons";
import { BsCloudsFill } from "react-icons/bs";
import { IoCloudSharp } from "react-icons/io5";
import { FaCloudSunRain } from "react-icons/fa";
import { FaCloudShowersHeavy } from "react-icons/fa6";
import { IoThunderstormSharp } from "react-icons/io5";
import { BsFillCloudSnowFill } from "react-icons/bs";
import { BsCloudFog2Fill } from "react-icons/bs";
import { FaCloudSun } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import weatherApi from "../api/weather.api";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

const DefaultHeader = ({ children }) => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState({"id":804,"group":"Clouds","city":"Alfenas","temperature":22,"description":"overcast clouds"})
  const navigate = useNavigate();

  const weatherDescription = {
    "Drizzle": <FaCloudSunRain style={{ fontSize: "20px", color: "#fff" }}/>,
    "Rain": <FaCloudShowersHeavy style={{ fontSize: "20px", color: "#fff" }}/>,
    "Thunderstorm": <IoThunderstormSharp style={{ fontSize: "20px", color: "#fff" }}/>,
    "Snow": <BsFillCloudSnowFill style={{ fontSize: "20px", color: "#fff" }}/>,
    "Atmosphere": <BsCloudFog2Fill style={{ fontSize: "20px", color: "#fff" }}/>,
    "Clear": <SunOutlined style={{ fontSize: "20px", color: "#fff" }} />,
    "Clouds": <FaCloudSun style={{ fontSize: "20px", color: "#fff" }}/>,
  }

  useEffect( () => {
    const updateWeather = async () => {
      const weaterResponse = await weatherApi.weather();
      setWeather(weaterResponse)
    }
    updateWeather();
  }, []);

  return (
    <Header
      style={{
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          width: "50%",
        }}
      >
        {children}
      </div>

      <Space size="large">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {weatherDescription[weather.group]}
          <Text style={{ fontWeight: "bold", color: "#fff" }}>{weather.temperature} °C</Text>
        </div>
        <div>
          <LanguageSelector />
        </div>
        <Link to="/login">
          <Button
            type="primary"
            style={{ padding: "18px", borderRadius: "999px", boxShadow: "none" }}
          >
            <b>{t("make_login")}</b>
          </Button>
        </Link>
      </Space>
    </Header>
  );
};

export default DefaultHeader;
