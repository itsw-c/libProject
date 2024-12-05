import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { title } = useParams(); // URL에서 책 제목을 가져옵니다.
  const [book, setBook] = useState(null);

  useEffect(() => {
    // 책 제목을 기반으로 책 상세 정보를 API에서 가져오는 로직
    fetch(
      `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(title)}`,
      {
        headers: {
          Authorization: 'KakaoAK 27d3c8985b113087a2aca2a516b4bd0a', // API 키
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('API 응답:', data);//응답데이터 확인
        const detailedBook = data.documents.find(
          (b) => b.title === title
        ); // 제목을 기준으로 책을 찾습니다
        setBook(detailedBook || null); // 책 정보를 상태에 저장
      })
      .catch((error) => console.error(error));
  }, [title]);

  return (
    <div className="p-10">
      {book === null ? (
        <p>로딩 중입니다...</p> // 로딩 상태 표시
      ) : book ? (
        <div>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-[200px] h-[300px]"
          />
          <p className="text-lg font-semibold">
            저자: {book.authors.join(', ')}
          </p>
          <p className="mt-4">{book.contents}</p>
          <p className="text-sm text-gray-500 mt-2">isbn: {book.isbn}</p>
        </div>
      ) : (
        <p>책을 찾을 수 없습니다. 다시 시도해 주세요.</p>
      )}
    </div>
  );
};

export default BookDetail;
