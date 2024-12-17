import React from 'react';
import SideBar from '../../components/SideBar';
import recomBook1 from '../../assets/Books/recomBook1.png';
import recomBook2 from '../../assets/Books/recomBook2.png';
import recomBook3 from '../../assets/Books/recomBook3.png';

// 주제별 검색 페이지

const RecomSearch = () => {
  const books = [
    {
      img: recomBook1,
      title: '소년이 온다',
      author: '한강',
      publisher: '강보은',
      year: '2020년',
      description:
        '소년이 온다는 한강 작가의 6번째 장편소설이다. 1980년 5월 18일부터 열흘간 있었던 광주 민주화 운동 당시의 상황과 그 이후 남겨진 사람들의 이야기를 들려준다.',
    },
    {
      img: recomBook2,
      title: '소년이 온다',
      author: '한강',
      publisher: '강보은',
      year: '2020년',
      description:
        '어느덧 그 시절을 잊고 무심하게 5․18 이후를 살고 있는 우리에게 묵직한 질문을 던진다.',
    },
    {
      img: recomBook3,
      title: '소년이 온다',
      author: '한강',
      publisher: '강보은',
      year: '2020년',
      description:
        '여전히 5․18의 트라우마를 안고 힘겹게 살아가는 사람들을 위무한다.',
    },
  ];

  return (
    <div className="flex">
      {/* 사이드바 */}
      <SideBar />

      {/* 메인 섹션 */}
      <div className="flex-1 p-10">
        {/* 헤더 */}
        <div className="w-full h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 pl-10 pt-10 pr-10">
          <div className="w-full pb-5 border-b border-orange-200">
            <h1 className="text-2xl font-bold">추천도서</h1>
          </div>
          <div className="mt-3">
            <h3 className="text-base font-normal">자료검색 - 추천도서</h3>
          </div>
        </div>

        {/* 리스트 섹션 */}
        <div className="w-full bg-amber-50 rounded border-4 border-orange-50 p-10">
          <div className="border-b border-gray-500 pb-5">
            <h2 className="text-xl font-bold">12월 추천도서 ♥</h2>
          </div>

          {/* 리스트 컨테이너 */}
          <ul className="space-y-6 pt-10">
            {books.map((book, index) => (
              <li
                key={index}
                className="flex items-start border-b pb-6 border-gray-300"
              >
                <img
                  src={book.img}
                  alt={`book-${index}`}
                  className="w-[100px] h-[150px]  object-cover mr-6"
                />
                <div>
                  <h3 className="text-lg font-bold">{book.title}</h3>
                  <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <p>저자: {book.author}</p>
                    <p>발행자: {book.publisher}</p>
                    <p>발행연도: {book.year}</p>
                  </div>
                  <p className="text-sm text-gray-700 mt-4">{book.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecomSearch;
