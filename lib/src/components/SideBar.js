import React from "react";
import  frogIcon from "../assets/forgIcon.png";

//사이드바
const SideBar = () => {

  let title = "이용안내";  //클릭마다 글자를 바꿔 줄 변수 기본값 설정
  let intro ="도서관 소개";
  let info="도서관 이용안내";
  let cal ="도서관 일정안내";

  return (
    
    <div className="w-[200px] text-center mx-10 my-60 ">

      <div className="w-[100px] h-[55px] ">
      <img src={frogIcon} alt="assets/frogIcon"/>
      </div>

      <div className="w-[200px] h-[120px] bg-amber-400 rounded-t-lg flex items-center justify-center">
        <p className="text-black text-xl font-normal ">{title}</p>
      </div>

      <div className="w-[200px] h-[80px] bg-[#533300] flex items-center justify-center">
        <h2 className="text-white text-xl font-semibold">{intro}</h2>
      </div>

      <div className="w-[200px] h-[80px] bg-orange-50 flex items-center justify-center">
        <h2 className="text-black text-xl font-normal">{info}</h2>
      </div>

      <div className="w-[200px] h-[80px] bg-orange-50 rounded-b-lg flex items-center justify-center">
        <h2 className="text-black text-xl font-normal">{cal}</h2>
      </div>
    </div>
  );
};

export default SideBar;
