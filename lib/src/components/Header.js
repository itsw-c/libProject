import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logotypo.png';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 처리
  };

  return (
    <header className="flex justify-between items-center bg-white border-b border-gray-400 p-2.5 w-full h-[60px]">
      <div className="flex items-center m-10">
        <Link to="/">
          <img className="h-12 max-w-full" alt="도서관 로고" src={logoImage} />
        </Link>
      </div>
      <nav className="flex items-center space-x-5 mt-2 sm:mt-0 flex-wrap mr-5">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-gray-600 font-bold text-lg"
          >
            로그아웃
          </button>
        ) : (
          <Link to="/LogInPage" className="text-gray-600 font-bold text-lg">
            로그인
          </Link>
        )}
        <a href="#" className="text-gray-600 font-bold text-lg">
          HOME
        </a>
        <a href="#" className="text-gray-600 font-bold text-lg">
          사이트맵
        </a>
      </nav>
    </header>
  );
}

export default Header;
