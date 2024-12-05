import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const BookResult = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const searchQuery = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    if (searchQuery) {
      fetch(
        `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
          searchQuery,
        )}`,
        {
          headers: {
            Authorization: 'KakaoAK 27d3c8985b113087a2aca2a516b4bd0a',
          },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          setBooks(data.documents || []);
        })
        .catch((error) => console.error(error));
    }
  }, [searchQuery]);

  return (
    <div className="flex justify-center pl-28 pr-28">
      <div className="flex-1 p-10">
        <div className="w-full h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-20 pl-10 pt-10 pr-10">
          <div className="w-full pb-5 border-b border-orange-200">
            <h1 className="text-2xl font-bold">통합자료검색</h1>
          </div>
          <div className="mt-3">
            <h3 className="text-base font-normal">
              자료검색 - 통합검색 - 검색목록
            </h3>
          </div>
        </div>

        <div className="w-full bg-amber-50 rounded border-4 border-orange-50 mt-10 p-5">
          <div className="border-b border-orange-200 w-[1300px] pb-7 ml-4">
            <h2 className="text-xl font-semibold pt-5">
              "{searchQuery}"의 검색결과 입니다. ^-^
            </h2>
          </div>
          <div className="p-10">
            <ul className="space-y-6">
              {books && books.length > 0 ? (
                books.map((book, index) => (
                  <li
                    key={index}
                    className="border border-orange-200 p-4 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4"
                  >
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="w-[100px] h-[150px]"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        <Link
                          to={`/BookDetail/${encodeURIComponent( book.title
                          )}`} // 책 제목으로 링크 변경
                          className="hover:text-blue-600">
                          {book.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600">
                        {book.authors.join(', ')}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {book.contents || '줄거리가 없습니다.'}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        isbn: {book.isbn}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookResult;
