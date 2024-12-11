import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const { id } = useParams(); // URL의 게시글 ID
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  // 게시글 상세 정보 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/${id}`)
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div className="mb-2">
        <span className="text-gray-500">작성자:</span> {post.writer}
      </div>
      <div className="mb-4">
        <span className="text-gray-500">작성일:</span>{' '}
        {new Date(post.created_at).toLocaleDateString()}
      </div>
      <p className="mb-6">{post.content}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => navigate('/write', { state: post })}
      >
        수정
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => {
          if (window.confirm('이 게시글을 삭제하시겠습니까?')) {
            axios
              .delete(`http://localhost:8080/board/${id}`, {
                data: { userid: post.userid },
              })
              .then(() => {
                alert('게시글이 삭제되었습니다.');
                navigate('/');
              })
              .catch((error) => {
                console.error('게시글 삭제 실패:', error);
              });
          }
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default View;
