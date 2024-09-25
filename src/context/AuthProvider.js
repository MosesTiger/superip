import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

// 개발 환경용 테스트 계정
const DEV_EMAIL = "test";
const DEV_PASSWORD = "qkrahtp";

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || '';
  });

  const login = (email, password) => {
    console.log("Login attempt:", email, password);
    console.log("Current environment:", process.env.NODE_ENV);

    try {
      if (process.env.NODE_ENV === 'development') {
        console.log("Development mode login");
        if (email === DEV_EMAIL && password === DEV_PASSWORD) {
          console.log("Login successful in dev mode");
          const devUser = { id: 1, email: DEV_EMAIL, name: "한이음 사용자" };
          const devToken = btoa(`${email}:${password}`); // 간단한 토큰 생성
          setIsAuthenticated(true);
          setUser(devUser);
          setToken(devToken);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(devUser));
          localStorage.setItem('token', devToken);
        } else {
          throw new Error('로그인 실패: 잘못된 이메일 또는 비밀번호입니다.');
        }
      } else {
        console.log("Production mode login");
        // 프로덕션 환경에서의 로그인 로직
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser && savedUser.email === email) {
          console.log("Login successful in production mode");
          const prodToken = btoa(`${email}:${Date.now()}`); // 프로덕션용 간단한 토큰
          setIsAuthenticated(true);
          setUser(savedUser);
          setToken(prodToken);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('token', prodToken);
        } else {
          throw new Error('로그인 실패: 사용자 정보를 찾을 수 없습니다.');
        }
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert(error.message);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 백엔드 요청 관련 함수는 주석 처리
/*
async function fetchUserData(token) {
  const response = await fetch('/api/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    return response.json(); 
  }
  throw new Error('Failed to fetch user data');
}
*/
