import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';

// 공지사항페이지 입니다.

const questions = [
  {
    question: 'Q1. 회원가입은 어떻게 하나요?',
    answer:
      "회원가입은 도서관 홈페이지 상단의 '회원가입' 버튼을 눌러 진행할 수 있습니다.",
  },
  {
    question: 'Q2. 비밀번호를 잊어버렸어요. 어떻게 해야 하나요?',
    answer:
      "비밀번호를 잊으셨다면, 로그인 페이지의 '비밀번호 찾기'를 통해 복구하실 수 있습니다.",
  },
  {
    question: 'Q3. 도서 대출은 어떻게 하나요?',
    answer:
      "도서를 대출하려면 로그인 후 원하는 도서를 검색하고 '대출 신청' 버튼을 클릭하세요.",
  },
  {
    question: 'Q4. 도서를 반납하려면 어떻게 하나요?',
    answer:
      '도서를 반납하려면 도서관 방문 시 대출 데스크에서 반납 처리를 하거나 무인 반납기를 이용할 수 있습니다.',
  },
  {
    question: 'Q5. 연체된 도서를 반납하면 연체료가 있나요?',
    answer:
      '연체된 도서를 반납할 경우, 연체 일수에 따라 연체료가 부과됩니다. 연체료 정책은 도서관 공지사항을 참고하세요.',
  },
  {
    question: 'Q6. 전자책 서비스는 어떻게 이용하나요?',
    answer: "전자책은 로그인 후 '전자도서관' 메뉴에서 이용할 수 있습니다.",
  },
  {
    question: 'Q7. 도서관 운영 시간은 어떻게 되나요?',
    answer:
      '도서관은 평일 오전 9시부터 오후 8시까지 운영되며, 주말은 오전 10시부터 오후 6시까지 운영됩니다.',
  },
  {
    question: 'Q8. 도서 예약은 어떻게 하나요?',
    answer:
      "도서 예약은 로그인 후 원하는 도서를 검색하고 '예약하기' 버튼을 클릭하면 완료됩니다.",
  },
  {
    question: 'Q9. 열람실 좌석은 어떻게 예약하나요?',
    answer:
      "열람실 좌석 예약은 '열람실 예약' 메뉴를 통해 가능합니다. 실시간 좌석 현황을 확인한 후 예약하세요.",
  },
  {
    question: 'Q10. 도서 기부는 어떻게 하나요?',
    answer:
      '도서 기부를 원하시면 도서관 사무실에 직접 방문하시거나, 기부 신청서를 작성해 주시면 안내해 드립니다.',
  },
];

const FaQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      <div className="sticky top-0 h-screen">
        <SideBar />
      </div>
      <div className="container mx-auto p-10">
        {/* 상단 헤더 섹션 */}
        <div className="w-full min-h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 p-10">
          <div className="w-full pb-5 border-b border-orange-200">
            <h1 className="text-2xl font-bold">열린마당</h1>
          </div>
          <div className="mt-3">
            <h3 className="text-base font-normal">열린마당 - 자주하는 질문</h3>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="w-full  bg-[#FFFCE6] rounded border-4 border-orange-50 mt-5 md:mt-10 p-5 md:p-10">
          <h1 className="text-2xl font-bold mb-4">자주하는 질문</h1>

          <div className="space-y-4">
            {questions.map((item, index) => (
              <div
                key={index}
                className="border w-full bg-white rounded-md p-4 shadow-sm hover:shadow-md transition"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleQuestion(index)}
                >
                  <h2 className="text-lg font-semibold">{item.question}</h2>
                  <span>{openIndex === index ? '-' : '+'}</span>
                </div>
                {openIndex === index && (
                  <p className="mt-2 text-gray-600">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaQ;
