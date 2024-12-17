import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../components/SideBar';

const BookDetail = () => {
  const { title } = useParams(); // URL에서 책 제목을 가져옵니다.
  const [book, setBook] = useState(null);

  useEffect(() => {
    // 책 제목을 기반으로 책 상세 정보를 API에서 가져오는 로직
    fetch(
      `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
        title,
      )}`,
      {
        headers: {
          Authorization: 'KakaoAK 27d3c8985b113087a2aca2a516b4bd0a', // API 키
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('API 응답:', data); //응답데이터 확인
        const detailedBook = data.documents.find((b) => b.title === title); // 제목을 기준으로 책을 찾습니다
        setBook(detailedBook || null); // 책 정보를 상태에 저장
      })
      .catch((error) => console.error(error));
  }, [title]);

  return (
    <div className="flex">
      <SideBar />

      {/* 메인대가리 */}
      <div className="flex-1 p-10">
        <div className="w-[full] h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 pl-10 pt-10 pr-10">
          {/*자료 검색*/}
          <div className="w-full pb-5 border-b border-orange-200">
            <h1 className="text-2xl font-bold">통합자료검색</h1>
          </div>
          {/*현재 경로*/}
          <div className="mt-3">
            <h3 className="text-base font-normal">
              자료검색 - 통합검색 - 상세페이지
            </h3>
          </div>
        </div>

        {/* 메인몸통 */}
        <div className="w-[full] h-[600px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mt-10 p-5">
          <div className="p-10">
            {book === null ? (
              <p>로딩 중입니다...</p> // 로딩 상태 표시
            ) : book ? (
              <div>
                {/* 도서 이미지랑 제목 수평배치 레이아웃 */}
                <div className="flex items-start gap-x-4">
                  <img
                    src={book.thumbnail} // 책 이미지
                    alt={book.title} // 해당 제목의 이미지를 불러오기 위해서 제목도 img 태그 안에 같이 입력하는구나
                    className="w-[150px] h-[200px] rounded-[4px] border-[#533300] border-[4px]"
                  />

                  {/* 제목 및 세부 정보 컨테이너 */}
                  <div>
                    {/* 제목 */}
                    <h1 className="text-3xl font-bold pl-8 pb-4">
                      {book.title}
                    </h1>

                    {/* 책제목 아래 세부사항 수직 배치 */}
                    <div className="mt-2 pb-16 pl-8">
                      <p className="text-lg pb-4">
                        저자: {book.authors.join(', ')}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        출판사: {book.publisher}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        번역가:{' '}
                        {book.translators ? book.translators : '번역 없음'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        ISBN: {book.isbn}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        출판일자: {book.datetime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 도서소개 글자 및 도서소개글 */}
                <div>
                  <h3 className="text-xl font-bold">도서소개</h3>
                  {/* 책 내용 */}
                  <p className="mt-4 pb-4">{book.contents}</p>
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#533300] underline text-l"
                  >
                    도서관 상세줄거리 및 추가정보
                  </a>
                </div>
              </div>
            ) : (
              <p>책을 찾을 수 없습니다. 다시 시도해 주세요.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
