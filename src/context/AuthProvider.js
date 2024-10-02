import { useState, useContext, createContext } from "react";
import axios from 'axios'; // axios import 추가

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
      const response = await axios.post('http://43.200.200.147/api/token', {
        username: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.status === 200) {
        const { access_token } = response.data;
        setIsAuthenticated(true);
        setToken(access_token);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", access_token);

        // 사용자 정보 가져오기
        const userResponse = await axios.get('http://43.200.200.147/api/users/me', {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        if (userResponse.status === 200) {
          const userData = userResponse.data;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          throw new Error("사용자 정보를 가져오는데 실패했습니다.");
        }
      } else {
        throw new Error("로그인에 실패했습니다.");
      }
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

  const refreshToken = async () => {
    try {
      const response = await axios.post('http://43.200.200.147/api/token/refresh', {
        refresh_token: localStorage.getItem("refreshToken")
      });

      if (response.status === 200) {
        const { access_token } = response.data;
        setToken(access_token);
        localStorage.setItem("token", access_token);
        return access_token;
      } else {
        throw new Error("토큰 갱신에 실패했습니다.");
      }
    } catch (error) {
      console.error("토큰 갱신 중 오류 발생:", error);
      logout();
      throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}