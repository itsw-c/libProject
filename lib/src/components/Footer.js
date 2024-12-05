import React from 'react';
import logoImage from '../assets/logotypo.png';
import { ReactComponent as InfoIcon } from '../assets/info.svg';

function Footer() {
  return (
    <footer className="bg-[#533300] py-8 mt-auto relative z-10">
      <div className="w-full h-[200px] max-w-[1520px] mx-auto relative">
        <img
          className="w-[204.70px] h-[49.33px] left-[170px] top-[32px] absolute"
          alt="도서관 로고"
          src={logoImage}
        />

        <div className="left-[1231px] top-[184px] absolute flex items-center space-x-2 text-white text-[16px] font-semibold font-['Inter']">
          <InfoIcon className="w-6 h-6 text-white fill-current" />
          <span>관리자 페이지</span>
        </div>

        <div className="left-[170px] top-[117px] absolute text-white text-[16px] font-bold font-['Inter'] text-left">
          13174 성남시 중원구 광명로 377(금광2동 2685) <br />
          안내 : 031-740-1114
        </div>
        <div className="left-[170px] top-[178px] absolute text-white text-xl font-normal font-['Inter']">
          © 2024 ITSW도서관. All rights reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
