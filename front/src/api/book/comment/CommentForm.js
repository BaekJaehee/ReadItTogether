import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CommentForm = (bookId, comment, rating) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = axios.post(
      `${API_BASE_URL}/books/comment`,
      {
        bookId,
        comment,
        rating,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("댓글 작성 성공", bookId, comment, rating);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default CommentForm;
