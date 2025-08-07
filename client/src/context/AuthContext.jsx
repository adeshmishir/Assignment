import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('apiKey') || '');

  const login = (key) => {
    setApiKey(key);
    localStorage.setItem('apiKey', key);
  };

  const logout = () => {
    setApiKey('');
    localStorage.removeItem('apiKey');
  };

  return (
    <AuthContext.Provider value={{ apiKey, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
