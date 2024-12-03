import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
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
      />
    </div>
  );
};

export default SearchBar;
