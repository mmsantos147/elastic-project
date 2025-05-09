import { createContext, useContext, useEffect, useState } from "react";
import { useAuthService } from "../api/Authorization.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { verify } = useAuthService();

  const [isLogged, setIsLogged] = useState(true);
  const [username, setUsername] = useState("carlinhos");

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

  return (
    <AuthContext.Provider value={{ isLogged, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthData = () => useContext(AuthContext);
