import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { SunOutlined } from "@ant-design/icons";
import { FaCloudSunRain } from "react-icons/fa";
import { FaCloudShowersHeavy } from "react-icons/fa6";
import { IoThunderstormSharp } from "react-icons/io5";
import { BsFillCloudSnowFill } from "react-icons/bs";
import { BsCloudFog2Fill } from "react-icons/bs";
import { FaCloudSun } from "react-icons/fa";
import weatherApi from "../api/weather.api";

const { Text } = Typography;

const WeatherReport = () => {
  const [weather, setWeather] = useState({
    id: 804,
    group: "Clouds",
    city: "Alfenas",
    temperature: 22,
    description: "overcast clouds",
  });

  const weatherDescription = {
    Drizzle: <FaCloudSunRain style={{ fontSize: "20px", color: "#fff" }} />,
    Rain: <FaCloudShowersHeavy style={{ fontSize: "20px", color: "#fff" }} />,
    Thunderstorm: <IoThunderstormSharp style={{ fontSize: "20px", color: "#fff" }} />,
    Snow: <BsFillCloudSnowFill style={{ fontSize: "20px", color: "#fff" }} />,
    Atmosphere: <BsCloudFog2Fill style={{ fontSize: "20px", color: "#fff" }} />,
    Mist: <BsCloudFog2Fill style={{ fontSize: "20px", color: "#fff" }} />,
    Clear: <SunOutlined style={{ fontSize: "20px", color: "#fff" }} />,
    Clouds: <FaCloudSun style={{ fontSize: "20px", color: "#fff" }} />,
  };

  useEffect(() => {
    const updateWeather = async () => {
      const weaterResponse = await weatherApi.weather();
      setWeather(weaterResponse);
    };
    updateWeather();
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {weatherDescription[weather.group]}
      <Text style={{ fontWeight: "bold", color: "#fff" }}>
        {weather.temperature} °C
      </Text>
    </div>
  );
};

export default WeatherReport;