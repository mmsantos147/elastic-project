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

const { Header } = Layout;
const { Text } = Typography;

const DefaultHeader = ({ children }) => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState({"city":"São Paulo","temperature":24,"description":"broken clouds"})

  const weatherDescription = {
    "broken clouds": <BsCloudsFill style={{ fontSize: "20px", color: "#fff" }}/>,
    "scattered clouds": <IoCloudSharp style={{ fontSize: "20px", color: "#fff" }}/>,
    "shower rain": <FaCloudSunRain style={{ fontSize: "20px", color: "#fff" }}/>,
    "rain": <FaCloudShowersHeavy style={{ fontSize: "20px", color: "#fff" }}/>,
    "thunderstorm": <IoThunderstormSharp style={{ fontSize: "20px", color: "#fff" }}/>,
    "snow": <BsFillCloudSnowFill style={{ fontSize: "20px", color: "#fff" }}/>,
    "mist": <BsCloudFog2Fill style={{ fontSize: "20px", color: "#fff" }}/>,
    "clear sky": <SunOutlined style={{ fontSize: "20px", color: "#fff" }} />,
    "few clouds": <FaCloudSun style={{ fontSize: "20px", color: "#fff" }}/>,

  }

  useEffect( () => {
    const updateWeather = async () => {
      const weaterResponse = weatherApi.weather();
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
          {weatherDescription[weather.description]}
          <Text style={{ fontWeight: "bold", color: "#fff" }}>{weather.temperature} °C</Text>
        </div>
        <div>
          <LanguageSelector />
        </div>
        <a href="/login">
          <Button
            type="primary"
            style={{ padding: "18px", borderRadius: "999px", boxShadow: "none" }}
          >
            <b>{t("make_login")}</b>
          </Button>
        </a>
      </Space>
    </Header>
  );
};

export default DefaultHeader;
