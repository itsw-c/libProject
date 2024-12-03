import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [username, setUsername] = useState(''); // 입력된 아이디
  const navigate = useNavigate();

  // 오늘 날짜 가져오기
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleLogin = () => {
    if (username.trim() !== '') {
      setIsLoggedIn(true); // 로그인 상태로 전환
      navigate('/');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 상태로 전환
    setUsername(''); // 입력 필드 초기화
  };

  return (
    <div className="w-full h-[314px] bg-white rounded-lg shadow-lg flex flex-col">
      {/* 상단 노란색 바 */}
      <div className="relative bg-[#FCC64C] rounded-t-lg p-4">
        <div className="relative text-white text-lg font-semibold z-10 text-center">
          {isLoggedIn ? today : '로그인'}
        </div>
      </div>

      {/* 메인 내용 */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {isLoggedIn ? (
          // 로그인 후 레이아웃
          <div className="flex flex-col justify-between h-full">
            <h2 className="text-xl font-bold mt-5 mb-4 text-center">
              환영합니다:D, <br />
              {username} 님, 어서오세요! <br />
              즐거운 하루 되세요.
            </h2>
            <button
              onClick={handleLogout}
              className="w-full bg-[#533300] text-white py-2 rounded-lg text-lg font-semibold hover:bg-[#6b4400] transition mb-[28px]"
            >
              로그아웃
            </button>
          </div>
        ) : (
          // 로그인 전 레이아웃
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="relative mb-2">
                <label className="text-gray-500 text-sm block mb-1">
                  아이디
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // 아이디 업데이트
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FCC64C] focus:outline-none"
                  placeholder="아이디를 입력하세요"
                />
              </div>
              <div className="relative mb-3">
                <label className="text-gray-500 text-sm block mb-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FCC64C] focus:outline-none"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleLogin} // 로그인 버튼 클릭 시 실행
                className="w-full bg-[#533300] text-white py-2 rounded-lg text-lg font-semibold hover:bg-[#6b4400] transition"
              >
                로그인
              </button>
              {/* 하단 링크 */}
              <div className="flex justify-between items-center text-sm text-gray-500 pl-1 pr-1 mt-2">
                <a href="#" className="hover:underline">
                  아이디찾기
                </a>
                <span className="border-l border-gray-300 h-4"></span>
                <a href="#" className="hover:underline">
                  비밀번호 재설정
                </a>
                <span className="border-l border-gray-300 h-4"></span>
                <a href="#" className="hover:underline">
                  회원가입
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogIn;