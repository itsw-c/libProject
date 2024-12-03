import React, { useState } from 'react';
import logoImage from '../assets/logotypo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState(''); // 아이디
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const gohome = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 간단한 로그인 검증 로직
    if (username === 'admin' && password === 'password123') {
      onLogin(true, username); // 부모 컴포넌트에서 로그인 상태 업데이트
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {/* 상단 로고 및 제목 */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="도서관 로고"
          src={logoImage}
          className="mx-auto h-10 w-auto"
        />
      </div>

      {/* 로그인 폼 */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 아이디 입력 */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              UserID
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="아이디를 입력하세요"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm pl-3"
              />
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                비밀번호를 잊어버렸나요?
              </a>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm pl-3"
              />
            </div>
          </div>

          {/* 에러 메시지 표시 */}
          {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

          {/* 로그인 버튼 */}
          <div>
            <button
              onClick={gohome}
              type="submit"
              className="flex h-14 w-full items-center justify-center rounded-md 
   bg-[#533300] px-3 py-1.5 text-lg font-semibold text-white shadow-sm
   hover:bg-[#FCC64C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              로그인
            </button>
          </div>
        </form>

        {/* 회원가입 안내 */}
        <p className="mt-10 text-center text-sm text-gray-500">
          회원이 아니신가요?
          <Link to="/JoinPage">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              회원가입 하러 가기
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
