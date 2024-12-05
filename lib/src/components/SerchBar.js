import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 사용
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate(); // useNavigate로 페이지 이동

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchText.trim()) {
      // 검색어가 있을 경우 검색어를 포함한 URL로 이동
      navigate(`/BookResult?search=${searchText.trim()}`);
    }
  };

  return (
    <div className="w-full h-[60px] bg-white rounded-lg flex items-center px-4 shadow-md">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
        className="flex-1 text-gray-700 text-sm font-normal bg-transparent outline-none"
      />
      <FontAwesomeIcon
        icon="fa-solid fa-magnifying-glass"
        className="text-[#533300]"
        onClick={handleSearchClick} // 검색 아이콘 클릭 시 검색 실행
      />
    </div>
  );
};

export default SearchBar;
