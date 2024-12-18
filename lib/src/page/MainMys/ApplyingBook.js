import React, { useState } from 'react';
import SideBar from '../../components/SideBar';

const ApplyingBook = () => {
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
