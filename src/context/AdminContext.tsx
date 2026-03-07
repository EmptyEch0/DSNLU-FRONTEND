import { createContext, useContext, useState, useEffect } from "react";

interface AdminContextType {
  token: string | null;
  isAdminMode: boolean;
  login: (token: string) => void;
  logout: () => void;
  toggleAdminMode: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("adminToken", token);
    setToken(token);
    setIsAdminMode(true);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setIsAdminMode(false);
  };

  const toggleAdminMode = () => {
    setIsAdminMode((prev) => !prev);
  };

  return (
    <AdminContext.Provider value={{ token, isAdminMode, login, logout, toggleAdminMode }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be inside AdminProvider");
  return context;
};
