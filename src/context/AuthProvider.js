/*
import { useState, useContext, createContext } from "react";
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

  const login = async (email, password) => {
    try {
      // 로그인 요청
      const response = await axios.post('http://43.200.200.147/api/v1/token', 
        new URLSearchParams({
          'username': email,
          'password': password
        }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const { access_token } = response.data;

      // 로그인 성공 처리
      setIsAuthenticated(true);
      setToken(access_token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", access_token);

      // 사용자 정보 가져오기
      const userResponse = await axios.get('http://43.200.200.147/api/v1/users/me', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });

      const userData = userResponse.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      if (error.response) {
        throw new Error(`로그인 실패: ${error.response.data.detail}`);
      } else if (error.request) {
        throw new Error('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
      } else {
        throw new Error('로그인 요청 중 오류가 발생했습니다.');
      }
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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
*/

import { useState, useContext, createContext } from "react";

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

  const login = (email, password) => {
    // 하드코딩된 로그인 정보
    const hardcodedUser = {
      email: "test",
      password: "test",
      name: "한이음",
      token: "sampleToken12345", // 임시 토큰
    };

    if (email === hardcodedUser.email && password === hardcodedUser.password) {
      // 로그인 성공 처리
      setIsAuthenticated(true);
      setUser({ email: hardcodedUser.email, name: hardcodedUser.name });
      setToken(hardcodedUser.token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({ email: hardcodedUser.email, name: hardcodedUser.name }));
      localStorage.setItem("token", hardcodedUser.token);
    } else {
      throw new Error("로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다.");
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
