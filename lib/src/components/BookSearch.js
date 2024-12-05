import React, { useState } from 'react';
import { fetchBooks } from '../api/bookApi';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);  // 초기값을 빈 배열로 설정
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return; // 검색어가 비어있을 경우 처리하지 않음
    setLoading(true);
    setError('');
    try {
      const results = await fetchBooks(query);
      setBooks(results);
    } catch (err) {
      setError('도서 검색 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="도서 검색"
      />
      <button onClick={handleSearch}>검색</button>

      {loading && <p>로딩 중...</p>}
      {error && <p>{error}</p>}

      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <h3>{book.title}</h3>
            <p>{book.authors.join(', ')}</p>
            <p>{book.publisher}</p>
            <img src={book.thumbnail} alt={book.title} />
            <a href={book.url} target="_blank" rel="noopener noreferrer">상세보기</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;
