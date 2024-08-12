// Synopsis.js
import React, { useState } from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea`
  width: 80%;
  height: 80px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 20px 10px 10px; /* 위쪽 패딩을 20px로 조정하여 시작점을 낮춤 */
  font-size: 16px;
  color: #000;
  background-color: #859AA5;
  display: block;
  margin-left: auto;
  margin-right: auto;

  ::placeholder {
    color: #fff;
  }
`;

const Label = styled.label`
  display: block;
  width: 80%;
  margin: 0 auto 10px;
  font-size: 18px;
  color: #000;
  text-align: left;
  margin-top: 5px;

`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80%;
  margin: 20px auto 0;
  gap: 10px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const AutoFillButton = styled(Button)`
  background-color: #75C96E;
  color: #000;
`;

const CreateScenarioButton = styled(Button)`
  background-color: #E23A3A;
  color: #000;
`;

function Synopsis() {
  const [characters, setCharacters] = useState('');
  const [plot, setPlot] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleAutoFill = () => {
    setCharacters('홍길동(17세), 남, 아버지를 아버지라 부르지 못하는 주인공\n심청이(16세), 여, 홍길동을 좋아하는 후배');
    setPlot('홍길동이 심청이의 도움으로 아버지와의 갈등을 극복하고 자신의 정체성을 찾아가는 이야기.');
    setKeywords('#연애남 #순정남 #첫사랑 #옆집 #교환학생 여주');
  };

  const handleCreateScenario = () => {
    alert('시나리오 제작 완료!');
  };

  return (
    <>
      <Label>등장인물</Label>
      <TextArea
        placeholder="등장인물"
        value={characters}
        onChange={(e) => setCharacters(e.target.value)}
      />
      <Label>줄거리 (공백 포함 200자 이내로 작성)</Label>
      <TextArea
        placeholder="줄거리 (공백 포함 200자 이내로 작성)"
        value={plot}
        onChange={(e) => setPlot(e.target.value)}
      />
      <Label>키워드 태그</Label>
      <TextArea
        placeholder="키워드 태그"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <ButtonContainer>
        <AutoFillButton onClick={handleAutoFill}>GPT 자동입력</AutoFillButton>
        <CreateScenarioButton onClick={handleCreateScenario}>
          시나리오 제작
        </CreateScenarioButton>
      </ButtonContainer>
    </>
  );
}

export default Synopsis;
