// src/context/AuthProvider.js
import React, { useState, useContext, createContext, useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  useEffect(() => {
    if (token) {
      axios.get('http://127.0.0.1:8000/api/v1/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setIsAuthenticated(true);
      })
      .catch(error => {
        console.error("Failed to fetch user profile:", error);
        logout();
      });
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/token', {
        username: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const { access_token } = response.data;
      setToken(access_token);
      localStorage.setItem("token", access_token);
      // useEffect가 나머지 작업을 수행할 것입니다.
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const register = async (email, password, fullName, username) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/register', {
        email,
        password,
        full_name: fullName,
        username,
        social_provider: "LOCAL",
        social_id: null
      });
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}