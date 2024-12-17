import React from 'react';
import SideBar from '../../components/SideBar';

const Calander = () => {
  // 12월 달력 데이터를 생성
  const dates = Array.from({ length: 31 }, (_, i) => i + 1); // 12월 날짜
  const startDay = 0; // 12월 1일이 일요일이므로 0으로 설정 (0: 일요일, 1: 월요일, ..., 6: 토요일)

  return (
    <div>
      {/* 사이드바 동적 움직임 Css */}
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="sticky top-0 h-screen">
          <SideBar />
        </div>

        {/* 메인 대가리 */}
        <div className="flex-1 p-10">
          <div className="w-full h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 pl-10 pt-10 pr-10">
            {/* 도서관 소개 */}
            <div className="w-full pb-5 border-b border-orange-200">
              <h1 className="text-2xl font-bold">도서관 소개</h1>
            </div>
            {/* 이용안내 */}
            <div className="mt-3">
              <h3 className="text-base font-normal">
                이용안내 - 도서관 일정안내
              </h3>
            </div>
          </div>

          {/* 메인 몸통 */}
          <div className="w-full bg-amber-50 rounded flex flex-col border-4 border-orange-50 mt-10 p-10">
            {/* 인사말 */}
            <div className="border-b border-orange-200 w-full pb-7">
              <h2 className="text-xl font-bold pt-5">도서관 12월 일정안내</h2>
            </div>

            {/* 달력 */}
            <div className="mt-16">
              <div className="grid grid-cols-7 gap-2 text-center font-bold text-lg">
                {/* 요일 헤더 */}
                {['SUN', 'MON', 'TUE', 'WES', 'THR', 'FRI', 'SAT'].map(
                  (day, idx) => (
                    <div
                      key={idx}
                      className={`py-2 ${
                        idx === 0
                          ? 'text-red-500'
                          : idx === 6
                          ? 'text-blue-500'
                          : 'text-black'
                      }`}
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>
              <div className="grid grid-cols-7 gap-2 mt-10">
                {/* 빈 칸 */}
                {Array.from({ length: startDay }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-20 border"></div>
                ))}
                {/* 날짜 */}
                {dates.map((date) => (
                  <div
                    key={date}
                    className={`h-20 border rounded bg-white hover:bg-orange-100 transition pl-2 ${
                      date === 5
                        ? 'bg-orange-300' // 12월 5일 독서DAY 강조
                        : date === 23
                        ? 'bg-blue-300' // 12월 23일 시스템 점검일 강조
                        : ''
                    }`}
                  >
                    {date}
                    {date === 5 && (
                      <div className="text-s pt-2 pl-12 font-bold">독서DAY</div>
                    )}
                    {date === 23 && (
                      <div className="text-s pt-2 pl-6 font-bold">
                        시스템 점검일
                      </div>
                    )}
                  </div>
                ))}
                {/* 남은 빈 칸 */}
                {Array.from({ length: 42 - (startDay + dates.length) }).map(
                  (_, idx) => (
                    <div key={`empty-end-${idx}`} className="h-20 border"></div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-[100px]">
            {/* 몸통 아래 푸터 위에 약간의 공백 설정 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calander;
