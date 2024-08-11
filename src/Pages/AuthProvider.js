import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token).then((userData) => {
        setUser(userData);
        setIsAuthenticated(true);
      });
    }
  }, []);

  const login = async (username, password) => {
    const token = await authenticate(username, password);
    localStorage.setItem("token", token);
    const userData = await fetchUserData(token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

async function authenticate(username, password) {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (response.ok) {
    return data.token; // JWT 토큰
  }
  throw new Error("Authentication failed");
}

async function fetchUserData(token) {
  const response = await fetch("/api/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    return response.json(); // 사용자 정보
  }
  throw new Error("Failed to fetch user data");
}
