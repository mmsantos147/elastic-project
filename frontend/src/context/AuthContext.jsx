import { createContext, useContext, useEffect, useState } from "react";
import { useAuthService } from "../api/Authorization.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { verify } = useAuthService();

  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [weather, setWeather] = useState({
    id: 804,
    group: "Clouds",
    city: "Alfenas",
    temperature: 22,
    description: "overcast clouds",
  });

  useEffect(() => {
    const verifyUser = async () => {
      const data = await verify();

      if (data.logged) {
        setIsLogged(data.logged);
        setUsername(data.username);
      }
    };

    verifyUser();
  }, []);

  useEffect(() => {
    const updateWeather = async () => {
      const weaterResponse = await getWeatherCondition();
      setWeather(weaterResponse);
    };
    updateWeather();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        username,
        weather
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthData = () => useContext(AuthContext);
