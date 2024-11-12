import React, { useState } from "react";
import styled from "styled-components";

const StyledTextContent = styled.div`
  max-height: 120px;
  overflow: hidden;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: 13px;
  position: relative;
`;

const MoreButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 5px;
  font-size: 13px;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
`;

const PopupBackground = styled.div`
  position: fixed;
  top: -2.5vh;
  left: -2.5vw;
  width: 100vw;
  height: 94vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 99999;
`;

const PopupContent = styled.div`
  font-size: 13px;
  white-space: pre-wrap;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  background: none;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const TextContent = ({ content }) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleTogglePopup = () => {
    setShowFullText(!showFullText);
  };

  const isLongText = content.length > 128;
  const displayText = isLongText ? content.slice(0, 115) + "..." : content;

  return (
    <div>
      <StyledTextContent>{displayText}</StyledTextContent>
      {isLongText && (
        <MoreButton onClick={handleTogglePopup}>더보기</MoreButton>
      )}

      {showFullText && (
        <PopupBackground onClick={handleTogglePopup}>
          <PopupContainer>
            <PopupContent>{content}</PopupContent>
            <CloseButton onClick={handleTogglePopup}>닫기</CloseButton>
          </PopupContainer>
        </PopupBackground>
      )}
    </div>
  );
};

export default TextContent;
