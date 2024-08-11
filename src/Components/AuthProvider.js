import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    return savedAuth === "true"; // 문자열로 저장된 값이므로 "true"와 비교
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  /*
  useEffect(() => {
    // 로그인이 되면 localStorage에 상태를 저장
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    }
  }, [isAuthenticated, user]);
  */

  useEffect(() => {
    /* 백엔드 구현 전까지는 로그인 상태 유지
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token).then((userData) => {
        setUser(userData);
        setIsAuthenticated(true);
      });
    }
    */
  }, []);

  const login = async (username, password) => {
    /* 백엔드 구현한 후 필요
    const token = await authenticate(username, password);
    localStorage.setItem("token", token);
    const userData = await fetchUserData(token);
    setUser(userData);
    setIsAuthenticated(true);
    */
    setIsAuthenticated(true);
    const userData = { name: username || "AI KID" };
    setUser(userData);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
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

/* 백엔드 구현 후 필요
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
*/