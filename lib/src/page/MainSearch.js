import React from 'react';
import SideBar from '../components/SideBar';
import SerchBar from '../components/SerchBar';
import Book1 from '../assets/Books/Book1.png';
import Book2 from '../assets/Books/Book2.png';
import Book3 from '../assets/Books/Book3.png';
import Book4 from '../assets/Books/Book4.png';
import Book5 from '../assets/Books/Book5.png';
import Book6 from '../assets/Books/Book6.png';
import Book7 from '../assets/Books/Book7.png';
import Book8 from '../assets/Books/Book8.png';
import Book9 from '../assets/Books/Book9.png';

const MainSearch = () => {
  return (
    <>
      <div className="flex">
        {/* 사이드바 */}
        <SideBar />

        {/* 메인 대가리 */}
        <div className="flex-1 p-10">
          <div className="w-[1100px] h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-20 pl-10 pt-10 pr-10">
            {/* 자료검색 */}
            <div className="w-full pb-5 border-b border-orange-200">
              <h1 className="text-2xl font-bold">통합자료검색</h1>
            </div>
            {/* 현재 경로 */}
            <div className="mt-3">
              <h3 className="text-base font-normal">자료검색 - 통합검색</h3>
            </div>
          </div>

          {/* 메인 몸통 */}
          <div className="w-[1100px] h-[800px] bg-amber-50 rounded border-4 border-orange-50 mt-10 p-10">
            {/* 인기검색어 */}
            <div className="border-b border-orange-200 w-full pb-7">
              <h2 className="text-xl font-normal pt-5">+인기검색어</h2>

              {/* 인기검색어 가로나열 */}
              <div className="flex space-x-10 pl-4 pt-4 text-gray-400">
                <h3>한강</h3>
                <h3>소년이 온다</h3>
                <h3>구의 증명</h3>
                <h3>이기적 유전자</h3>
                <h3>흔한 남매</h3>
                <h3>히가시노게이고</h3>
              </div>
            </div>

            {/** 검색 바 */}
            <div className="pt-6">
              <SerchBar />
            </div>
            <div className="flex space-x-80 pl-5 pt-10">
              {/** 새롭게 정리된 자료 */}
              <div className="pt-6">● 새롭게 정리된 자료입니다.</div>

              {/** 최근 대출 받은 자료 */}
              <div className="pt-6">● 최근 새롭게 대출 된 자료입니다.</div>
            </div>

            {/** 이미지 묶음 정렬 */}
            <div className="flex justify-between pt-10 pl-6">
              {/* 왼쪽 묶음 */}
              <div className="flex flex-col space-y-10">
                {/** 첫 번째 층 */}
                <div className="flex space-x-10">
                  <img
                    src={Book1}
                    alt="Book1"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                  <img
                    src={Book2}
                    alt="Book2"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                  <img
                    src={Book3}
                    alt="Book3"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                </div>
                {/** 두 번째 층 */}
                <div className="flex space-x-10">
                  <img
                    src={Book4}
                    alt="Book4"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                  <img
                    src={Book5}
                    alt="Book5"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                  <img
                    src={Book6}
                    alt="Book6"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                </div>
                {/** 세 번째 층 */}
                <div className="flex space-x-10">
                  <img
                    src={Book7}
                    alt="Book7"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                  <img
                    src={Book8}
                    alt="Book8"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                  <img
                    src={Book9}
                    alt="Book9"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                </div>
              </div>

              {/* 오른쪽 묶음 */}
              <div className="flex flex-col space-y-10 pr-40">
                {/** 오른쪽 첫 번째 묶음 */}
                <div className="flex space-x-10">
                  <img
                    src={Book1}
                    alt="Book1"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                  <img
                    src={Book2}
                    alt="Book2"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                  <img
                    src={Book3}
                    alt="Book3"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                </div>
                {/** 오른쪽 두 번째 묶음 */}
                <div className="flex space-x-10">
                  <img
                    src={Book4}
                    alt="Book4"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                  <img
                    src={Book5}
                    alt="Book5"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                  <img
                    src={Book6}
                    alt="Book6"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                </div>
                {/** 오른쪽 세 번째 묶음 */}
                <div className="flex space-x-10">
                  <img
                    src={Book7}
                    alt="Book7"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                  <img
                    src={Book8}
                    alt="Book8"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                  <img
                    src={Book9}
                    alt="Book9"
                    className="w-[80px] h-[80px] rounded-[5px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[1000px] h-[100px]">
            {/*몸통 아래 푸터 위에 약간의 공백 설정*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSearch;
