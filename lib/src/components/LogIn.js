import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // AuthContext 사용
import ReactDOM from 'react-dom';
import FindPopup from './FindPopup';

const LogIn = () => {
  const { isLoggedIn, username, login, logout } = useAuth(); // Context에서 로그인 상태 및 함수 가져오기
  const [localUsername, setLocalUsername] = useState(''); // 입력된 아이디
  const [password, setPassword] = useState(''); // 입력된 비밀번호
  const [error, setError] = useState(''); // 에러 메시지
  const navigate = useNavigate();

  // 오늘 날짜 가져오기
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleLogin = async () => {
    if (localUsername.trim() === '' || password.trim() === '') {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/login', {
        userid: localUsername,
        userpw: password,
      });

      if (response.status === 200) {
        const user = response.data.user;
        login(user.userid); // Context를 통해 로그인 상태 업데이트
        setError(''); // 에러 메시지 초기화
        navigate('/'); // 메인 페이지로 이동
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('아이디 또는 비밀번호가 잘못되었습니다.');
      } else {
        setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  const handleLogout = () => {
    logout(); // Context를 통해 로그아웃 상태로 전환
  };

  const openPopup = () => {
    const popup = window.open(
      '',
      'FindPopupWindow', // 팝업 창의 이름
      'width=600,height=400,resizable=yes,scrollbars=yes',
    );

    if (popup) {
      // 팝업 창에 React 컴포넌트를 렌더링
      popup.document.write("<div id='find-popup-root'></div>");
      const popupRoot = popup.document.getElementById('find-popup-root');

      ReactDOM.createRoot(popupRoot).render(<FindPopup />);

      // 팝업 창의 스타일 추가
      const style = popup.document.createElement('style');
      style.innerHTML = `
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #FFFCE6;
        }
      `;
      popup.document.head.appendChild(style);
    } else {
      alert('팝업 차단을 해제해주세요.');
    }
  };

  return (
    <div className="w-full h-[314px] bg-white rounded-lg shadow-lg flex flex-col">
      {/* 상단 노란색 바 */}
      <div className="relative bg-[#FCC64C] rounded-t-lg p-2">
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
                  value={localUsername}
                  onChange={(e) => setLocalUsername(e.target.value)} // 아이디 업데이트
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // 비밀번호 업데이트
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FCC64C] focus:outline-none"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mb-2">{error}</div>
              )}
            </div>
            <div>
              <button
                onClick={handleLogin} // 로그인 버튼 클릭 시 실행
                className="w-full bg-[#533300] text-white py-2 rounded-lg text-lg font-semibold hover:bg-[#6b4400] transition"
              >
                로그인
              </button>
              {/* 하단 링크 */}
              <div className="flex justify-center items-center text-sm text-gray-500 pr-1 mt-2 gap-10">
                {/* <div className="flex justify-between items-center text-sm text-gray-500 pl-1 pr-1 mt-2"> */}
                <p
                  onClick={openPopup}
                  className="hover:underline justify-start "
                >
                  아이디/ 비밀번호 찾기
                </p>
                <Link to="/JoinPage">
                  <a href="#" className="hover:underline justify-end">
                    회원가입
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogIn;
