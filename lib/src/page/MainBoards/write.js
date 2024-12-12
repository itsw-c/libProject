import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/SideBar';

const Write = () => {
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
      : { title: '', content: '', userid: '', writer: '' }, // 초기값
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form:', form);

    if (isEdit) {
      // 수정 요청
      axios
        .put(`http://localhost:8080/board/${form.id}`, form)
        .then(() => {
          alert('게시글이 수정되었습니다.');
          navigate('/MainBoard');
        })
        .catch((error) => {
          console.error(
            '게시글 수정 실패:',
            error.response?.data || error.message,
          );
        });
    } else {
      // 새글 작성 요청
      axios
        .post('http://localhost:8080/board', form)
        .then(() => {
          alert('게시글이 작성되었습니다.');
          navigate('/MainBoard');
        })
        .catch((error) => {
          console.error(
            '게시글 작성 실패:',
            error.response?.data || error.message,
          );
        });
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      <div className="sticky top-0 h-screen">
        <SideBar />
      </div>
      <div className="container mx-auto p-4">
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
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEdit ? '수정하기' : '작성하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Write;
