import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartIcon_empty } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartIcon_fill } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const BookResult = () => {
  const location = useLocation();
  const { likedBooks, updateLikedBooks, isLoggedIn } = useAuth();
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

  // 하트 클릭 시 찜목록에 추가 또는 제거
  const handleLikeToggle = (book) => {
    const isAlreadyLiked = likedBooks.some(
      (likedBook) => likedBook.isbn === book.isbn,
    );
    let updatedLikedBooks;

    if (isAlreadyLiked) {
      // 이미 찜목록에 있으면 제거
      updatedLikedBooks = likedBooks.filter(
        (likedBook) => likedBook.isbn !== book.isbn,
      );
    } else {
      // 찜목록에 없으면 추가
      updatedLikedBooks = [...likedBooks, book];
    }

    updateLikedBooks(updatedLikedBooks); // 찜 목록 업데이트
  };

  // 하트 상태 체크
  const isBookLiked = (book) => {
    return likedBooks.some((likedBook) => likedBook.isbn === book.isbn);
  };

  const handleBorrow = (bookTitle) => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    axios
      .get('http://localhost:8080/userinfo', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const currentUser = response.data;

        const newBorrow = {
          userid: currentUser.userid,
          title: bookTitle,
          borrowDate: new Date().toISOString().split('T')[0],
          returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
        };

        const currentBorrows =
          JSON.parse(localStorage.getItem('borrowedBooks')) || [];

        const alreadyBorrowed = currentBorrows.some(
          (book) =>
            book.title === bookTitle && book.userid === currentUser.userid,
        );

        if (alreadyBorrowed) {
          alert('이미 대출한 도서입니다.');
          return;
        }

        currentBorrows.push(newBorrow);
        localStorage.setItem('borrowedBooks', JSON.stringify(currentBorrows));

        alert('도서가 성공적으로 대출되었습니다.');
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
        alert('대출 처리 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="sticky top-0 h-screen">
        <SideBar />
      </div>
      <div className="flex-1 p-10">
        <div className="w-[full] h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 pl-10 pt-10 pr-10">
          <div className="w-full pb-5 border-b border-orange-200">
            <h1 className="text-2xl font-bold">통합자료검색</h1>
          </div>
          <div className="mt-3">
            <h3 className="text-base font-normal">
              자료검색 - 통합검색 - 검색목록
            </h3>
          </div>
        </div>

        <div className="w-[full]  bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 pl-10 pt-10 pr-10">
          <div className="border-b border-orange-200 w-[1100px] pb-7 ml-4">
            <h2 className="text-xl font-semibold pt-5">
              "{searchQuery}"의 검색결과 입니다.
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
                    <div className="flex flex-col items-center">
                      <img
                        src={book.thumbnail}
                        alt={book.title}
                        className="w-[100px] h-[150px]"
                      />
                      <button
                        onClick={() => handleBorrow(book.title)}
                        className="mt-2 bg-[#533300] text-white px-4 py-2 rounded hover:bg-[#6B4400]"
                        style={{ padding: '10px 20px' }}
                      >
                        대출하기
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start gap-x-4">
                        <h3 className="text-lg font-semibold">
                          <Link
                            to={`/BookDetail/${encodeURIComponent(book.title)}`}
                            className="hover:text-blue-600"
                          >
                            {book.title}
                          </Link>
                        </h3>
                        <div onClick={() => handleLikeToggle(book)}>
                          <FontAwesomeIcon
                            icon={
                              isBookLiked(book)
                                ? heartIcon_fill
                                : heartIcon_empty
                            }
                            style={{
                              color: isBookLiked(book) ? 'red' : 'gray',
                              fontSize: '20px',
                            }}
                          />
                        </div>
                      </div>
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
