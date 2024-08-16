import { useState, useEffect, useContext, createContext } from "react";

// AuthContext 생성
const AuthContext = createContext();

// useAuth 훅 정의
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider 컴포넌트 정의
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // 이 부분은 주석 처리해 두세요.
    /*
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token).then((userData) => {
        setUser(userData);
        setIsAuthenticated(true);
      }).catch(() => {
        logout();
      });
    }
    */
  }, []);

  const login = (email, password) => {
    try {
      // 이 부분도 주석 처리해 두세요.
      /*
      const response = await fetch('/api/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('로그인 실패');
      }

      const data = await response.json();

      // 백엔드에서 받은 토큰과 사용자 정보를 저장
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(data.user));
      */
      
      //-----------------------------------------------
      //프론트 연결위해 임시 구현
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser && savedUser.email === email) {
        setIsAuthenticated(true);
        setUser(savedUser);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        throw new Error('로그인 실패: 사용자 정보를 찾을 수 없습니다.');
      }
      //-----------------------------------------------

    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인 중 오류가 발생했습니다.');
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
