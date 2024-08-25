import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

// 개발 환경용 테스트 계정
const DEV_EMAIL = "pms797@naver.com";
const DEV_PASSWORD = "qkrahtp";

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    console.log("Login attempt:", email, password); // 로그인 시도 로깅
    console.log("Current environment:", process.env.NODE_ENV); // 현재 환경 로깅

    try {
      if (process.env.NODE_ENV === 'development') {
        console.log("Development mode login");
        if (email === DEV_EMAIL && password === DEV_PASSWORD) {
          console.log("Login successful in dev mode");
          const devUser = { id: 1, email: DEV_EMAIL, name: "한이음 사용자" };
          setIsAuthenticated(true);
          setUser(devUser);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(devUser));
        } else {
          console.log("Login failed in dev mode: incorrect credentials");
          throw new Error('로그인 실패: 잘못된 이메일 또는 비밀번호입니다.');
        }
      } else {
        console.log("Production mode login");
        // 프로덕션 환경에서의 로그인 로직
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser && savedUser.email === email) {
          console.log("Login successful in production mode");
          setIsAuthenticated(true);
          setUser(savedUser);
          localStorage.setItem('isAuthenticated', 'true');
        } else {
          console.log("Login failed in production mode: user not found");
          throw new Error('로그인 실패: 사용자 정보를 찾을 수 없습니다.');
        }
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
