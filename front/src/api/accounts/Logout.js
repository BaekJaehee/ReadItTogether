import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios를 사용하여 HTTP 요청
import { AuthContext } from "../../authentication/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Logout = () => {
  const navigate = useNavigate();
  const { userState, setUserState } = useContext(AuthContext);

  useEffect(() => {
    const logout = async () => {
      try {
        // 로컬 스토리지에서 사용자 정보 삭제
        localStorage.removeItem(`memberId`);
        localStorage.removeItem(`accessToken`);
        console.log(1);
        // 로그아웃 API 호출
        await axios.post(
          `${API_BASE_URL}/logout`,
          {},
          {
            withCredentials: true,
          }
        );
        setUserState({ status: "loggedOut" });
        console.log(userState);

        // 로그인 페이지로 리디렉션
        navigate("/login");
      } catch (error) {
        console.warn("로그아웃 성공?");
      }
    };

    logout();
  });

  return null; // 로그아웃은 UI를 렌더링 안함
};

export default Logout;
