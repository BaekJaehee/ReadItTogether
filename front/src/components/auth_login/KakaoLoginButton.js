import React from "react";

import kakao from "../../assets/login/kakao.png";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const KakaoLoginButton = () => {
  const handleKakaoLogin = async () => {
    try {
      window.location.href = `${API_BASE_URL}/klogin`
      console.log();
    } catch (error) {
      console.log("에러 코드:", error);
    }
  };

  return (
    <button onClick={handleKakaoLogin}>
      <img src={kakao} className="w-" alt="카카오 로그인 버튼" />
    </button>
  );
};

export default KakaoLoginButton;
