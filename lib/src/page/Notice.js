import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../components/SideBar';

// 공지사항페이지 입니다.

const Notice = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // 현재 로그인한 사용자가 admin인지 확인하는 함수
  const isAdminUser = () => {
    const userInfo = localStorage.getItem('user');
    console.log('Current userInfo:', userInfo); // 디버깅용 로그

    // userInfo가 null이거나 undefined인 경우 (로그인하지 않은 상태)
    if (!userInfo || userInfo === 'null' || userInfo === 'undefined') {
      return false;
    }

    try {
      const user = JSON.parse(userInfo);
      console.log('Parsed user:', user); // 디버깅용 로그
      // user 객체가 존재하고 userid가 'admin'인 경우에만 true 반환
      return user && user.userid && user.userid === 'admin';
    } catch (error) {
      console.error('Error parsing user info:', error);
      return false;
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/notice')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('게시글 조회 실패:', error);
      });
  }, []);

  // 게시글 상세 페이지로 이동
  const handleViewPost = (id) => {
    navigate(`/viewNo/${id}`);
  };

  // 글쓰기 페이지로 이동
  const handleWritePost = () => {
    navigate('/writeNo');
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
            <h1 className="text-2xl font-bold">열린마당</h1>
          </div>
          <div className="mt-3">
            <h3 className="text-base font-normal">열린마당 - 공지사항</h3>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="w-full  bg-[#FFFCE6] rounded border-4 border-orange-50 mt-5 md:mt-10 p-5 md:p-10">
          <h1 className="text-2xl font-bold mb-4">공지사항</h1>

          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-[#533300] text-white">
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
                  <td className="px-4 py-2 border text-center">
                    {post.writer}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border text-center">{post.views}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* admin 계정으로 로그인한 경우에만 글쓰기 버튼 표시 */}
          {isAdminUser() && (
            <div className="mt-4">
              <button
                onClick={handleWritePost}
                className="bg-[#533300] text-white px-4 py-2 rounded"
              >
                글쓰기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notice;
