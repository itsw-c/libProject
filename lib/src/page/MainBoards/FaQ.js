import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';

// 공지사항페이지 입니다.

const questions = [
  {
    question: 'Q1. 회원가입은 어떻게 하나요?',
    answer:
      "회원가입은 홈페이지 상단의 '회원가입' 버튼을 눌러 진행할 수 있습니다.",
  },
  {
    question: 'Q2. 비밀번호를 잊어버렸어요. 어떻게 해야 하나요?',
    answer:
      "비밀번호를 잊으셨다면, 로그인 페이지의 '비밀번호 찾기'를 통해 복구하실 수 있습니다.",
  },
  {
    question: 'Q3. 서비스 이용 요금은 얼마인가요?',
    answer:
      '기본 서비스는 무료로 제공되며, 프리미엄 서비스는 별도의 요금이 부과됩니다.',
  },
  {
    question: 'Q4. 서비스를 해지하려면 어떻게 하나요?',
    answer:
      '서비스 해지는 고객센터에 문의하시거나 설정에서 해지 신청을 하실 수 있습니다.',
  },
  {
    question: 'Q5. 개인정보는 어떻게 보호되나요?',
    answer:
      '저희는 SSL 암호화 기술을 사용하여 고객님의 정보를 안전하게 보호합니다.',
  },
  {
    question: 'Q6. 모바일 앱은 어디에서 다운로드할 수 있나요?',
    answer:
      '모바일 앱은 구글 플레이스토어와 애플 앱스토어에서 다운로드할 수 있습니다.',
  },
  {
    question: 'Q7. 고객센터 운영 시간은 언제인가요?',
    answer: '고객센터는 평일 오전 9시부터 오후 6시까지 운영됩니다.',
  },
  {
    question: 'Q8. 배송 상태는 어떻게 확인하나요?',
    answer: '마이페이지에서 배송 상태를 확인할 수 있습니다.',
  },
  {
    question: 'Q9. 결제 수단은 어떤 것이 있나요?',
    answer:
      '저희는 신용카드, 체크카드, 페이팔 등의 다양한 결제 수단을 지원합니다.',
  },
  {
    question: 'Q10. 정기 결제를 취소하려면 어떻게 하나요?',
    answer:
      '정기 결제는 설정 메뉴에서 취소하거나 고객센터에 문의하시면 됩니다.',
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
        <div className="p-6 bg-amber-50 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">자주하는 질문</h1>
          <div className="space-y-4">
            {questions.map((item, index) => (
              <div
                key={index}
                className="border w-full rounded-md p-4 shadow-sm hover:shadow-md transition"
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
