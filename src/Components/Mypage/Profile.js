import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthProvider'; // 경로에 맞게 수정

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

// Profile 컴포넌트 정의
const Profile = () => {
  const { user } = useAuth(); // 로그인된 사용자 정보 가져오기

  return (
    <div>
      <ProfileCard>
        <ProfileImageSection>
          <ProfileImage src={user?.imageUrl || '/프로필 사진.png'} alt="Profile" />
          <ProfileLink href="/change-profile-picture">프로필 사진 변경</ProfileLink>
          <ProfileLink href="/change-password">비밀번호 변경</ProfileLink>
        </ProfileImageSection>
        <ProfileDetails>
          <ProfileName>
            {user?.name || 'AI키드'}
            <EditNickname href="/change-nickname">닉네임 변경</EditNickname>
          </ProfileName>
          <ProfileEmail>E-mail : {user?.email || 'example@gmail.com'}</ProfileEmail>
        </ProfileDetails>
      </ProfileCard>
    </div>
  );
};

export default Profile;