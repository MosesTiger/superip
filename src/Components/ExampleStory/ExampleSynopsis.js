import React from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

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
  const { movieData } = useOutletContext();

  if (!movieData) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const { characters, keywords, synopsis } = movieData;

  return (
    <Section>
      <Label>등장인물 (콤마로 구분)</Label>
      <TextArea value={characters} readOnly />
      <Label>키워드 태그 (콤마로 구분)</Label>
      <TextArea value={keywords} readOnly />
      <Label>시놉시스</Label>
      <TextArea value={synopsis} readOnly height="300px" />
    </Section>
  );
}

export default ExampleSynopsis;