import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../components/SideBar';

const MainBoard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // 게시글 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:8080/board')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('게시글 조회 실패:', error);
      });
  }, []);

  // 게시글 상세 페이지로 이동
  const handleViewPost = (id) => {
    navigate(`/view/${id}`);
  };

  // 글쓰기 페이지로 이동
  const handleWritePost = () => {
    navigate('/write');
  };

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      <div className="sticky top-0 h-screen">
        <SideBar />
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">게시판</h1>

        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">번호</th>
              <th className="px-4 py-2 border">제목</th>
              <th className="px-4 py-2 border">작성자</th>
              <th className="px-4 py-2 border">작성일</th>
              <th className="px-4 py-2 border">조회수</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleViewPost(post.id)}
              >
                <td className="px-4 py-2 border text-center">{post.id}</td>
                <td className="px-4 py-2 border">{post.title}</td>
                <td className="px-4 py-2 border text-center">{post.writer}</td>
                <td className="px-4 py-2 border text-center">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border text-center">{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button
            onClick={handleWritePost}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainBoard;
