import React, { createContext, useContext, useState, useEffect } from "react";
import { post } from "../services/api";

interface UserContextType {
  token: string | null;
  isAdmin: boolean;
  login: (userData: string, token: string) => void;
  logout: () => void;
  checkAdmin: () => void;
}

interface responseData {
  status: number;
  message: string;
}

interface adminData {
  status: number;
  data: {
    name_EN: string;
    name_TH: string;
    email: string;
  };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Check for existing token on component mount
  useEffect(() => {
    const existingToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (existingToken) {
      setToken(existingToken);
    }
  }, []);

  const checkAdmin = async () => {
    try {
      const response = (await post("/api/adminProfile", {
        token: token,
      })) as adminData;
      if (response.status === 200 && response.data) {
        setIsAdmin(true);
      }
    } catch (error) {
      setIsAdmin(false);
      console.error("Error during admin check", error);
    }
  };

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = async () => {
    try {
      const response = (await post("/api/logout", {
        token: token,
      })) as responseData;
      if (response.status === 200) {
        setToken(null);
        localStorage.removeItem("token");
        // setIsAdmin(false);
        
        document.cookie =
          "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("isAdmin");
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <UserContext.Provider value={{ token, login, logout, checkAdmin, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
