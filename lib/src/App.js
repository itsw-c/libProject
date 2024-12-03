import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './page/MainPage';
import MainInfo from './page/MainInfo';
import MenuTap from './components/MenuTap';
import MenuBar from './components/MenuBar';
import Header from './components/Header';
import Footer from './components/Footer';
import UsingGuide from './page/MainInfos/UsingGuide';
import Calander from './page/MainInfos/Calander';
import SubjectSearch from './page/MainSearchs/SubjectSearch';
import RecomSearch from './page/MainSearchs/RecomSearch';
import FaQ from './page/MainBoards/FaQ';
import FreeBoard from './page/MainBoards/FreeBoard';
import HopetoLib from './page/MainBoards/HopetoLib';
import ApplyingBook from './page/MainMys/ApplyingBook';
import MemberInfo from './page/MainMys/MemberInfo';
import MainBoard from './page/MainBoard';
import MainSearch from './page/MainSearch';
import MainMy from './page/MainMy';
import LogInPage from './page/LogInPage';
import JoinPage from './page/JoinPage';
import './fontawesome'; // 아이콘 모음

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [isMenuTapVisible, setIsMenuTapVisible] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsMenuTapVisible(true);
  };

  const handleMouseLeave = () => {
    setIsMenuTapVisible(false);
  };

  const handleLogin = (status) => {
    setIsLoggedIn(status); // 로그인 상태 업데이트
    if (status) {
      navigate('/'); // 로그인 성공 시 메인 페이지로 이동
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더에 로그인 상태 전달 */}
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <MenuBar />
        <MenuTap isVisible={isMenuTapVisible} />
      </div>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/MainInfo" element={<MainInfo />} />
        <Route path="/MainInfos/UsingGuide" element={<UsingGuide />} />
        <Route path="/MainInfos/Calander" element={<Calander />} />
        <Route path="/MainSearch" element={<MainSearch />} />
        <Route path="/MainSearchs/SubjectSearch" element={<SubjectSearch />} />
        <Route path="/MainSearchs/RecomSearch" element={<RecomSearch />} />
        <Route path="/MainBoard" element={<MainBoard />} />
        <Route path="/MainBoards/FaQ" element={<FaQ />} />
        <Route path="/MainBoards/FreeBoard" element={<FreeBoard />} />
        <Route path="/MainBoards/HopetoLib" element={<HopetoLib />} />
        <Route path="/MainMy" element={<MainMy />} />
        <Route path="/MainMys/ApplyingBook" element={<ApplyingBook />} />
        <Route path="/MainMys/MemberInfo" element={<MemberInfo />} />
        <Route
          path="/LogInPage"
          element={<LogInPage onLogin={handleLogin} />}
        />
        <Route path="/JoinPage" element={<JoinPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
