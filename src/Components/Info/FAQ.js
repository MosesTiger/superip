import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
  cursor: pointer;
`;

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Question = styled.h2`
  font-size: 16px;
  margin: 0;
`;

const Answer = styled.p`
  font-size: 16px;
  margin-top: 10px;
  line-height: 1.5;
  display: ${({ isOpen }) =>
    isOpen ? "block" : "none"}; /* 열고 닫히는 기능 */
`;

const FAQArrow = styled.div`
  font-size: 16px;
`;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null); // 어떤 항목이 열렸는지 상태로 관리

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index); // 같은 항목을 누르면 닫힘
  };

  const faqData = [
    {
      question: "어떻게 사용하나요?",
      answer: "사용방법은 How 페이지에 상세히 적혀있습니다. 참고해주세요.",
    },
    {
      question: "저작권은 어떻게 되나요?",
      answer: "",
    },
    {
      question: "추천작은 기준이 뭔가요?",
      answer: "KMDB 한국영화 TOP500데이터를 받아서 사용하였습니다.",
    },
    {
      question: "외국영화 추천은 없나요?",
      answer:
        "네. 아쉽지만 현재 한국영화 데이터만 보유중이여서, 추후에 추가하도록 하겠습니다.",
    },
    {
      question: "어떤 AI를 사용하나요?",
      answer: "ChatGPT API를 사용중에 있습니다.",
    },
    {
      question: "만드는데 얼마나 걸리나요?",
      answer:
        "저희는 시나리오 창작의 도움을 주는 것을 목표로 하기 때문에, 작가님의 창작 의도에 따라 기간이 결정될 것 같습니다.",
    },
  ];

  return (
    <>
      {faqData.map((faq, index) => (
        <FAQItem key={index} onClick={() => toggleFAQ(index)}>
          <QuestionWrapper>
            <Question>{faq.question}</Question>
            <FAQArrow>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </FAQArrow>
          </QuestionWrapper>
          <Answer isOpen={openIndex === index}>{faq.answer}</Answer>
        </FAQItem>
      ))}
    </>
  );
}
