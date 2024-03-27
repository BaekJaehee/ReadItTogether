import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 방명록 데이터를 서버에 전송하는 함수
const accessToken = localStorage.getItem("accessToken");
const IntroForm = async (intro) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/library/intro`,
      {
        intro,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("소개글 수정 완료: (내용)", response.data);
    return response.data; // 성공적으로 처리된 데이터 반환
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export default IntroForm;
