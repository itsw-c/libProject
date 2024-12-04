import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext 사용
import logoImage from '../assets/logotypo.png';

function Header() {
  const { isLoggedIn, logout } = useAuth(); // 로그인 상태 및 로그아웃 함수 가져오기

  const handleLogout = () => {
    logout(); // 로그아웃 처리
  };

  return (
    <header className="flex justify-between items-center bg-white border-b border-gray-400 p-2.5 w-full h-[60px]">
      {/* 로고 */}
      <div className="flex items-center m-10">
        <Link to="/">
          <img className="h-12 max-w-full" alt="도서관 로고" src={logoImage} />
        </Link>
      </div>

      {/* 내비게이션 */}
      <nav className="flex items-center space-x-5 mt-2 sm:mt-0 flex-wrap mr-5">
        {isLoggedIn ? (
          // 로그인 상태일 때 로그아웃 버튼
          <button
            onClick={handleLogout}
            className="text-gray-600 font-bold text-lg"
          >
            로그아웃
          </button>
        ) : (
          // 로그아웃 상태일 때 로그인 버튼
          <Link to="/loginpage" className="text-gray-600 font-bold text-lg">
            로그인
          </Link>
        )}
        <Link to="/" className="text-gray-600 font-bold text-lg">
          HOME
        </Link>
        <a href="#" className="text-gray-600 font-bold text-lg">
          사이트맵
        </a>
      </nav>
    </header>
  );
}

export default Header;
