import axios from 'axios';

// NomalLogin API 함수를 정의합니다.
const NormalLoginForm = async (email, password) => {
  // FormData 객체를 생성하고, 사용자 이름과 비밀번호를 추가합니다.
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  const API_URL = process.env.REACT_APP_API_BASE_URL;

  try {
    const response = await axios.post(`${API_URL}/login`, formData, {
      withCredentials: true, 
      // 쿠키 등의 인증 정보를 요청과 함께 보내기 위한 옵션
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
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
