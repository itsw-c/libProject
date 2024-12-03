import React from 'react';
import SideBar from '../../components/SideBar';

const UsingGuid = () => {
  return (
    <div>
      <>
        <div className="flex">
          {/* 사이드바 */}
          <SideBar />

          {/* 메인 대가리 */}
          <div className="flex-1 p-10">
            <div className="w-[1100px] h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-20 pl-10 pt-10 pr-10">
              {/* 도서관 소개 */}
              <div className="w-full pb-5 border-b border-orange-200">
                <h1 className="text-2xl font-bold">도서관 소개</h1>
              </div>
              {/* 이용안내 */}
              <div className="mt-3">
                <h3 className="text-base font-normal">
                  이용안내 - 도서관 이용안내
                </h3>
              </div>
            </div>

            {/* 메인 몸통 */}
            <div className="w-[1100px] h-[1700px] bg-amber-50 rounded border-4 border-orange-50 mt-10 p-10 pl-10">
              {/* 인사말 */}
              <div className="border-b border-orange-200 w-full pb-7 ">
                <h2 className="text-xl font-bold pt-5">이용안내</h2>
              </div>

              <div className="pt-10 text-10">
                <div>º 이용대상</div>
                <div className="pt-5">
                  정보이용, 조사, 연구등을 목적으로 소장 도서관 자료들을
                  이용하고자 하는 만 16세인자
                  <br />
                  단, 만 16세 미만(초등학생 이하 제외)인 자가 조사, 연구를
                  목적으로 이용할 경우 법정대리인의 동의 정차를 거침.
                </div>

                <div className="pt-20">º 이용정보</div>
                <div className="pt-5">
                  온라인 웹사이트 특성상 점검일 제외 24시 사용가능
                </div>

                <div className="pt-20">º 이용방법</div>
                <div className="pt-5 pb-10">-자료이동</div>

                <div className="flex space-x-5 pt-10">
                  {' '}
                  {/* 이 div를 추가하여 자식 요소들을 가로로 배치 */}
                  {/* 자료이용 안내 블럭 1 */}
                  <div className="w-[250px] h-[140px] bg-amber-50 rounded border-2 border-[#533300]">
                    <div className="h-[35px] bg-[#533300] border-2 border-[#533300]">
                      <h2 className="text-slate-50 font-bold text-center">
                        01
                      </h2>
                    </div>
                    <h2 className="text-center pt-10">홈페이지회원가입</h2>
                  </div>
                  {/* 자료이용 안내 블럭 2 */}
                  <div className="w-[250px] h-[140px] bg-amber-50 rounded border-2 border-[#533300]">
                    <div className="h-[35px] bg-[#533300] border-2 border-[#533300]">
                      <h2 className="text-slate-50 font-bold text-center">
                        02
                      </h2>
                    </div>
                    <h2 className="text-center pt-10">생성계정으로로그인</h2>
                  </div>
                  {/* 자료이용 안내 블럭 3 */}
                  <div className="w-[250px] h-[140px] bg-amber-50 rounded border-2 border-[#533300]">
                    <div className="h-[35px] bg-[#533300] border-2 border-[#533300]">
                      <h2 className="text-slate-50 font-bold text-center">
                        03
                      </h2>
                    </div>
                    <h2 className="text-center pt-10">'도서검색 탭 클릭'</h2>
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
    </div>
  );
};

export default UsingGuid;
