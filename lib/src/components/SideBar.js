import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import frogIcon from '../assets/forgIcon.png';

const SideBar = () => {
  const [selected, setSelected] = useState('intro');
  const navigate = useNavigate();
  const location = useLocation();

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

  const MainBoardItems = [
    {
      id: 'intro',
      title: '공지사항',
      bg: 'bg-[#533300]',
      text: 'text-white',
      path: '/Notice',
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
    setSelected(id);
    navigate(path);
  };

  const getMenuItems = () => {
    //제목아래 아이템 바꿔주는거
    if (location.pathname.startsWith('/MainSearch')) {
      return MainSearchItems;
    } else if (location.pathname.startsWith('/MainInfo')) {
      return MainInfoItems;
    } else if (
      location.pathname.startsWith('/Notice') ||
      location.pathname.startsWith('/MainBoard') ||
      location.pathname.startsWith('/WriteNo') ||
      location.pathname.startsWith('/write')
    ) {
      return MainBoardItems;
    } else if (
      location.pathname.startsWith('/MainMy') ||
      location.pathname.startsWith('/BookDetail')
    ) {
      return MainMyItems;
    }
    return MainInfoItems;
  };

  const getSidebarTitle = () => {
    //제목 바꿔주는거
    if (location.pathname.startsWith('/MainSearch')) return '자료검색';
    if (location.pathname.startsWith('/MainInfo')) return '이용안내';
    if (
      location.pathname.startsWith('/Notice') ||
      location.pathname.startsWith('/MainBoard') ||
      location.pathname.startsWith('/WriteNo') ||
      location.pathname.startsWith('/write')
    )
      return '열린마당';
    if (
      location.pathname.startsWith('/MainMy') ||
      location.pathname.startsWith('/BookDetail')
    )
      return '내서재';
    return '이용안내';
  };

  return (
    <div className="w-[200px] text-center mx-10 sticky top-0">
      <div className="relative flex flex-col items-center h-full mt-[200px]">
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
            onClick={() => handleClick(item.id, item.path)}
            className={`w-[200px] h-[80px] flex items-center justify-center cursor-pointer 
              ${selected === item.id ? item.bg : 'bg-orange-50'}  
              ${selected === item.id ? item.text : 'text-black'} 
              ${selected === item.id ? 'font-semibold' : 'font-normal'} 
              ${item.id === 'cal' ? 'rounded-b-lg' : ''} 
              transition-all duration-300`}
          >
            <h2>{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
