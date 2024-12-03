import React, { useState } from 'react';
import Image1 from '../assets/Image1.png';
import Image2 from '../assets/Image2.png';
import Image3 from '../assets/Image3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ImageCarousel = () => {
  const images = [Image1, Image2, Image3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="w-[370px] h-[394.52px] relative">
      {/* 이미지 영역 */}
      <div className="w-[370px] h-[334px] absolute top-0 left-0 rounded-tl-[10px] rounded-tr-[10px] overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Carousel ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 하단 검정 박스와 이미지 버튼 */}
      <div className="w-[370px] h-[60px] absolute top-[333px] left-0">
        <div className="w-full h-full bg-black rounded-bl-[10px] rounded-br-[10px]" />

        {/* 이전 버튼 이미지 */}
        <FontAwesomeIcon
          icon="fa-solid fa-chevron-left"
          onClick={prevImage}
          className="text-[#ffffff] w-[25px] h-[25px] absolute left-[17px] top-[17px] cursor-pointer hover:opacity-80"
        />

        {/* 다음 버튼 이미지 */}
        <FontAwesomeIcon
          icon="fa-solid fa-chevron-right"
          onClick={nextImage}
          className="text-[#ffffff] w-[25px] h-[25px] absolute left-[336px] top-[17px] cursor-pointer hover:opacity-80"
        />
      </div>
    </div>
  );
};

export default ImageCarousel;
