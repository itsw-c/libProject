import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/SideBar';

const View = () => {
  const { id } = useParams(); // URL의 게시글 ID
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  // 게시글 상세 정보 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/${id}`) // 올바른 경로로 요청
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error('게시글 상세 조회 실패:', error);
      });
  }, [id]);

  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen ">
      <div className="sticky top-0 h-screen">
        <SideBar />
      </div>
      <div className="container mx-auto p-4">
        {/* 상단 헤더 섹션 */}
        <div className="w-full min-h-[150px] bg-[#FFFCE6] rounded flex flex-col border-4 border-orange-50 mb-10 justify-center p-5">
          <div className="w-full pb-5 border-b border-orange-200">
            <h1 className="text-xl md:text-2xl font-bold">열린마당</h1>
          </div>
          <div className="mt-3">
            <h3 className="text-sm md:text-base font-normal">
              열린마당 - 자유게시판 - 글 보기
            </h3>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="w-full min-h-[800px] bg-[#FFFCE6] rounded border-4 border-orange-50 mt-5 md:mt-10 p-5 md:p-10">
          <div className="boar">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 bg-[#533300] w-[120px] text-white">
                    제목
                  </th>
                  <td className="py-3 px-4 bg-white">{post.title}</td>
                </tr>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 bg-[#533300] text-white">
                    작성자
                  </th>
                  <td className="py-3 px-4 bg-white">{post.writer}</td>
                </tr>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 bg-[#533300] text-white">
                    작성일
                  </th>
                  <td className="py-3 px-4 bg-white">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <th className="text-left py-3 px-4 bg-[#533300] align-top text-white">
                    내용
                  </th>
                  <td className="py-3 px-4 min-h-[300px] whitespace-pre-wrap bg-white ">
                    {post.content}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <button
              className="bg-[#533300] text-white px-4 py-2 rounded mr-2"
              onClick={() => navigate('/write', { state: post })}
            >
              수정
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                if (window.confirm('이 게시글을 삭제하시겠습니까?')) {
                  axios
                    .delete(`http://localhost:8080/board/${id}`)
                    .then(() => {
                      alert('게시글이 삭제되었습니다.');
                      navigate('/MainBoard');
                    })
                    .catch((error) => {
                      console.error(
                        '게시글 삭제 실패:',
                        error.response?.data || error.message,
                      );
                    });
                }
              }}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
