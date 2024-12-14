import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/SideBar';

const WriteNo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = location.state !== null;

  const [form, setForm] = useState(
    isEdit
      ? {
          id: location.state.id,
          title: location.state.title,
          content: location.state.content,
          userid: location.state.userid,
          writer: location.state.writer,
        }
      : {
          title: '',
          content: '',
          userid: JSON.parse(localStorage.getItem('user'))?.userid || '',
          writer: JSON.parse(localStorage.getItem('user'))?.name || '',
        },
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const requestData = {
        ...form,
        userid: user.userid,
        writer: user.name || user.userid,
      };

      if (isEdit) {
        const response = await axios.put(
          `http://localhost:8080/Notice/${form.id}`,
          requestData,
        );
        alert('게시글이 수정되었습니다.');
      } else {
        const response = await axios.post(
          'http://localhost:8080/Notice',
          requestData,
        );
        alert('게시글이 작성되었습니다.');
      }
      navigate('/Notice');
    } catch (error) {
      console.error('에러 발생:', error.response?.data || error);
      alert(
        error.response?.data?.message || '게시글 작성/수정에 실패했습니다.',
      );
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      <div className="sticky top-0 h-screen">
        <SideBar />
      </div>
      <div className="container mx-auto p-4">
        <div className="w-full min-h-[150px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 justify-center p-5">
          <div className="w-full pb-5 border-b border-orange-200">
            <h1 className="text-xl md:text-2xl font-bold">열린마당</h1>
          </div>
          <div className="mt-3">
            <h3 className="text-sm md:text-base font-normal">
              열린마당 - 공지사항 - 글쓰기
            </h3>
          </div>
        </div>

        <div className="w-full min-h-[800px] bg-amber-50 rounded border-4 border-orange-50 mt-5 md:mt-10 p-5 md:p-10">
          <h1 className="text-2xl font-bold mb-4">
            {isEdit ? '게시글 수정' : '게시글 작성'}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-bold">제목</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="제목을 입력하세요"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">작성자</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={form.writer}
                onChange={(e) => setForm({ ...form, writer: e.target.value })}
                placeholder="작성자를 입력하세요"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">내용</label>
              <textarea
                className="w-full p-2 border rounded"
                rows="10"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="내용을 입력하세요"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#533300] text-white px-4 py-2 rounded"
            >
              {isEdit ? '수정하기' : '작성하기'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteNo;
