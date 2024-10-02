import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/atoms/userState";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoLogin() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const navigate = useNavigate();
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  const getAccessToken = async () => {
    if (accessTokenFetching) return; 

    try {
      setAccessTokenFetching(true); 

      const response = await axios.post(
        "http://43.200.200.147/kakao-login", 
        {
          authorizationCode: KAKAO_CODE, 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const accessToken = response.data.accessToken;
      setUserInfo({
        ...userInfo,
        accessToken: accessToken,
      });
      
      await getUserInfo(accessToken); 

      setAccessTokenFetching(false); 
      navigate("https://createstory.co.kr"); 
    } catch (error) {
      console.error("Error:", error);
      setAccessTokenFetching(false); 
    }
  };
  //백엔 사용자 정보 가져오는 함수
  const getUserInfo = async (accessToken) => {
    try {
      const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userInfo = response.data;
      console.log(userInfo); 

      // 사용자 정보를 Recoil 상태에 저장
      setUserInfo({
        ...userInfoState,
        kakaoAccount: userInfo.kakao_account,
      });
    } catch (error) {
      console.error("사용자 정보 가져오기 실패", error);
    }
  };

  useEffect(() => {
    if (KAKAO_CODE && !userInfo.accessToken) {
      getAccessToken();
    }
  }, [KAKAO_CODE, userInfo]);

  return (
    <div>
      <div>Loading...</div>
    </div>
  );
}

export default KakaoLogin;
