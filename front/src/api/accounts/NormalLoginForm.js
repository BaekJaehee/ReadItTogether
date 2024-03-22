import axios from 'axios';

const NormalLoginForm = async (email, password) => {
  // API URL 설정
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  
  // 요청 본문을 JSON 객체로 구성
  const requestBody = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(`${API_URL}/login`, requestBody, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json', // JSON 형식의 데이터를 전송한다고 명시
      },
    });

    // 요청이 성공했다면, 응답 데이터를 반환합니다.
    return response.data;
  } catch (error) {
    // 요청이 실패했다면, 에러를 콘솔에 출력합니다.
    console.error('Login error', error);
    throw error;
  }
};

export default NormalLoginForm;
