import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const BookDetail = async (bookId) => {

  const accessToken = localStorage.getItem("accessToken");
  
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${bookId}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    });
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    // return []; // 오류 발생 시 빈 배열 반환
    throw error;
  }
};

export default BookDetail;