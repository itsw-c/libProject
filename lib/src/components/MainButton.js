import React from 'react';
import { Link } from 'react-router-dom';

import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';
import icon5 from '../assets/icon5.png';
import icon6 from '../assets/icon6.png';
import arrow from '../assets/Arrow.svg';

function MainButton() {
  return (
    <div className="w-[370px] h-auto grid grid-cols-3 gap-4 relative">
      {/* 박스 1 */}
      <div className="w-[110px] h-[147.19px] bg-white rounded-[10px] flex flex-col items-center">
        <img
          className="w-[70px] h-[70.09px] mt-4"
          src={icon1}
          alt="도서관이용안내"
        />
        <p className="mt-4 text-center text-[#909090] text-sm font-semibold">
          도서관이용안내
        </p>
      </div>

      {/* 박스 2 */}
      <div className="w-[110px] h-[147.19px] bg-white rounded-[10px] flex flex-col items-center">
        <img className="w-[70px] h-[70.09px] mt-4" src={icon2} alt="추천도서" />
        <p className="mt-4 text-center text-[#909090] text-sm font-semibold">
          추천도서
        </p>
      </div>

      {/* 박스 3 */}
      <div className="w-[110px] h-[147.19px] bg-white rounded-[10px] flex flex-col items-center">
        <img
          className="w-[70px] h-[70.09px] mt-4"
          src={icon3}
          alt="전자도서관"
        />
        <p className="mt-4 text-center text-[#909090] text-sm font-semibold">
          전자도서관
        </p>
      </div>

      {/* 박스 4 */}
      <div className="w-[110px] h-[147.19px] bg-white rounded-[10px] flex flex-col items-center">
        <img
          className="w-[70px] h-[70.09px] mt-4"
          src={icon4}
          alt="원문 검색"
        />
        <p className="mt-4 text-center text-[#909090] text-sm font-semibold">
          원문 검색
        </p>
      </div>

      {/* 박스 5 */}
      <div className="w-[110px] h-[147.19px] bg-white rounded-[10px] flex flex-col items-center">
        <img className="w-[70px] h-[70.09px] mt-4" src={icon5} alt="공지사항" />
        <p className="mt-4 text-center text-[#909090] text-sm font-semibold">
          공지사항
        </p>
      </div>

      {/* 박스 6 */}
      <div className="w-[110px] h-[147.19px] bg-white rounded-[10px] flex flex-col items-center">
        <img
          className="w-[70px] h-[70.09px] mt-4"
          src={icon6}
          alt="북큐레이션"
        />
        <p className="mt-4 text-center text-[#909090] text-sm font-semibold">
          북큐레이션
        </p>
      </div>

      {/* 내 서재 바로가기 */}
      <Link to="/MainMy">
        <div className="w-[370px] h-[60.08px] bg-white rounded-[10px] flex items-center justify-center col-span-3">
          <p className="text-center text-[#909090] text-xl font-medium">
            내 서재 바로가기
          </p>
          <image src={arrow} alt="내서재로 이동" />
        </div>
      </Link>
    </div>
  );
}

export default MainButton;
