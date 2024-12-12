import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuTap from './MenuTap';

export const MenuBar = () => {
  const navigate = useNavigate();
  const [showMenuTap, setShowMenuTap] = useState(false);

  const handleMouseEnter = () => setShowMenuTap(true);
  const handleMouseLeave = () => setShowMenuTap(false);

  const handleSearchClick = () => navigate('/MainSearch');
  const handleInfoClick = () => navigate('/MainInfo');
  const handleBoardClick = () => navigate('/Notice');
  const handleMyClick = () => navigate('/MainMy');

  return (
    <div
      className="relative bg-white border-b border-gray-400"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-5">
        <div
          className="text-gray-800 font-bold text-xl text-center whitespace-nowrap w-72 cursor-pointer"
          onClick={handleSearchClick}
        >
          자료검색
        </div>
        <div
          className="text-gray-800 font-bold text-xl text-center whitespace-nowrap w-72 cursor-pointer"
          onClick={handleInfoClick}
        >
          이용안내
        </div>
        <div
          className="text-gray-800 font-bold text-xl text-center whitespace-nowrap w-72 cursor-pointer"
          onClick={handleBoardClick}
        >
          열린마당
        </div>
        <div
          className="text-gray-800 font-bold text-xl text-center whitespace-nowrap w-72 cursor-pointer"
          onClick={handleMyClick}
        >
          내 서재
        </div>
      </div>

      {/* MenuTap을 MenuBar 바로 아래에 위치 */}
      {showMenuTap && (
        <div className="absolute inset-x-0 top-full bg-white border-t border-gray-400 z-10">
          <MenuTap />
        </div>
      )}
    </div>
  );
};

export default MenuBar;
