import React from 'react';
import { Link } from 'react-router-dom';

const itemsGroup = [
  ['통합검색', '주제별 검색', '추천 도서'],
  ['도서관 소개', '도서관 이용안내', '도서관 일정'],
  ['공지사항', '자주하는 질문', '자유 게시판'],
  ['나의 찜 목록', '희망 도서 신청', '회원 정보'],
];

const itemRoutes = {
  통합검색: '/MainSearch',
  '주제별 검색': '/MainSearchs/SubjectSearch',
  '추천 도서': '/MainSearchs/RecomSearch',

  '도서관 소개': '/MainInfo',
  '도서관 이용안내': '/MainInfos/UsingGuide',
  '도서관 일정': '/MainInfos/Calander',

  공지사항: '/Notice',
  '자주하는 질문': '/MainBoards/FaQ',
  '자유 게시판': '/MainBoard',

  '나의 찜 목록': '/MainMy',
  '희망 도서 신청': '/MainMys/ApplyingBook',
  '회원 정보': '/MainMys/MemberInfo',
};

function MenuTap({ isVisible }) {
  return (
    <div
      className={`absolute top-full left-0 w-full shadow-lg z-50 ${
        isVisible ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-opacity-50 bg-white w-full h-full absolute top-0 left-0"></div>
      <div className="relative max-w-screen-xl h-56 mx-auto flex justify-around items-start">
        {itemsGroup.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="flex flex-col items-center justify-center space-y-4 mt-6 w-72"
          >
            {group.map((item, index) => (
              <Link
                key={index}
                to={itemRoutes[item] || '#'}
                className="text-gray-800 font-bold text-[18px] text-center whitespace-nowrap cursor-pointer opacity-100"
              >
                {item}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuTap;
