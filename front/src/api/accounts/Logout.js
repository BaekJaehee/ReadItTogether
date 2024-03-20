import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // 서버에 로그아웃 요청 보냈음
        const response = await axios.post(`${API_URL}/members/logout`, {
          withCredentials: true,
        });
        console.log("로그아웃 성공: ", response);
        navigate("/members/login");
      } catch (error) {
        console.error("에러 발생: ", error);
      }
    };

    logout();
  });

  return null; // 로그아웃은 UI를 렌더링 안함
};

export default Logout;
