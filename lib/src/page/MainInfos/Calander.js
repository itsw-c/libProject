import React from 'react';
import SideBar from '../../components/SideBar';
import CalanderPicture from '../../assets/CalanderPicture.png';

const Calander = () => {
  return (
    <div>
      <>
        <div className="flex">
          {/* 사이드바 */}
          <SideBar />

          {/* 메인 대가리 */}
          <div className="flex-1 p-10">
            <div className="w-[1100px] h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 pl-10 pt-10 pr-10">
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
            <div className="w-[1100px] h-[1050px] bg-amber-50 rounded border-4 border-orange-50 mt-10 p-10 pl-10">
              {/* 인사말 */}
              <div className="border-b border-orange-200 w-full pb-7 ">
                <h2 className="text-xl font-bold pt-5">도서관 월별 일정안내</h2>
              </div>
              <div className="center mt-10">
                <img
                  src={CalanderPicture}
                  alt="CalanderPicture"
                  height="900px"
                  width="1000px"
                  className="rounded-[30px]" // 모서리를 둥글게 만드는 클래스
                />
              </div>
            </div>
            <div className="w-[1000px] h-[100px]">
              {/*몸통 아래 푸터 위에 약간의 공백 설정*/}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Calander;
