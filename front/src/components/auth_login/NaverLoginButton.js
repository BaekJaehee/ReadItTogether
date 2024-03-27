import React from "react";
import { getSessionState } from "../../api/accounts/authService";

import button from "../../assets/login/naver.png";

const NaverLoginButton = () => {
  const handleNaverLogin = async () => {
    try {
      const stateValue = await getSessionState();
      const clientId = "BhgPI41QJJvnrjEPl_2D";
      const redirectUri = encodeURIComponent(
        `${window.location.origin}/login/callback`
      );
      const naverAuthUrl = "https://nid.naver.com/oauth2.0/authorize";
      const responseType = "code";
      const state = encodeURIComponent(
        JSON.stringify({ provider: "naver", stateValue: stateValue })
      );

      window.location.href = `${naverAuthUrl}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}`;
    } catch (error) {
      console.log("에러 코드:", error);
    }
  };

  return (
    <button onClick={handleNaverLogin}>
      <img src={button} className="w-52 rounded-md" alt="네이버 로그인 버튼" />
    </button>
  );
};

export default NaverLoginButton;
