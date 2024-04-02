import React from "react";

import kakao from "../../assets/login/kakao.png";

const KakaoLoginButton = () => {
  const handleKakaoLogin = async () => {
    try {
      window.location.href = "http://localhost:8000/klogin";
      console.log();
    } catch (error) {
      console.log("에러 코드:", error);
    }
  };

  return (
    <button onClick={handleKakaoLogin}>
      <img
        src={kakao}
        className="w-"
        alt="카카오 로그인 버튼"
      />
    </button>
  );
};

export default KakaoLoginButton;
