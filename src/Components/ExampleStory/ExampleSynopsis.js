import React from "react";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 100%;
  margin: 0;
  font-size: 16px;
  color: #000;
  position: relative;
  padding-right: 35px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: ${(props) => props.height || "120px"};
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  font-size: 16px;
  color: #000;
  background-color: #f5f5f5;
  display: block;
  resize: vertical;
`;

const Label = styled.label`
  display: block;
  width: 80%;
  font-size: 18px;
  color: #000;
  text-align: left;
  margin: 10px 0;
`;

function ExampleSynopsis() {
  return (
    <Section>
      <Label>등장인물 (콤마로 구분)</Label>
      <TextArea placeholder="예: 홍길동, 김철수, 이영희" value={characters} />
      <Label>키워드 태그 (콤마로 구분)</Label>
      <TextArea
        placeholder="예: 모험, 우정, 성장"
        value={keyword} // 단일 키워드 필드로 설정
      />
      <Label>시놉시스</Label>
      <TextArea
        placeholder="시놉시스를 생성하려면 '시놉시스 생성' 버튼을 클릭하세요."
        value={plot}
        height="300px"
        readOnly={isGenerating}
      />
      <Label>수정 요청사항</Label>
      <TextArea
        placeholder="GPT에게 수정을 요청할 사항을 적어주세요."
        value={gptRequest}
        height="300px"
      />
    </Section>
  );
}

export default ExampleSynopsis;
