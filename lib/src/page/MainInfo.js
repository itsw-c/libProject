import React from "react";
import SideBar from "../components/SideBar";
import Children from "../assets/children.png";

const MainInfo = () => {
  return (
    <>
      <div className="flex">
        {/* 사이드바 */}
        <SideBar />

        {/* 메인 대가리 */}
        <div className="flex-1 p-10">
          <div className="w-[full] h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 pl-10 pt-10 pr-10">
            {/* 도서관 소개 */}
            <div className="w-full pb-5 border-b border-orange-200">
              <h1 className="text-2xl font-bold">도서관 소개</h1>
            </div>
            {/* 이용안내 */}
            <div className="mt-3">
              <h3 className="text-base font-normal">이용안내 - 도서관 소개</h3>
            </div>
          </div>

          {/* 메인 몸통 */}
          <div className="w-[full] h-[1050px] bg-amber-50 flex flex-col rounded border-4 border-orange-50 mt-10 p-10 pl-10">
            {/* 인사말 */}
            <div className="border-b border-orange-200 w-full pb-7 ">
              <h2 className="text-xl font-normal pt-5 ">인사말</h2>
            </div>
            <div className="pt-10 text-3xl">안녕하십니까!!!!</div>
            <div className="pt-20 text-xl">
              <div className="pb-10">
                IT 소프트웨어과 강다연, 강보은입니다.<br />
                ITSW도서관을 찾아주신 여러분을 환영합니다.<br />
              </div>
              <div className="pb-10">
                간단하고 재미있는 독서를 목표로 온라인 전용 ITSW도서 웹사이트를 개발하였습니다.<br />
                대출/반납 뿐 아니라 도서검색기능, 일정확인, 출석체크이벤트, 등등 각종 서비스를 이용하며<br />
                독서활동에 흥미를 유발함에 있어 노력하고 있습니다.
              </div>
              <div className="pb-10">
                앞으로도 열린마당의 이야기와 Q&A를 통한 의견들을 적극 반영해<br />
                보다 양질의 시스템을 제공하는 환경으로 나아갈 것입니다.
              </div>
              <div>
                ITSW도서관은 IT학부생들의 성장과 발전을 응원하고 지지하겠습니다.<br />
                여러분의 많은 관심과 지원 부탁드립니다.
              </div>

             {/* 이미지 오른쪽 정렬 */}
              <div className="w-full flex justify-end mt-10 pr-10 pb-20 pt-10">
               <img 
                  src={Children} 
                  alt="children" 
                  className="w-[300px] h-[250px]" /* 가로와 세로 길이를 각각 300으로 설정 */
                 />
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

export default MainInfo;
