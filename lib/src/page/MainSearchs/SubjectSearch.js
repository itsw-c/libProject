import React from 'react';
import SideBar from '../../components/SideBar';
import recomBook1 from '../../assets/Books/recomBook1.png';
import recomBook2 from '../../assets/Books/recomBook2.png';
import recomBook3 from '../../assets/Books/recomBook3.png';

const SubjectSearch = () => {
  return (
    <>
      <div className="flex">
        {/* 사이드바 */}
        <SideBar />

        {/* 메인 대가리 */}
        <div className="flex-1 p-10">
          <div className="w-[1100px] h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-20 pl-10 pt-10 pr-10">
            {/* 도서관 소개 */}
            <div className="w-full pb-5 border-b border-orange-200">
              <h1 className="text-2xl font-bold">추천도서</h1>
            </div>
            {/* 이용안내 */}
            <div className="mt-3">
              <h3 className="text-base font-normal">자료검색 - 주제별검색</h3>
            </div>
          </div>

          {/* 메인 몸통 */}
          <div className="w-[1100px] h-[880px] bg-amber-50 rounded border-4 border-orange-50 mt-10 p-10 pl-10">
            {/* 인사말 */}
            <div className="border-b border-gray-500 w-full pb-7 ">
              <h2 className="text-xl font-bold pt-5 ">주제별 검색 대신</h2>
            </div>

            {/*추천 도서 한블럭-1*/}
            <div className="flex space-x-10 border-b pb-10 border-gray-500 pt-10">
              <div className="">
                <img
                  src={recomBook1}
                  alt="recomBook1"
                  className="w-[100px] h-[150px]" /* 가로와 세로 길이를 각각 300으로 설정 */
                />
              </div>

              <div className="flex-col">
                <div>소년이 온다</div>
                <div className="flex space-x-6 pt-2">
                  <div>저자: 한강</div>
                  <div>발행자: 강보은</div>
                  <div>발행연도: 2020년</div>
                </div>
                <div className="text-gray-700">
                  소년이 온다는 한강작가의 6번째 장편소설이다. 1980년 5월
                  18일부터 열흘간 있었던
                  <br />
                  광주 민주화 운동 당시의 상황과 그 이후 남겨진 사람들의
                  이야기를 들려준다.
                  <br />
                  어느덧 그 시절을 잊고 무심하게 5․18 이후를 살고 있는 우리에게
                  묵직한 질문을 던지고,
                  <br />
                  여전히 5․18의 트라우마를 안고 힘겹게 살아가는 사람들을
                  위무한다.
                </div>
              </div>
            </div>

            {/*추천 도서 한블럭-1*/}
            <div className="flex space-x-10 border-b pb-10 border-gray-500 pt-10">
              <div className="">
                <img
                  src={recomBook2}
                  alt="recomBook2"
                  className="w-[100px] h-[150px]" /* 가로와 세로 길이를 각각 300으로 설정 */
                />
              </div>

              <div className="flex-col">
                <div>소년이 온다</div>
                <div className="flex space-x-6 pt-2">
                  <div>저자: 한강</div>
                  <div>발행자: 강보은</div>
                  <div>발행연도: 2020년</div>
                </div>
                <div className="text-gray-700">
                  소년이 온다는 한강작가의 6번째 장편소설이다. 1980년 5월
                  18일부터 열흘간 있었던
                  <br />
                  광주 민주화 운동 당시의 상황과 그 이후 남겨진 사람들의
                  이야기를 들려준다.
                  <br />
                  어느덧 그 시절을 잊고 무심하게 5․18 이후를 살고 있는 우리에게
                  묵직한 질문을 던지고,
                  <br />
                  여전히 5․18의 트라우마를 안고 힘겹게 살아가는 사람들을
                  위무한다.
                </div>
              </div>
            </div>

            {/*추천 도서 한블럭-1*/}
            <div className="flex space-x-10 border-b pb-10 border-gray-500 pt-10">
              <div className="">
                <img
                  src={recomBook3}
                  alt="recomBook3"
                  className="w-[100px] h-[150px]" /* 가로와 세로 길이를 각각 300으로 설정 */
                />
              </div>

              <div className="flex-col">
                <div>소년이 온다</div>
                <div className="flex space-x-6 pt-2">
                  <div>저자: 한강</div>
                  <div>발행자: 강보은</div>
                  <div>발행연도: 2020년</div>
                </div>
                <div className="text-gray-700">
                  소년이 온다는 한강작가의 6번째 장편소설이다. 1980년 5월
                  18일부터 열흘간 있었던
                  <br />
                  광주 민주화 운동 당시의 상황과 그 이후 남겨진 사람들의
                  이야기를 들려준다.
                  <br />
                  어느덧 그 시절을 잊고 무심하게 5․18 이후를 살고 있는 우리에게
                  묵직한 질문을 던지고,
                  <br />
                  여전히 5․18의 트라우마를 안고 힘겹게 살아가는 사람들을
                  위무한다.
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

export default SubjectSearch;
