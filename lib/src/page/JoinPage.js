import React, { useState } from 'react';
import axios from 'axios'; //백엔드에서 받아오기위한 import문
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 import
import backImage from '../assets/backlock.png';

const JoinPage = () => {
  const [formData, setFormData] = useState({
    userid: '',
    userpw: '',
    confirmPw: '',
    name: '',
    birth: '', // 생년월일
    addr: '', // 주소
  });

  const navigate = useNavigate(); // 여기로 이동
  const [isDuplicate, setIsDuplicate] = useState(false); // 중복확인 상태 관리

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userid, userpw, confirmPw, name, birth, addr } = formData;

    if (!userid || !userpw || !confirmPw || !name || !birth || !addr) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (!isDuplicate) {
      alert('아이디 중복확인을 진행해주세요.');
      return; // 중복확인 안 된 경우 회원가입 진행 금지
    }

    if (userpw !== confirmPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/register', {
        userid,
        userpw,
        name,
        birth,
        addr,
      });

      if (response.status === 201) {
        alert(response.data.message); // 성공 메시지 표시
        navigate('/LogInPage'); // 로그인 페이지로 이동
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 중 문제가 발생했습니다.');
    }
  };

  const checkDuplicate = async () => {
    //아이디 중복확인
    const { userid } = formData;

    if (!userid) {
      alert('아이디를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/check-duplicate',
        { userid },
      );
      if (response.data.isDuplicate) {
        alert('이미 사용 중인 아이디입니다.');
        setIsDuplicate(false);
      } else {
        alert('사용 가능한 아이디입니다.');
        setIsDuplicate(true);
      }
    } catch (error) {
      console.error('중복확인 오류:', error);
      alert('중복확인 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className="relative flex flex-col w-full h-[60rem] bg-[#fffce6] min-h-screen z-[-1]">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover z-[0]"
        alt="백그라운드 이미지"
        src={backImage}
      />

      {/* 제목 */}
      <div className="flex flex-row w-full h-[5rem] items-center justify-center mt-[2rem] z-20">
        <h1 className="text-black text-4xl font-extrabold font-['NanumGothic']">
          ITSW도서관
        </h1>
        <h2 className="text-[#28348a] text-4xl font-extrabold font-['NanumGothic']">
          통합로그인
        </h2>
      </div>

      {/* 로그인/회원가입 버튼 */}
      <div className="flex flex-row h-[4rem] space-x-10 mt-[2rem] justify-center w-full z-20">
        <div className="w-[283px] h-[60px] rounded-[30px] border-4 border-[#533300] flex items-center justify-center">
          <a className="text-[#533300] text-2xl font-normal font-['BM DoHyeon']">
            비회원 로그인
          </a>
        </div>
        <div className="w-[283px] h-[60px] rounded-[30px] border-4 border-[#533300] flex items-center justify-center">
          <a className="text-[#533300] text-2xl font-normal font-['BM DoHyeon']">
            통합회원 로그인
          </a>
        </div>
        <div className="w-[283px] h-[60px] bg-[#533300] rounded-[30px] flex items-center justify-center">
          <a className="text-white text-2xl font-normal font-['BM DoHyeon']">
            회원가입
          </a>
        </div>
      </div>

      {/* 메인 카드 */}
      <div className="flex flex-col items-center justify-center h-[30rem] w-full relative z-10 mt-[8rem]">
        {/* 메인카드 */}
        <div className="mt-6 bg-[#fff4dd] flex flex-col items-center justify-center rounded-[30px] p-4 w-[58rem] mx-auto">
          {/* 로그인 정보 입력 */}
          <div className="bg-white flex flex-col w-full rounded-[20px] p-4 mb-4">
            <h3 className="text-xl font-bold mb-2">로그인 정보 입력</h3>
            <div className="space-y-4">
              <div>
                <label className="flex text-sm font-bold text-[#533300]">
                  아이디 <span className="text-[#f44336]">*</span>
                </label>
                <div className="flex-row">
                  <input
                    type="text"
                    name="userid"
                    value={formData.userid}
                    onChange={handleChange}
                    className="w-60 border border-[#d9d9d9] rounded-[5px] p-2"
                    placeholder="아이디를 입력하세요"
                  />
                  <button
                    onClick={checkDuplicate}
                    className="w-15 border bg-[#161042] rounded-[5px] p-2 text-[#ffffff] ml-3"
                  >
                    중복확인
                  </button>
                </div>
              </div>
              <div>
                <label className="flex text-sm font-bold text-[#533300]">
                  비밀번호 <span className="text-[#f44336]">*</span>
                </label>
                <input
                  type="password"
                  name="userpw"
                  value={formData.userpw}
                  onChange={handleChange}
                  className="w-full border border-[#d9d9d9] rounded-[5px] p-2"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              <div>
                <label className="flex text-sm font-bold text-[#533300]">
                  비밀번호 확인 <span className="text-[#f44336]">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPw"
                  value={formData.confirmPw}
                  onChange={handleChange}
                  className="w-full border border-[#d9d9d9] rounded-[5px] p-2"
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </div>
            </div>
          </div>

          {/* 개인 정보 입력 */}
          <div className="bg-white flex flex-col w-full rounded-[20px] p-4">
            <h3 className="text-xl font-bold mb-2">개인 정보 입력</h3>
            <div className="space-y-4">
              <div>
                <label className="flex text-sm font-bold text-[#533300]">
                  이름 <span className="text-[#f44336]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-[#d9d9d9] rounded-[5px] p-2"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label className="flex text-sm font-bold text-[#533300]">
                  생년월일
                </label>
                <input
                  type="date"
                  name="birth"
                  value={formData.birth}
                  onChange={handleChange}
                  className="w-full border border-[#d9d9d9] rounded-[5px] p-2"
                />
              </div>
              <div>
                <label className="flex text-sm font-bold text-[#533300]">
                  주소
                </label>
                <input
                  type="text"
                  name="addr"
                  value={formData.addr}
                  onChange={handleChange}
                  className="w-full border border-[#d9d9d9] rounded-[5px] p-2"
                  placeholder="주소를 입력하세요"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="w-[40rem] bg-[#533300] text-white py-2 rounded-lg mt-4 items-center"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default JoinPage;
