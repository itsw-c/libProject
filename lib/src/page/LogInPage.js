import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // AuthContext 사용
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../assets/logotypo.png';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // login 함수 가져오기
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        userid: username,
        userpw: password,
      });

      if (response.status === 200) {
        const user = response.data.user;
        login(user.userid); // Context에 로그인 상태 업데이트
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

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
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
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm pl-3"
                placeholder="아이디를 입력하세요"
              />
            </div>
          </div>
          {/* 비밀번호 입력 */}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm pl-3"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div>
            <button
              type="submit"
              className="w-full bg-[#533300] text-white py-2 rounded-lg hover:bg-[#EC830B]"
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
