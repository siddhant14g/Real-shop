import React, { createContext, useEffect, useState } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage so refresh retains the session
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const [token, setToken] = useState(storedToken || null);
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [loading, setLoading] = useState(false);

  // Keep axios Authorization header in sync
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Sync across tabs (login/logout in another tab updates this tab)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "token") {
        setToken(e.newValue);
        if (!e.newValue) {
          setUser(null);
        } else {
          const u = localStorage.getItem("user");
          setUser(u ? JSON.parse(u) : null);
        }
      }
      if (e.key === "user") {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Helper: login stores token+user and sets axios header
  const login = (userData, jwt) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", jwt);
      setUser(userData);
      setToken(jwt);
      api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    } catch (err) {
      console.error("Auth login error:", err);
    }
  };

  // Helper: logout clears everything
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    delete api.defaults.headers.common["Authorization"];
  };

  // Optional: verify token on mount (non-blocking). Uncomment if you add a /auth/me route.
  // useEffect(() => {
  //   const verify = async () => {
  //     if (!token) return;
  //     setLoading(true);
  //     try {
  //       const res = await api.get("/auth/me"); // optional endpoint
  //       setUser(res.data.user);
  //     } catch (err) {
  //       console.warn("Token verify failed, logging out");
  //       logout();
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   verify();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
