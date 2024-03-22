import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 방명록 데이터를 서버에 전송하는 함수
const GuestBookForm = async (toMemberId, text) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/guestbook/${toMemberId}`,
      {
        text,
      }
    );
    console.log("작성 성공:", response.data);
    return response.data; // 성공적으로 처리된 데이터 반환
  } catch (error) {
    console.error("에러 발생:", error);
    throw error; // 오류를 호출한 쪽으로 전파
  }
};

export default GuestBookForm;
