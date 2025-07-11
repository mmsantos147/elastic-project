import { createContext, useContext, useEffect, useState } from "react";
import { useAuthService } from "../api/Authorization.api";
import { useWeatherService } from "../api/Weather.api";
import { useFavoriteSearch } from "../api/Favorite.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { verify, login: apiLogin, logout: apiLogout } = useAuthService();
  const { getAllFavorites } = useFavoriteSearch();
  const { getWeatherCondition } = useWeatherService();

  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [favoriteItems, setFavoriteItems] = useState([])
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
    const loadFavorites = async () => {
      const favorites = await getAllFavorites();
      setFavoriteItems(favorites);
    };
    loadFavorites();
  }, [])

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

  const verifyIfInFavorites = (id) => {
    return favoriteItems.some(item => item.elasticId === id)
  }

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
        logout,

        favoriteItems,
        setFavoriteItems,
        verifyIfInFavorites
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthData = () => useContext(AuthContext);
