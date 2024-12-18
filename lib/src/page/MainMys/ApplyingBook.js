import React, { useState } from 'react';
import SideBar from '../../components/SideBar';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ApplyingBook = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false); // loading 상태 추가

  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      '희망 도서 신청이 완료되었습니다!\n' +
        `도서 제목: ${formData.bookTitle}\n` +
        `저자: ${formData.author}\n` +
        `신청 사유: ${formData.reason}`,
    );
    setFormData({ bookTitle: '', author: '', reason: '' });
  };

  // 로딩 중일 때
  if (loading) {
    return <div>로딩중...</div>;
  }

  // 로그인되지 않은 경우 커스텀 UI 표시
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="sticky top-0 h-screen">
          <SideBar />
        </div>

        <div className="flex-1 p-10">
          <div className="w-full h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 pl-10 pt-10 pr-10">
            <div className="w-full pb-5 border-b border-orange-200">
              <h1 className="text-2xl font-bold">내 서재</h1>
            </div>
            <div className="mt-3">
              <h3 className="text-base font-normal">내서재 - 희망도서신청</h3>
            </div>
          </div>

          <div className="w-full h-[360px] bg-amber-50 rounded border-4 border-orange-50 mt-10 p-6 pl-10">
            <div className="border-b border-orange-200 w-full pb-6">
              <h2 className="text-xl font-normal pt-5">
                내 서재 페이지는 로그인 후 이용해주세요 ^ - ^
              </h2>
            </div>
            <div className="flex justify-center items-center mt-20">
              <button
                onClick={() => navigate('/loginPage')}
                className="bg-yellow-900 text-white px-8 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300"
              >
                로그인하러 가기
              </button>
            </div>
          </div>
          <div className="w-full h-[100px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      <div className="sticky top-0 h-screen">
        <SideBar />
      </div>
      <div className="container mx-auto p-10">
        {/* 상단 헤더 섹션 */}
        <div className="w-full min-h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 p-10">
          <div className="w-full pb-5 border-b border-orange-200">
            <h1 className="text-2xl font-bold">내 서재</h1>
          </div>
          <div className="mt-3">
            <h3 className="text-base font-normal">내 서재 - 희망도서신청</h3>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="w-full  bg-[#FFFCE6] rounded border-4 border-orange-50 mt-5 md:mt-10 p-5 md:p-10">
          <h1 className="text-2xl font-bold mb-4">희망 도서 신청</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="bookTitle" className="block text-lg font-medium">
                도서 제목
              </label>
              <input
                type="text"
                id="bookTitle"
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-lg font-medium">
                저자
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="reason" className="block text-lg font-medium">
                신청 사유
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-40 bg-[#533300] text-white py-2 rounded-md hover:bg-[#6B4400] transition"
            >
              신청하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyingBook;
