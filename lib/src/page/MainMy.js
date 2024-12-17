import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { useAuth } from '../context/AuthContext';

const MainMy = () => {
  const { isLoggedIn, username, likedBooks, updateLikedBooks } = useAuth(); // 로그인 상태, 사용자 정보, 찜 목록 가져오기

  // 도서를 찜 목록에서 삭제하는 함수
  const handleRemoveBook = (isbn) => {
    const updatedLikedBooks = likedBooks.filter((book) => book.isbn !== isbn); // 해당 도서 제외
    updateLikedBooks(updatedLikedBooks); // 찜 목록 업데이트
  };

  // 로그인되지 않은 경우 로그인 페이지 또는 메시지 표시
  if (!isLoggedIn) {
    return (
      <>
        {/* 사이드바 동적 움직임 Css */}
        <div className="flex flex-col md:flex-row min-h-screen">
          <div className="sticky top-0 h-screen">
            <SideBar />
          </div>

          {/* 메인 대가리 */}
          <div className="flex-1 p-10">
            <div className="w-[full] h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 pl-10 pt-10 pr-10">
              {/* 내서재재 */}
              <div className="w-full pb-5 border-b border-orange-200">
                <h1 className="text-2xl font-bold">내 서재</h1>
              </div>
              {/* 내서재 경로 */}
              <div className="mt-3">
                <h3 className="text-base font-normal">내서재 - 나의 찜 목록</h3>
              </div>
            </div>

            {/* 메인 몸통 */}
            <div className="w-[full] h-[360px] bg-amber-50 rounded border-4 border-orange-50 mt-10 p-10 pl-10">
              {/* 인사말 */}
              <div className="border-b border-orange-200 w-full pb-7 ">
                <h2 className="text-xl font-normal pt-5 ">내 서재 페이지는 로그인 후 이용 가능합니다.</h2>
              </div>
            </div>
            <div className="w-[1000px] h-[100px]">
              {/*몸통 아래 푸터 위에 약간의 공백 설정*/}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-10">
        {/* 머리 */}
        <div className="w-[1100px] h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 pl-10 pt-10 pr-10">
          <h1 className="text-2xl font-bold w-full pb-5 border-b border-orange-200">
            내 서재
          </h1>
          <h3 className="mt-3">내서재 - 나의 찜 목록</h3>
        </div>

        {/* 몸통 부분 */}
        <div className="w-[1100px] h-auto bg-amber-50 rounded border-4 border-orange-50 mt-10 p-6">
          <div>
            <div className="border-b border-orange-200 pb-6">
              {username && (
                <p className="text-m mt-4">{username}님의 찜 도서 목록</p>
              )}
            </div>

            <ul className="space-y-5 pt-10">
              {likedBooks.length > 0 ? (
                likedBooks.map((book, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                        <img
                          src={book.thumbnail}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-5">
                        <p className="text-lg font-medium">{book.title}</p>
                        <p className="text-sm text-gray-600">
                          저자: {book.authors.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      {/* 상세보기 버튼 */}
                      <Link
                        to={`/BookDetail/${encodeURIComponent(book.title)}`}
                        className="bg-yellow-900 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      >
                        상세보기
                      </Link>
                      {/* 삭제 버튼 */}
                      <button
                        onClick={() => handleRemoveBook(book.isbn)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        삭제
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="pb-2">찜한 도서가 없습니다.</p>
              )}
            </ul>
          </div>
        </div>
        <div className="w-[1000px] h-[200px]">
          {/*몸통 아래 푸터 위에 약간의 공백 설정*/}
        </div>
      </div>
    </div>
  );
};

export default MainMy;
