import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation을 추가하여 현재 URL 경로를 확인
import frogIcon from '../assets/forgIcon.png';

const SideBar = () => {
  const [selected, setSelected] = useState('intro');
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
  const location = useLocation(); // 현재 경로를 확인하기 위한 훅

  // 자료검색 데이터
  const MainSearchItems = [
    {
      id: 'intro',
      title: '통합검색',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/MainSearch',
    },
    {
      id: 'info',
      title: '주제별검색',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/MainSearchs/SubjectSearch',
    },
    {
      id: 'cal',
      title: '추천도서',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/MainSearchs/RecomSearch',
    },
  ];

  // 이용안내 데이터
  const MainInfoItems = [
    {
      id: 'intro',
      title: '도서관 소개',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/MainInfo',
    },
    {
      id: 'info',
      title: '도서관 이용안내',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/MainInfos/UsingGuide',
    },
    {
      id: 'cal',
      title: '도서관 일정안내',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/MainInfos/Calander',
    },
  ];

  // 열린마당 데이터
  const MainBoardItems = [
    {
      id: 'intro',
      title: '공지사항(도서관에게 바란다)',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/Notice.js',
    },
    {
      id: 'info',
      title: '자주하는 질문',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/MainBoards/FaQ',
    },
    {
      id: 'cal',
      title: '자유게시판',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/MainBoard',
    },
  ];

  // 내서재 데이터
  const MainMyItems = [
    {
      id: 'intro',
      title: '나의 찜 목록',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/MaiMy',
    },
    {
      id: 'info',
      title: '희망도서신청',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/MainMys/ApplyingBook',
    },
    {
      id: 'cal',
      title: '회원정보',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/MainMys/MemberInfo',
    },
  ];

  const handleClick = (id, path) => {
    setSelected(id); // 선택된 항목 상태 변경

    // 상태 변경 후 바로 페이지 이동
    navigate(path); // 페이지 이동
  };

  // 현재 URL 경로에 따라서 사이드바 메뉴 항목을 결정
  const getMenuItems = () => {
    if (
      location.pathname.startsWith('/MainSearch') ||
      location.pathname.startsWith('/BookResult') ||
      location.pathname.startsWith('/BookDetail')
    ) {
      return MainSearchItems;
    } else if (location.pathname.startsWith('/MainInfo')) {
      return MainInfoItems;
    } else if (
      location.pathname.startsWith('/Notice') ||
      location.pathname.startsWith('/MainBoard') ||
      location.pathname.startsWith('/write') ||
      location.pathname.startsWith('/view')
    ) {
      return MainBoardItems;
    } else if (location.pathname.startsWith('/MainMy')) {
      return MainMyItems;
    }
    return MainInfoItems; // 기본값
  };

  // 현재 페이지에 맞는 제목을 반환
  const getSidebarTitle = () => {
    if (location.pathname.startsWith('/MainSearch')) {
      return '자료검색';
    } else if (location.pathname.startsWith('/MainInfo')) {
      return '이용안내';
    } else if (
      location.pathname.startsWith('/Notice') ||
      location.pathname.startsWith('/MainBoard') ||
      location.pathname.startsWith('/write') ||
      location.pathname.startsWith('/view')
    ) {
      return '열린마당';
    } else if (location.pathname.startsWith('/MainMy')) {
      return '내서재';
    }
    return '이용안내'; // 기본값
  };

  return (
    <div className="w-[200px] text-center mx-10 my-15 sticky top-[100px]">
      {/* 아이콘 */}
      <div className="w-[100px] h-[55px]">
        <img src={frogIcon} alt="frogIcon" />
      </div>

      {/* 제목 */}
      <div className="w-[200px] h-[120px] bg-amber-400 rounded-t-lg flex items-center justify-center">
        <p className="text-black text-xl font-normal">{getSidebarTitle()}</p>
      </div>

      {/* 메뉴 리스트 */}
      {getMenuItems().map((item) => (
        <div
          key={item.id}
          onClick={() => handleClick(item.id, item.path)} // 클릭 시 상태 변경 및 페이지 이동 처리
          className={`w-[200px] h-[80px] flex items-center justify-center cursor-pointer 
            ${selected === item.id ? item.bg : 'bg-orange-50'}  
            ${selected === item.id ? item.text : 'text-black'} 
            ${selected === item.id ? 'font-semibold' : 'font-normal'} 
            ${item.id === 'cal' ? 'rounded-b-lg' : ''} 
            transition-all duration-300`} // 트랜지션 적용
        >
          <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
