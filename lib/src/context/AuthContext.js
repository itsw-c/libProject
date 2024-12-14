import React, { createContext, useState, useContext, useEffect } from 'react';

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
  const [likedBooks, setLikedBooks] = useState([]); // 찜 목록 상태

  // 로그인 상태가 바뀔 때 찜 목록을 로컬스토리지에서 불러오는 useEffect
  useEffect(() => {
    if (isLoggedIn && username) {
      // 로그인 상태일 때만 로컬스토리지에서 찜 목록을 불러옴
      const storedLikedBooks = JSON.parse(localStorage.getItem(`likedBooks_${username}`)) || [];
      setLikedBooks(storedLikedBooks); // 찜 목록을 로컬스토리지에서 불러옴
    }
  }, [isLoggedIn, username]);

  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    const storedLikedBooks = JSON.parse(localStorage.getItem(`likedBooks_${user}`)) || [];
    setLikedBooks(storedLikedBooks); // 로그인 시 찜 목록을 로컬스토리지에서 불러옴
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setLikedBooks([]); // 로그아웃 시 찜 목록 초기화
  };

  // 찜 목록을 업데이트하는 함수
  const updateLikedBooks = (newLikedBooks) => {
    setLikedBooks(newLikedBooks);
    if (isLoggedIn && username) {
      localStorage.setItem(`likedBooks_${username}`, JSON.stringify(newLikedBooks)); // 사용자별 찜 목록을 로컬스토리지에 저장
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout, likedBooks, updateLikedBooks }}>
      {children}
    </AuthContext.Provider>
  );
};
