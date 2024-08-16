import React from 'react';
import styled from 'styled-components';

// 스타일드 컴포넌트 정의
const ProfileCard = styled.div`
  display: flex;
  gap: 20px; /* 칸 사이의 간격 */
`;

const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px; /* 첫 번째 칸의 너비 조정 */
  background-color: #C6D0D6; /* 배경 색상 설정 */
  padding: 20px; /* 패딩 추가 */
  border-radius: 10px; /* 모서리 둥글게 처리 */
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #95A4AD;
  margin-bottom: 30px; /* 이미지와 링크 사이의 간격 */
  margin-top: 10px; 
`;

const ProfileLink = styled.a`
  color: #2474A1;
  text-decoration: underline;
  margin: 5px 0; /* 링크 사이의 간격 */
  font-size: 14px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #C6D0D6; /* 배경 색상 설정 */
  padding: 10px; /* 패딩 추가 */
  border-radius: 10px; /* 모서리 둥글게 처리 */
  flex-grow: 1;
`;

const ProfileName = styled.h2`
  margin: 10px;
  color: black;
  font-size: 24px;
  display: flex;
  align-items: center;
`;

const EditNickname = styled.a`
  color: #2474A1;
  text-decoration: underline;
  margin-left: 10px; /* 닉네임과 링크 사이의 간격 */
  font-size: 14px;
`;

const ProfileEmail = styled.p`
  margin: 10px;
  color: gray;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #C6D0D6;
  border: none;
  border-radius: 5px;
  color: black;
  padding: 15px 20px; /* 세로 크기를 살짝 크게 조정 (기존 10px에서 15px으로 증가) */
  margin: 10px 0; /* 버튼 사이에 간격 추가 */
  cursor: pointer;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  display: flex; /* 버튼 내에서 이미지와 텍스트를 나란히 배치하기 위해 flex 사용 */
  align-items: center; /* 이미지와 텍스트를 수직으로 중앙 정렬 */
  
  &:hover {
    background-color: #AAB9BF; /* Hover 색상 */
  }
`;

const ButtonImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px; /* 이미지와 텍스트 사이의 간격 */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// 시나리오 보관함 스타일드 컴포넌트 정의
const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열로 설정 */
  gap: 20px; /* 각 칸 사이의 간격 */
`;

const ScenarioItem = styled.div`
  background-color: #C6D0D6;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  color: black;
  font-size: 16px;
  height: 200px;
  margin: 10px;
`;

const Heading = styled.h1`
  font-size: 28px; /* 제목 크기 조정 */
  margin-bottom: 20px; /* 제목과 내용 사이의 간격 */
  color: black;
`;

// ProfileDetail 컴포넌트
const ProfileDetail = () => (
    <div>
    <Heading>나의 정보</Heading>
    <ProfileCard>
      <ProfileImageSection>
        <ProfileImage src="/profile.png" alt="Profile" />
        <ProfileLink href="/change-profile-picture">프로필 사진 변경</ProfileLink>
        <ProfileLink href="/change-password">비밀번호 변경</ProfileLink>
      </ProfileImageSection>
      <ProfileDetails>
        <ProfileName>
          AI키드
          <EditNickname href="/change-nickname">닉네임 변경</EditNickname>
        </ProfileName>
        <ProfileEmail>E-mail : abc@gmail.com</ProfileEmail>
      </ProfileDetails>
    </ProfileCard>
  </div>
);

// MyPageDetail 컴포넌트
export default function MypageDetail({ selectedMenu }) {
  const renderContent = () => {
    switch (selectedMenu) {
      case 'profile':
        return <ProfileDetail />; // ProfileDetail 컴포넌트를 렌더링

      case 'scenario':
        return (
          <ScenarioGrid>
            <ScenarioItem>시나리오 1</ScenarioItem>
            <ScenarioItem>시나리오 2</ScenarioItem>
            <ScenarioItem>시나리오 3</ScenarioItem>
            <ScenarioItem>시나리오 4</ScenarioItem>
            <ScenarioItem>시나리오 5</ScenarioItem>
            <ScenarioItem>시나리오 6</ScenarioItem>
          </ScenarioGrid>
        );

      case 'settings':
        return (
          <ButtonContainer>
            <Button>
              <ButtonImage src="/setting1.png" alt="설정1" />
              저장한 콘텐츠 모두 삭제
            </Button>
            <Button>
              <ButtonImage src="/setting2.png" alt="설정2" />
              회원 탈퇴
            </Button>
          </ButtonContainer>
        );

      case 'help':
        return (
          <ButtonContainer>
            <Button>
              <ButtonImage src="/center1.png" alt="개인정보처리방침" />
              개인정보처리방침
            </Button>
            <Button>
              <ButtonImage src="/center1.png" alt="오픈소스 라이선스" />
              오픈소스 라이선스
            </Button>
            <Button>
              <ButtonImage src="/center2.png" alt="1:1 문의" />
              1:1 문의
            </Button>
          </ButtonContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}
