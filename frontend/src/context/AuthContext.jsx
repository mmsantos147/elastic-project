import { createContext, useContext, useEffect, useState } from "react";
import { useAuthService } from "../api/Authorization.api";
import { useWeatherService } from "../api/Weather.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { verify, login: apiLogin, logout: apiLogout } = useAuthService();
  const { getWeatherCondition } = useWeatherService();

  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [weather, setWeather] = useState({
    id: 804,
    group: "Clouds",
    city: "Alfenas",
    temperature: 22,
    description: "overcast clouds",
  });

  const checkLogin = async () => {
    const data = await verify();
    setIsLogged(data.logged);
    setUsername(data.logged ? data.username : "");
  };

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    const updateWeather = async () => {
      const weaterResponse = await getWeatherCondition();
      setWeather(weaterResponse);
    };
    updateWeather();
  }, []);

  const login = async (credentials) => {
    const response = await apiLogin(credentials);
    if (response.success) {
      await checkLogin();
    }
    return response;
  };

  const logout = async () => {
    await apiLogout();
    await checkLogin();
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        username,
        weather,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthData = () => useContext(AuthContext);
