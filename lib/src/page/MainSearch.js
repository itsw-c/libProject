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
  // 책 이미지 배열 생성
  const bookImages = [
    Book1,
    Book2,
    Book3,
    Book4,
    Book5,
    Book6,
    Book7,
    Book8,
    Book9,
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="sticky top-0 h-screen">
          <SideBar />
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex-1 p-4 md:p-10">
          {/* 상단 헤더 섹션 */}
          <div className="w-[full] h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 pl-10 pt-10 pr-10">
            <div className="w-full pb-5 border-b border-orange-200">
              <h1 className="text-xl md:text-2xl font-bold">통합자료검색</h1>
            </div>
            <div className="mt-3">
              <h3 className="text-sm md:text-base font-normal">
                자료검색 - 통합검색
              </h3>
            </div>
          </div>

          {/* 메인 콘텐츠 영역 */}
          <div className="w-full min-h-[800px] bg-amber-50 rounded border-4 border-orange-50 mt-5 md:mt-10 p-5 md:p-10">
            {/* 인기검색어 섹션 */}
            <div className="border-b border-orange-200 w-full pb-5 md:pb-7">
              <h2 className="text-lg md:text-xl font-normal pt-3 md:pt-5">
                +인기검색어
              </h2>

              {/* 인기검색어 리스트 */}
              <div className="flex flex-wrap gap-4 md:space-x-10 pl-2 md:pl-4 pt-4 text-gray-400 text-sm md:text-base">
                <h3>한강</h3>
                <h3>소년이 온다</h3>
                <h3>구의 증명</h3>
                <h3>이기적 유전자</h3>
                <h3>흔한 남매</h3>
                <h3>히가시노게이고</h3>
              </div>
            </div>

            <div className="pt-6">
              <SerchBar />
            </div>

            {/* 자료 설명 섹션과 도서 이미지 그리드 */}
            <div className="flex flex-col md:flex-row justify-between pl-5 pt-10">
              {/* 왼쪽 섹션 */}
              <div>
                <div className="pt-3 md:pt-6 mb-5">
                  ● 새롭게 정리된 자료입니다.
                </div>
                <div className="flex flex-col space-y-5 md:space-y-10 mb-10 md:mb-0">
                  {[0, 3, 6].map((startIdx, groupIndex) => (
                    <div
                      key={groupIndex}
                      className="flex flex-wrap gap-4 md:space-x-10"
                    >
                      {[0, 1, 2].map((offset) => (
                        <img
                          key={startIdx + offset}
                          src={bookImages[startIdx + offset]}
                          alt={`Book${startIdx + offset + 1}`}
                          className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-[5px]"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* 오른쪽 섹션 */}
              <div>
                <div className="pt-3 md:pt-6 mb-5">
                  ● 최근 새롭게 대출 된 자료입니다.
                </div>
                <div className="flex flex-col space-y-5 md:space-y-10 pr-4 md:pr-40">
                  {[0, 3, 6].map((startIdx, groupIndex) => (
                    <div
                      key={groupIndex}
                      className="flex flex-wrap gap-4 md:space-x-10"
                    >
                      {[0, 1, 2].map((offset) => (
                        <img
                          key={startIdx + offset}
                          src={bookImages[startIdx + offset]}
                          alt={`Book${startIdx + offset + 1}`}
                          className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-[5px]"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[1000px] h-[50px] md:h-[100px]" />
        </div>
      </div>
    </>
  );
};

export default MainSearch;
