import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (key) => {
    setApiKey(key);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setApiKey("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ apiKey, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
