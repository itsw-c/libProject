import React from 'react';
import SearchBar from '../components/SerchBar';
import LogIn from '../components/LogIn';
import acadViews from '../assets/acadView.png';
import MainButton from '../components/MainButton';
import ImageCarousel from '../components/ImageCarousel';
import MainMiddle from '../assets/mainMiddle.png';
import MainBottom from '../assets/mainBottom.svg';

const MainPage = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* 메인페이지 상단 */}
      <div className="relative w-full h-screen">
        {/* 배경 이미지 */}
        <img
          src={acadViews}
          alt="acadViews"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        {/* 검정색 불투명 레이어 */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

        {/* 상단 영역 */}
        <div className="absolute top-0 left-0 w-full h-[200px] z-20 flex items-center justify-center mt-10">
          <div className="text-white text-[52px] font-bold font-['Inter']">
            책을 읽다, 세상을 잇다
          </div>
        </div>
        {/* 메인 컨텐츠 */}
        <div className="absolute top-0 left-0 w-full h-full flex z-20">
          {/* 좌측 영역 */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-[394px] h-[394px] flex flex-col justify-between">
              <SearchBar />
              <LogIn />
              {/* <CurLogIn /> */}
            </div>
          </div>
          {/* 중앙 영역 */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[370px] h-[394.52px] relative g-4">
              <ImageCarousel />
            </div>
          </div>
          {/* 우측 영역 */}
          <div className="flex-1 flex items-center justify-center">
            <MainButton />
          </div>
        </div>
      </div>

      {/* 메인페이지 중간 */}
      <div className="w-full flex items-center justify-center">
        <img src={MainMiddle} alt="mainMiddle" className="w-full h-auto" />
      </div>
      <div className="relative w-full flex flex-col items-center bg-[#FFFCE6]">
        {/* 배경 이미지 */}
        <img
          src={MainBottom}
          alt="mainBottom"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default MainPage;
