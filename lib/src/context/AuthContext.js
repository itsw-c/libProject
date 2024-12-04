import React, { createContext, useState, useContext } from 'react';

// 로그인 상태를 관리하는 Context 생성
const AuthContext = createContext();

// Custom Hook: 로그인 상태 및 상태 변경 함수 사용
export const useAuth = () => {
  return useContext(AuthContext);
};

// Context Provider: 자식 컴포넌트에 상태를 제공
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [username, setUsername] = useState(''); // 아이디

  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
