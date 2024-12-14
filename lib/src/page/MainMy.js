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
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-10">
          <div className="w-[1100px] h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-20 pl-10 pt-10 pr-10">
            <h1 className="text-2xl font-bold">로그인 후 이용해주세요</h1>
            <p>내 서재는 로그인 후에만 사용 가능합니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-10">
        <div className="w-[1100px] h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 pl-10 pt-10 pr-10">
          <h1 className="text-2xl font-bold w-full pb-5 border-b border-orange-200">
            내 서재
          </h1>
          <h3 className="mt-3">내서재 - 나의 찜 목록</h3>
        </div>

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
      </div>
    </div>
  );
};

export default MainMy;
