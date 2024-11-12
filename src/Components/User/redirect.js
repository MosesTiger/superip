import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";
import Spinner from "../elements/Spinner";

const KakaoAuthHandler = () => {
  const dispatch = useDispatch();


  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(() => {
    // 인가코드를 백엔드로 보내서 토큰을 받는 로직
    dispatch(userAction.kakaoLoginAC(code));
  }, [dispatch, code]);

  return (
    <Wrap>
      <Spinner />
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-top: 50px;
  min-height: 1100px;
`;

export default KakaoAuthHandler;
